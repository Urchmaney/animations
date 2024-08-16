import { Layout, Line, makeScene2D, Rect, Txt, Video } from "@motion-canvas/2d";
import coolReadingVideo from "../videos/cool_reading.mp4";
import { createRef, PlopSpring, spring, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const coolReadingVideoRef = createRef<Video>();
    const welcomeLayoutRef = createRef<Layout>();
    view.add(
        <Video src={coolReadingVideo} ref={coolReadingVideoRef} />        
    );

    view.add(
        <Rect width={() => view.width()} height={() => view.height()} fill={"#000"} opacity={0.4} zIndex={2} />
    )
    coolReadingVideoRef().play();
    view.add(
        <Rect layout y={-1350} x={-1000} direction={"column"} gap={20} textAlign={"center"} ref={welcomeLayoutRef} zIndex={3}>
            <Txt fill={"#fccb06"} fontWeight={700} fontSize={250} >Come Join Us</Txt>
            <Txt fill={"#fccb06"} fontWeight={700} fontSize={250}>At</Txt>
            <Txt fill={"#FFF"} fontWeight={700} fontSize={550}>BreQu</Txt>
        </Rect>
        
        // <Txt fill={"#008080"} fontWeight={700} fontSize={250} y={-1550} >Come Join Us</Txt>
    )

    yield* spring(PlopSpring, welcomeLayoutRef().x(), 0, 0.7, value => {
        welcomeLayoutRef().position.x(value);
      });
    // yield* welcomeLayoutRef().x(0, 2)

    welcomeLayoutRef().remove();

    view.add(
        <Rect layout y={-1350} x={0} direction={"column"} gap={20} textAlign={"center"} ref={welcomeLayoutRef} zIndex={3}>
            <Txt fill={"#fccb06"} fontWeight={700} fontSize={250} >Suggest A book</Txt>
        </Rect>
    )

    yield* waitFor(2);

    welcomeLayoutRef().remove();

    view.add(
        <Rect layout y={-1350} x={0} direction={"column"} gap={25} textAlign={"center"} ref={welcomeLayoutRef} zIndex={3}>
            <Txt fill={"#fccb06"} fontWeight={700} fontSize={250} >And</Txt>
            <Txt fill={"#fccb06"} fontWeight={700} fontSize={250} >We read as a</Txt>
            <Txt fill={"#fccb06"} fontWeight={700} fontSize={250} >GROUP</Txt>
        </Rect>
    )
    
    yield* waitFor(2);

    welcomeLayoutRef().remove();

    const lineRef = createRef<Rect>()
    view.add(
        <Rect layout y={-1350} x={0} direction={"column"} gap={25} textAlign={"center"} ref={welcomeLayoutRef} zIndex={3}>
            <Txt fill={"#fccb06"} fontWeight={700} fontSize={250} >Go to</Txt>
            <Rect layout direction={"column"} gap={25}>
                <Txt fill={"#fff"} fontWeight={700} fontSize={250}>http://brequ.com</Txt>
                <Rect height={30} width={0} fill={"#fff"} size={30} ref={lineRef} />
            </Rect>
        </Rect>
    )
    yield* lineRef().width(2000, 2);

   yield* waitFor(2);
})