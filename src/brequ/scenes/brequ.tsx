import { Img, Layout, makeScene2D, Rect } from "@motion-canvas/2d";
import { createRef, Direction, slideTransition, waitFor } from "@motion-canvas/core";
import brequ from "../images/brequ.png";
import brequSingle from "../images/brequ-image.png";

export default makeScene2D(function *(view) {
    const brequImg = createRef<Img>();
    const brequSingleImg = createRef<Img>();
    view.add(
        <Rect height={() =>view.height()} width={() => view.width()} fill={"#fff"}>
            <Layout>

                <Img height={200} width={400} src={brequ} ref={brequImg} />

            </Layout>
            
        </Rect>
    )

    yield* slideTransition(Direction.Right, 1);

    yield* brequImg().scale(1.5, 1).back(1)

    yield* waitFor(4)
})