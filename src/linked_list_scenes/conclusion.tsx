import { Img, Txt, makeScene2D } from "@motion-canvas/2d";
import { Direction, all, createRef, slideTransition, waitFor } from "@motion-canvas/core";
import codeOrck from "../images/orcks.png";

export default makeScene2D(function* (view) {
    const orcks = createRef<Img>();
    const tText = createRef<Txt>();

    view.add(
        <Img ref={orcks} src={codeOrck} position={[890, 500]}/>
    )
   
    yield* slideTransition(Direction.Right);

    yield* waitFor(1);

    yield* all(
        orcks().position([0, 0], .5),
        orcks().scale(3, .5)
    )

   

    view.add(
        <Txt fill={"#fff"} ref={tText} position={[0, 200]} />
    )
    yield* all(
        orcks().rotation(360, .5),
        tText().text("Happy Coding!!!", 1)
    )
});