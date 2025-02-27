import { makeScene2D, Video } from "@motion-canvas/2d";
import queriesVideo from "./assets/queries.mp4"
import { createRef, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const queryVideo = createRef<Video>();
    view.add(
        <Video ref={queryVideo} src={queriesVideo} start={30} />
    )

    queryVideo().play()

    yield* waitFor(300)
})