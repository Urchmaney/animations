import { Img, Line, makeScene2D, Rect, Txt } from "@motion-canvas/2d"
import { createRef, Direction, slideTransition, waitFor } from "@motion-canvas/core";
import { Browser } from "../../assets/nodes/Browser";
import railsHomeImg from "../images/screenshot_1.png";

import blazerHomeImg from "../images/screenshot_2.png";
export default makeScene2D(function* (view) {
  const browser = createRef<Browser>();
  const lineRef = createRef<Line>();

  view.add(
    <Browser height="100%" ref={browser} zIndex={2}>
      
    </Browser>
  )

  yield* browser().writeUrl("localhost:3000/biz-analytics", 1);

  browser().setPage(    
    <Img src={blazerHomeImg} width="100%" height="100%"/>
  )

  yield* waitFor(10);
  

  view.add(
    <Line
      points={[
        [650, -425],
        [910, -425],
        [910, -335],
        [650, -335],
        [650, -425]
      ]}
      stroke={'red'}
      lineWidth={8}
      zIndex={3}
      end={0}
      ref={lineRef}
    />,
  )

  yield* lineRef().end(1, .5).back(.5);
  yield* waitFor(10);


})