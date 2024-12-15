import { Img, Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, createRef, waitFor } from "@motion-canvas/core";
import codeOrck from "../../assets/images/orcks.png";
import leet from "../../assets/images/leetcode.svg"
import { HourGlass } from "../../assets/nodes/HourGlass";
import colorPallete from "../colors";

export default makeScene2D(function* (view) {
  const logoRect = createRef<Rect>();
  const logo = createRef<Img>();
  const problemName = createRef<Txt>();

  view.add(
    <>
      <Rect rotation={310} position={[-900, -400]} layout padding={100} direction={"column"} alignItems={"center"} fill={colorPallete["cinnabar"]["DEFAULT"]} height={600} width={900} justifyContent={"end"}>
        <Img ref={logo} scale={2} src={codeOrck} />
      </Rect>
      <Layout  direction={"column"} gap={20}>
        <Layout gap={10} y={-70} layout>
          <Img size={100} src={leet} />
          <Txt fontWeight={700} fontSize={100}>Leet Code</Txt>
        </Layout>
        <Txt ref={problemName} y={70} opacity={0}>10. Regular Expression Matching</Txt>
      </Layout>
    </>
  );
  yield* logo().rotation(360, 2);
  yield* all(problemName().position.y(30, 2), problemName().opacity(1, 1));
  yield* waitFor(3);
});
