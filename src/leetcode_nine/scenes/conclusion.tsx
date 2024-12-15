import { Img, Txt, makeScene2D } from "@motion-canvas/2d";
import { Direction, all, createRef, slideTransition, waitFor } from "@motion-canvas/core";
import orcksImage from "../../assets/images/orcks.png";
import colorPallete from "../colors";

export default makeScene2D(function* (view) {
    view.fill(colorPallete.caput_mortuum.DEFAULT)
    const orcks = createRef<Img>();
    const tText = createRef<Txt>();
    const txtJab = createRef<Txt>();

    view.add(
        <>
             <Img ref={orcks} src={orcksImage} position={[890, 500]}/>
             <Txt ref={txtJab} fontWeight={700} fontSize={110} fill={"#FFF"}>
                Take a Jab at it
             </Txt>
        </>
       
    )
   
    yield* slideTransition(Direction.Right);

    yield* waitFor(1);

    yield* txtJab().text("Write the code.", .5)
    yield* waitFor(1)
    yield* txtJab().text("", .5)

    yield* all(
        orcks().position([0, 0], .5),
        orcks().scale(3, .5)
    )

   

    view.add(
        <Txt fill={"#fff"} ref={tText} position={[0, 200]} fontSize={70} />
    )
    yield* all(
        orcks().rotation(360, .5),
        tText().text("Happy Coding!!!", 1)
    )
});