import { Circle, fillRect, Img, Line, makeScene2D, Rect, Txt, Video } from "@motion-canvas/2d";
import homeVideo from "../assets/home.webm";
import biteable from "../assets/biteable.png";
import canva from "../assets/canva.jpg";
import typescript from "../assets/typescript.png";
import ts_js from "../assets/ts_js.webp";
import { all, chain, createRef, makeRef, waitFor, waitUntil } from "@motion-canvas/core";

const tools = [
    canva, biteable
]
export default makeScene2D(function* (view) {
    const videoRef = createRef<Video>();
    const varitiesRef = createRef<Rect>();
    const preRef = createRef<Rect>();
    const pointRef = createRef<Line>();
    const toolsImgs: Img[] = [];
    view.add(
        <Video ref={videoRef} height={() => view.height()} src={homeVideo} />
    );

    videoRef().play();

    yield* waitUntil("tools");
    view.add(
        <Rect ref={varitiesRef} height={0} width={() => view.width()} fill={"rgba(252, 241, 218, 0.9)"}>

        </Rect>
    )

    yield* all(varitiesRef().height(() => view.height(), .2), varitiesRef().filters.blur(200, .3));
    yield* waitFor(1);

    view.add(
        tools.map((x, i) => (
            <Img src={x} ref={makeRef(toolsImgs, i)} position={[2000, 0]} />
        ))
    )
    for (let i = 0; i < tools.length; i++) {
        yield* chain(toolsImgs[i].position.x(0, .3), waitFor(.5), toolsImgs[i].position.x(-2000, .3))
    }

    videoRef().pause();
    yield* waitUntil("prerequi")

    view.add(
        <Rect position={[0, -2000]} layout ref={preRef} direction={"column"} justifyContent={"center"} alignItems={"center"} gap={30}>
            <Txt fontSize={100} fill={"black"}>Prerequisites</Txt>
            <Rect alignItems={"center"} justifyContent={"start"} gap={20} paddingLeft={20} paddingTop={20}>
                <Img src={ts_js} position={[2000, 0]} />
            </Rect>
        </Rect>
    )

    yield* chain(preRef().position.y(0, 1), waitFor(1), preRef().position.y(2000, 1));

    yield* varitiesRef().height(0, 0.5);
    yield* waitFor(1);

    videoRef().seek(7);

    view.add(<Line ref={pointRef} endArrow points={[[500, -300], [0, 0]]} lineWidth={10} stroke={"#fff"} end={0}/>)
    videoRef().play();
    yield* all(pointRef().end(1, 1), waitFor(8))
})