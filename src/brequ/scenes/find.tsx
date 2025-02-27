import { makeScene2D, Video } from "@motion-canvas/2d";
import openningBook from "../videos/openning_book.mp4";
import { createRef, Direction, slideTransition, waitFor } from "@motion-canvas/core";

export default makeScene2D(function *(view) {
    const openningBookVid = createRef<Video>();
    view.add(
        <Video height={() =>view.height()} width={() => view.width()} src={openningBook} ref={openningBookVid} /> 
    )

    yield* slideTransition(Direction.Right, 1);

    openningBookVid().play();

    yield* waitFor(3);
})