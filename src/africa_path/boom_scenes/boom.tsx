import { Img, is, Layout, Line, makeScene2D, Rect, Spline, Txt, View2D } from "@motion-canvas/2d";
import { all, chain, createRef, createSignal, makeRef, range, Reference, Signal, waitFor } from "@motion-canvas/core";
import codeOrcks from "../../assets/images/orcks.png"

const continentColor: Record<string, string> = {
    "CSA": "#31daf9",
    "SAA": "#e0a2f6",
    "NAWA": "#ff800c",
    "ESEA": "#3a82f2",
    "LAC": "#fcee3a",
    "ENA": "#b03e51"
}

const continentColorToNameMap: Record<string, string> = {
    "CSA": "Central and Southern Asia",
    "SAA": "Sub-Aaharan Africa",
    "NAWA": "North Africa and Western Asia",
    "ESEA": "Eastern and South-Eastern Asia",
    "LAC": "Latin America and the Carribean",
    "ENA": "Europe and Northern America"
}

type Country = { name: string, score?: number, continent: string, subContinent: keyof typeof continentColor }

export default makeScene2D(function* (view) {
    const layoutRect = createRef<Rect>();
    const traceSpline = createRef<Rect>();
    let addedRect = createRef<Rect>();
    const negativeLayout = createRef<Layout>();
    const positiveLayout = createRef<Layout>();

    const titleTxt = createRef<Txt>();
    const opacityRect = createRef<Rect>();
    const codeOrckImg = createRef<Img>();
    const continentLayout = createRef<Layout>();


    const countries: Country[] = [
        { name: "India", score: 300, continent: "Central and Southern Asia", subContinent: "CSA" },
        { name: "Nigeria", score: 190, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Pakistan", score: 125, continent: "Central and Southern Asia", subContinent: "CSA" },
        { name: "Democratic Republic Of Congo", score: 110, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Ethiopa", score: 95, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "United Republic Of Tanzania", score: 70, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Egypt", score: 55, continent: "North Africa and Western Asia", subContinent: "NAWA" },
        { name: "Indonesia", score: 52, continent: "Eastern and South-Eastern Asia", subContinent: "ESEA" },
        { name: "United State Of America", score: 49, continent: "Europe and Northern America", subContinent: "ENA" },
        { name: "Angola", score: 47, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Uganda", score: 43, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Niger", score: 41, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Kenya", score: 40, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Sudan", score: 38, continent: "North Africa and Western Asia", subContinent: "NAWA" },
        { name: "Philippines", score: 37, continent: "Eastern and South-Eastern Asia", subContinent: "ESEA" },
        { name: "Mozambique", score: 34, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Iraq", score: 32, continent: "North Africa and Western Asia", subContinent: "NAWA" },
        { name: "Bangladesh", score: 30, continent: "Central and Southern Asia", subContinent: "CSA" },
        { name: "Madagascar", score: 29, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Mexico", score: 28, continent: "Latin America and the Carribean", subContinent: "LAC" },
        { name: "Afghanistan", score: 27, continent: "Central and Southern Asia", subContinent: "CSA" },
        { name: "Cote d'Ivoire", score: 26, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Cameroon", score: 25, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Mali", score: 24, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Burkina Faso", score: 22, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Ghana", score: 21, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Zambia", score: 21, continent: "Sub-Aaharan Africa", subContinent: "SAA" },
        { name: "Russian Federation", score: -10, continent: "Europe and Northern America", subContinent: "ENA" },
        { name: "Japan", score: -21, continent: "Eastern and South-Eastern Asia", subContinent: "ESEA" },
        { name: "China", score: -40, continent: "Eastern and South-Eastern Asia", subContinent: "ESEA" }
    ]


    const labelUnitWidth = createSignal(150);
    const labelUnit = createSignal(50);
    const startMarkerSignal = createSignal(0);
    const stopMarkerSignal = createSignal(labelUnitWidth());
    const continentsRefs: Record<string, Rect | undefined> = {
        "CSA": undefined,
        "SAA": undefined,
        "NAWA": undefined,
        "ESEA": undefined,
        "LAC": undefined,
        "ENA": undefined
    };

    const rangeArray = (start: number, stop: number, step: number): number[] => Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );

    const shownValue = (value: number): string => {
        const result = value / (labelUnitWidth() / 2) * (labelUnit() / 2);
        return result % 50 === 0 ? result.toString() : ""
    }


    view.add(
        <>
            <Rect ref={layoutRect} layout alignItems={"start"} justifyContent={"end"} minWidth={labelUnitWidth() * 2} minHeight={1} padding={10}>
                <Layout direction={"column"} ref={negativeLayout} rotation={180} alignItems={"start"} width={() => startMarkerSignal() * -1}></Layout>
                <Layout direction={"column"} ref={positiveLayout} width={() => stopMarkerSignal()}></Layout>
            </Rect>
            <Spline ref={traceSpline} stroke={"lightgray"} lineWidth={5} smoothness={0} points={() => [layoutRect().topLeft(), layoutRect().bottomLeft(), layoutRect().bottomRight()]}></Spline>

            <Layout>
                {

                    () => rangeArray(0, stopMarkerSignal(), labelUnitWidth() / 2).slice(1).map((x, i, arr) =>
                        <Rect size={50} position={() => positiveLayout().bottomLeft().addX(x).addY(34).transformAsPoint(negativeLayout().parentToWorld()).transformAsPoint(view.worldToLocal())}>
                            {/* <Txt fill={"#fff"} fontSize={20}>{(((x / labelUnitWidth()) * (labelUnit() / 2) % 50) === 0) ? `${(x / labelUnitWidth()) * labelUnit() / 2}` : ""}</Txt> */}
                            <Txt fill={"#fff"} fontSize={20}>{shownValue(x)}</Txt>

                            <Line stroke={"lightgray"} lineWidth={2} points={[[0, -25], [0, -15]]} />
                        </Rect>
                    )
                }
            </Layout>
            <Layout>
                {
                    () => rangeArray(startMarkerSignal(), 0, labelUnitWidth() / 2).map((x, i, arr) =>
                        <Rect size={50} position={() => negativeLayout().topLeft().addX(x).addY(34).transformAsPoint(negativeLayout().parentToWorld()).transformAsPoint(view.worldToLocal())}>
                            <Txt fill={"#fff"} fontSize={20}>{shownValue(x)}</Txt>
                            <Line stroke={"lightgray"} lineWidth={2} points={[[0, -25], [0, -15]]} />
                        </Rect>
                    )
                }
            </Layout>
            <Txt fontSize={40} fill={"#fff"} position={() => layoutRect().bottom().addY(70)}>
                Population change (millions)
            </Txt>

            <Rect ref={opacityRect} size={view.size} fill={"#000"} opacity={.7}></Rect>
            <Txt ref={titleTxt} fill={"#fff"} fontSize={80}>Largest Population Changes, 2020 - 2025</Txt>
            <Img src={codeOrcks} ref={codeOrckImg} position={[900, 500]} />
            <Layout layout gap={10} direction={"column"} position={[800, 100]} ref={continentLayout} opacity={.3}>
                {
                    Object.keys(continentColorToNameMap).map(x =>
                        <Rect ref={makeRef(continentsRefs, x)} layout gap={10} alignItems={"center"}>
                            <Rect size={15} fill={continentColor[x]}></Rect>
                            <Txt fill={"#fff"} fontSize={20}>{continentColorToNameMap[x]}</Txt>
                        </Rect>
                    )
                }
            </Layout>
        </>
    );

    yield* chain(codeOrckImg().rotation(360, 1),
        all(
            titleTxt().scale(0, 2),
            opacityRect().opacity(0, 2),
            continentLayout().opacity(1, 2)
        )
    )

    titleTxt().remove();
    opacityRect().remove();

    for (let i = 0; i < countries.length; i++) {
        const country = countries[i];
        let { score, subContinent } = country;
        if (!score) score = Math.floor(Math.random() * 201) - 100

        score = score * (labelUnitWidth() / labelUnit())

        const adjustmentGenerator = score > 0 ?
            stopMarkerSignal(Math.max(Math.ceil(score / labelUnitWidth()) * labelUnitWidth(), stopMarkerSignal()), 1) :
            startMarkerSignal(Math.min(Math.floor(score / labelUnitWidth()) * labelUnitWidth(), startMarkerSignal()), 1)


        yield* chain(
            adjustmentGenerator,
            addBarToLayout(view, layoutRect(), score, 1, country, continentsRefs[subContinent])
        );
    }

    yield* waitFor(2)
})

function* addBarToLayout(view: View2D, layout: Rect, width: number, time: number, country: Country, continentRef: Rect) {
    const color = continentColor[country.subContinent]
    const negativeLayout = layout.children()[0] as Layout;
    const positiveLayout = layout.children()[1] as Layout;

    const nBar = createRef<Rect>();
    const pBar = createRef<Rect>();
    const titleTxt = createRef<Txt>();

    negativeLayout.insert(<Rect ref={nBar} height={0} width={0} fill={color} />);
    positiveLayout.add(<Rect ref={pBar} height={0} width={0} fill={color} />);

    yield* all(
        nBar().height(28, .5),
        pBar().height(28, .5)
    )
    view.add(
        <Txt ref={titleTxt} scale={1.5} zIndex={3} fontSize={20} fill={"#fff"} position={() => [layout.left().x - 30, pBar().absolutePosition().transformAsPoint(view.worldToLocal()).y]} offsetX={1}></Txt>
    )

    yield* titleTxt().text(country.name, .5)
    if (width > 0) {
        yield* all(pBar().width(width, time), continentRef.scale(1.2, time))
    }
    else {
        yield* all(nBar().width(width * -1, time), continentRef.scale(1.2, time))
    }
    yield* all(titleTxt().scale(1, .5), continentRef.scale(1, .5))
}