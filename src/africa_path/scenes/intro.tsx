import { Camera, Img, is, Knot, makeScene2D, Path, Rect, Spline, SVG, Txt } from "@motion-canvas/2d";
import { all, BBox, chain, createRef, DEFAULT, Vector2, waitFor } from "@motion-canvas/core";
import { africaSvgString, countryList, indexedCountries } from "../assets/africa_svg";

export default makeScene2D(function* (view) {
    const africaSvg = createRef<SVG>();
    const countryTitleTxt = createRef<Txt>();
    const infoRect = createRef<Txt>();
    const gdpTxt = createRef<Txt>();
    const titleTxt = createRef<Txt>();
    const opacityRect = createRef<Rect>();
    view.add(
        <>
            <SVG ref={africaSvg} svg={africaSvgString} size={1000} zIndex={2} stroke={"black"} lineWidth={1}></SVG>
            <Rect ref={infoRect} height={view.height()} width={view.width() / 2.5} fill={"#000"} x={600} opacity={0} layout justifyContent={"start"}  alignItems={"center"} padding={20} />
            <Txt zIndex={2} position={infoRect().left().add(50).addY(-100)} ref={countryTitleTxt} fill={"#fff"} fontSize={80} fontWeight={500} textAlign={"center"}  offsetX={-1}></Txt>
            <Txt zIndex={2} position={infoRect().left().add(50).addY(50)} ref={gdpTxt} fill={"#fff"} fontSize={120} fontWeight={700} textAlign={"center"}  offsetX={-1} opacity={0}></Txt>
            <Rect ref={opacityRect} size={view.size} fill={"#000"} opacity={.5}></Rect>
            <Txt ref={titleTxt} fill={"#fff"} fontSize={80}>Africa Countries GDP - 2024</Txt>
        </>
       
    );


    const paths = africaSvg().findAll(is(Path));
    paths.forEach(x => {
        x.stroke("black");
        x.lineWidth(1)
    })

    const gdp = [
        93,
        0,
        22,
        23,
        22,
        3,
        87,
        53,
        73,
        15,
        4,
        239,
        358,
        0,
        192,
        20,
        76,
        25,
        3,
        0,
        10,
        115,
        5,
        44,
        0,
        157,
        17,
        23,
        24,
        11,
        11,
        14,
        20,
        395,
        14,
        0,
        26,
        7,
        35,
        4,
        0,
        13,
        10,
        53,
        86,
        58,
        401,
        31,
        47,
        12
    ]

    yield* all(
        titleTxt().scale(0, 2),
        opacityRect().opacity(0, 2)
    )
   
    titleTxt().remove();
    opacityRect().remove();

    for(let i = 0; i < countryList.length; i++) {
        if (!gdp[i]) continue;
        const path = paths[i];
        const countryName = countryList[i];
        const c = BBox.fromPoints(...path.profile().segments.flatMap(segment => segment.points)).center;
        const halfSize = africaSvg().size().div(new Vector2(2, 2));
        const offsetCenter = c.sub(halfSize).div(halfSize);
        yield* chain(
            africaSvg().offset(offsetCenter, .2),
            all(
                africaSvg().position.x(-450, .5),
                infoRect().opacity(.4, .5),
                africaSvg().scale(3, .2),
                countryTitleTxt().text(countryName, .2),
                path.fill("#fff", .2),
                countryTitleTxt().opacity(1, .2),
                gdpTxt().opacity(1, .2),
                gdpTxt().text(`$${gdp[i]} B`, .2)
            ),
            waitFor(.5),
            all(
                africaSvg().scale(1, .2),
                africaSvg().position.x(0, .5),
                path.fill(null, .2),
                infoRect().opacity(0, .5),
                countryTitleTxt().opacity(0, .2),
                countryTitleTxt().text("", .2),
                gdpTxt().opacity(0, .2)
            ),
        );
    
        yield* waitFor(.2)
    }
   
})
