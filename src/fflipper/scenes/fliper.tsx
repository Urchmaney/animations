import { Camera, Circle, Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, chain, createEaseInBounce, createEaseInElastic, createEaseInOutBack, createRef, spring, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    // const rect = createRef<Rect>();
    // view.add(
    //     <Rect size={500} ref={rect} fill={"red"} />
    // )

    // yield* rect().skew([90, 0], 1).back(0.5);

    // // yield* rect().rotation(90, 2).to(0, 2).to(180, 2);

    // const circle = createRef<Circle>();
    // const rect = createRef<Rect>();

    // view.add(
    //     <>
    //         <Circle ref={circle} size={400} fill={"green"} />
    //         <Rect ref={rect} size={0} zIndex={2} fill={"red"} />
    //     </>
    // );

    // yield* rect().size(() => [circle().size().x - 100, circle().size().y - 50], 1, createEaseInOutBack(3));
    // yield* waitFor(2);
    // yield* rect().size(0, 1, createEaseInOutBack());

    const camera = createRef<Camera>();
    const lastTxt = createRef<Txt>()
    const blurr = createRef<Rect>();

    view.add(
        <>

            <Camera ref={camera}>
                <Txt position={[0, -80]}>Follow</Txt>


                <Txt position={[0, -40]}>Follow</Txt>

                <Txt position={[0, 0]}>Me</Txt>
                <Txt position={[0, 40]}>To</Txt>
                <Txt position={[0, 80]}>Heaven</Txt>
                <Txt position={[0, 120]} ref={lastTxt}>Now</Txt>
            </Camera>
            <Rect ref={blurr} width={200} height={100} fill={"white"} opacity={0.5}>

            </Rect>
        </>


    )




    yield* all(blurr().filters.blur(50, 1.5).back(0.5), camera().centerOn(lastTxt().absolutePosition(), 2))
})