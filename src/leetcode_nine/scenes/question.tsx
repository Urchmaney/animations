import { Img, makeScene2D } from "@motion-canvas/2d";
import { createRef } from "@motion-canvas/core";
import question from "../assets/question.png";


export default makeScene2D(function* (view) {
  view.fill("#fff"); 
  view.padding(40)
  const questionImg = createRef<Img>();

  view.add(
    <>
        <Img ref={questionImg} scale={2} src={question} y={300} />
     </>
  );
  yield* questionImg().position.y(-400, 5)
});
