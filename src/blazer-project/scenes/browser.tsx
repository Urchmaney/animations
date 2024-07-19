import { Img, makeScene2D, Txt } from "@motion-canvas/2d"
import { Direction, slideTransition, waitFor } from "@motion-canvas/core";
import { Browser } from "../../assets/nodes/Browser";
import railsHomeImg from "../images/screenshot_1.png";

import blazerHomeImg from "../images/screenshot_2.png";
export default makeScene2D(function* (view) {
  yield* slideTransition(Direction.Left, 1);


  view.add(
    <Browser height="100%">
      <Img src={blazerHomeImg} width="100%" height="100%" />
      
    </Browser>
  )

  yield* waitFor(2);
  
  view.add(
    <Img src={blazerHomeImg} width={() => view.width()} height={() => view.height() }/>
  )

  yield* waitFor(10);

})