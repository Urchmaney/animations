import { CODE, Code, Img, Layout, makeScene2D, Txt } from "@motion-canvas/2d";
import { all, createRef } from "@motion-canvas/core";
import question from "../assets/question.png";


export default makeScene2D(function* (view) {
    const inputCode = createRef<Code>();
    const typeSignal = Code.createSignal("");
    const inputLayout = createRef<Layout>();
    view.add(
        <Layout ref={inputLayout} layout direction={"column"} gap={20}>
            <Txt fontWeight={700}>Input</Txt>
            <Code
                fontWeight={400}
                fill={"#000"}
                ref={inputCode}
                fontSize={48}
                code={CODE`\
s: "aa"  ${typeSignal}
p: "a*"  ${typeSignal}
`}
            />
            <Txt fontWeight={700}>Output <Txt text={`--> boolean`} fontWeight={400} /></Txt>

        </Layout>
    )

    yield* typeSignal("--> string", 2);
    yield* all(inputLayout().scale(0.7, 1), inputLayout().position([-750, -400], 1));

});
