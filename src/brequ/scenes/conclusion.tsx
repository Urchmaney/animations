import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { Direction, slideTransition, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    view.add(<Rect  height={() =>view.height()} width={() => view.width()} fill={"#000"}>
        <Txt fill={"#fff"} fontSize={100}>
            Conclusion
        </Txt>
    </Rect>)
    
    yield* slideTransition(Direction.Right, 1);

    yield* waitFor(2);
})