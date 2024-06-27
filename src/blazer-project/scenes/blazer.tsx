import { Camera, Img, Line, Rect, Txt, View2D, makeScene2D } from "@motion-canvas/2d";
import blazerImage from "../images/blazer.png"
import { PossibleVector2, ThreadGenerator, all, createRef, waitFor } from "@motion-canvas/core";
import dashboardImage from "../images/dashboards.png";

export default makeScene2D(function* (view) {
    const cameraRef = createRef<Camera>();
    const dashoardRef = createRef<Img>();
    // const blazerImg = createRef<Img>()
    // view.add(
    //     <Img src={blazerImage} ref={blazerImg} />
    // )

    yield* animateBlazerLogo(view);

    // yield* blazerImg().scale(3, 3).back(0.5);
    view.add(
        <Camera ref={cameraRef} position={[-400, 500]}>
            <Img width={() => view.width()} height={() => view.height()} ref={dashoardRef} src={dashboardImage} />
        </Camera>
    )

    yield* cameraRef().position([0, 0], 0.9);
    yield* waitFor(2);
})  


function* animateBlazerLogo (view: View2D): ThreadGenerator {
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

    yield
}