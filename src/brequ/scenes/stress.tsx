import { Img, makeScene2D } from "@motion-canvas/2d";
import { createRef, Direction, slideTransition, waitFor } from "@motion-canvas/core";
import frustrated from "../images/frustrated.jpg";

export default makeScene2D(function *(view) {
    const frustratedImg = createRef<Img>();
    view.add(
        <Img height={() =>view.height()} width={() => view.width()} src={frustrated} ref={frustratedImg} /> 
    );

    yield* slideTransition(Direction.Right, 1);

    yield* waitFor(1);
});