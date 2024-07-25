import { Img, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { Direction, createRef, slideTransition, waitFor } from "@motion-canvas/core";

import codeOrck from '../images/orcks.png';


export default makeScene2D(function* (view) {
    const orcks = createRef<Img>();
    view.add(
        <Rect layout
            direction={"column"}
            gap={30}
        >
            <Txt fill={"#fff"} fontSize={70}>What is LinkedList ?</Txt>
            <Rect layout direction={"column"} gap={10}>
                <Txt fill={"#fff"} fontSize={40} layout>
                    A Linkedlist is a data structure that consisit of data element known as node.
                </Txt>
                <Txt fill={"#fff"} fontSize={40}>And each node consist of two fields. One field has data. And the other has address to the next</Txt>
                <Txt fill={"#fff"} fontSize={40}>node.</Txt>
            </Rect>
        </Rect >

    )

    view.add(
        <Img ref={orcks} src={codeOrck} position={[890, 500]} />
    )


    yield* waitFor(10);


})