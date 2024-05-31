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

    yield* waitFor(2);

    yield* all(
        orcks().position([0, 0], 2),
        orcks().scale(3, 2)
    )

    yield* orcks().rotation(360, 1);

    view.add(
        <Txt fill={"#fff"} ref={tText} position={[0, 200]} />
    )

    yield* waitFor(1);

    yield* tText().text("Happy Coding!!!", 3);
});