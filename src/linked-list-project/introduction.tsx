import { Img, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { DEFAULT, Direction, PlopSpring, all, createRef, slideTransition, spring, waitFor } from "@motion-canvas/core";
import codeOrck from "../assets/images/orcks.png";
import chain from "../assets/images/chain.png"

export default makeScene2D(function* (view) {
    const board = createRef<Rect>();
    const orcks = createRef<Img>();
    const rubyImg = createRef<Img>();
    const chainRef = createRef<Img>();

    view.add(
        <>
            <Rect layout
                ref={board}
                fill={'#201919'}
                x={1800}
                size={["70%", "40%"]}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={50}
            >
                {/* <Img ref={rubyImg} src={rubyImage} height={400} width={280} /> */}
                <Txt fill={"#fff"} fontSize={100}>Linked List. </Txt>

            </Rect>
            <Img ref={chainRef} src={chain} position={[1190, 500]}/>
            <Img ref={orcks} src={codeOrck} position={[890, 500]}/>

        </>
    );


    yield* slideTransition(Direction.Right);

    

    

    yield* spring(PlopSpring, -300, 30, 2, val => {
        board().position.x(val)
    })

    // yield* rubyImg().rotation(45, 1).to(DEFAULT, 1);

    yield* all(
        chainRef().rotation(-35, 1),
        chainRef().position.y(70, 1),
        chainRef().position.x(30, 1),
    )

    

    yield* orcks().rotation(360, 1);

    yield* waitFor(1);

    // yield;
})