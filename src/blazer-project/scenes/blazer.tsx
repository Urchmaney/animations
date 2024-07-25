import { Camera, Circle, CubicBezier, Img, Layout, Line, Rect, Spline, Txt, View2D, makeScene2D } from "@motion-canvas/2d";
import blazerImage from "../images/blazer.png"
import { PossibleVector2, Reference, ThreadGenerator, all, createRef, loop, makeRef, range, waitFor } from "@motion-canvas/core";
import dashboardImage from "../images/dashboards.png";

export default makeScene2D(function* (view) {
    const cameraRef = createRef<Camera>();
    const dashoardRef = createRef<Img>();
    // const blazerImg = createRef<Img>()
    // view.add(
    //     <Img src={blazerImage} ref={blazerImg} />
    // )

    yield* animateBlazerLogo(view);

    const dashboardRef = createRef<Rect>();
    view.add(
        <Rect layout fill={"lightgray"} ref={dashboardRef} gap={50} padding={50} radius={20}>

        </Rect>
    )

    const bars: Rect[] = [];

    charts(dashboardRef(), bars);

    const curve = createRef<CubicBezier>()

    AddLineChart(dashboardRef(), curve)

    yield  all(
        ...bars.map(b => loop(() => b.height(Math.floor(Math.random() * 51) + 170, 1).back(1))),
        curve().end(1, 3)
    )
    
    // AddPieChart(dashboardRef(), []);

    

    // yield* blazerImg().scale(3, 3).back(0.5);
    // view.add(
    //     <Camera ref={cameraRef} position={[-400, 500]}>
    //         <Img width={() => view.width()} height={() => view.height()} ref={dashoardRef} src={dashboardImage} />
    //     </Camera>
    // )

    // yield* cameraRef().position([0, 0], 0.9);
    yield* waitFor(2);
})


function* animateBlazerLogo(view: View2D): ThreadGenerator {
    const boxRef = createRef<Line>()
    const boxLineRef = createRef<Line>();
    const logo = createRef<Rect>();
    const titleRef = createRef<Txt>();
    const boxPoints: PossibleVector2[] = [[-390, 23], [-390, 0], [-365, -20], [-350, 5], [-335, -10], [-310, 20], [-390, 20]]
    view.add(
        <Rect ref={logo} layout>
            <Line
                ref={boxLineRef}
                points={[
                    [-400, -34],
                    [-400, 30],
                    [-300, 30],
                ]}
                stroke={'#fff'}
                lineWidth={5}
                end={0}
            />,
            <Line
                ref={boxRef}
                points={boxPoints}
                stroke={'#fff'}
                lineWidth={5}
                fill={'#fff'}
                end={0}
                marginLeft={-90}
                marginTop={10}
            />
        </Rect>
    );

    yield* all(
        boxRef().end(1, 2),
        boxLineRef().end(1, 2)
    );

    view.add(<Txt ref={titleRef} position={[15, 180]} fill={"#fff"} fontSize={90} />)

    yield* all(
        logo().scale(3, 1),
        titleRef().text("Blazer", 1)
    );

    yield* all(
        waitFor(2),
        boxRef().end(0, 1),
        boxLineRef().end(0, 1),
        titleRef().text("", 1)
    );

}

function charts(view: Rect, bars: Rect[]) {

    view.add(
        <Rect gap={20} layout fill={"white"} paddingRight={5} paddingTop={5} height={300} width={500} rotation={180}>
            <Rect gap={20} layout fill={"lightgray"} padding={15} width={"100%"}>
                {
                    range(5).map(
                        (_, i) => (
                            <Rect height={() => Math.floor(Math.random() * 50) + 130} width={80} fill={"#D2042D"} ref={makeRef(bars, i)} offsetY={-1} />
                        )
                    )
                }
            </Rect>
        </Rect>
    )
}

function AddPieChart(view: Rect, pies: Rect[]) {
    view.add(
        <Circle
            width={() => 120}
            height={() => 120}
            stroke={'#ff6470'}
            lineWidth={4}
            startAngle={110}
            endAngle={340}
            fill={'black'}
        />
    )
}

function AddLineChart(view: Rect, curve: Reference<CubicBezier>) {
    view.add(
        <Rect gap={20} layout fill={"white"} paddingRight={5} paddingTop={5} width={500} height={300} rotation={180}>
            <Rect fill={"lightgray"} padding={15} width={"100%"} >


                <CubicBezier
                    ref={curve}
                    lineWidth={10}
                    stroke={'lightseagreen'}
                    p0={[300, 100]}
                    p2={[100, -100]}
                    p1={[200, 100]}
                    p3={[700, -100]}
                    position={[-10, -10]}
                    end={0}
                />

            </Rect>
        </Rect>
    )
}