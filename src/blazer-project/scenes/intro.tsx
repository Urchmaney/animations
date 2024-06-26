import { Img, Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { ThreadGenerator, all, createRef, loop, makeRef, range, waitFor, waitUntil } from "@motion-canvas/core";
import searchImage from "../images/seacrhIcon.svg";

export default makeScene2D(function* (view) {
    const trixes : Txt[] = [];

    const searchIconRef = createRef<Img>();

    view.add(
        <Layout>
            {
                range(21).map((i) => (
                    <Txt ref={makeRef(trixes, i)} rotation={90} fill={"#00ff2b"} fontSize={20} x={-900 + (i*90)} />
                ))
            }
             <Img ref={searchIconRef} src={searchImage} end={0} height={200} width={200} />
        </Layout>
    )

    yield loop(30, () => {
        return all(
            ...trixes.map(trix => runTrix(trix))
        )
    });

    yield* waitFor(1);
    yield* searchIconRef().end(1, 1);
    yield* searchIconRef().position([-600, -400], .5).to([560, -300], .5).to([600, 400], .5).to([-300, 400], .5);
    yield* waitFor(2);
});

function* runTrix(t: Txt) : ThreadGenerator{
    const c = Array.from({length: 100}, () => Math.floor(Math.random() * 2));
    yield* t.text(c.join("") , .1);
    yield* t.filters.blur(1, .1);
}