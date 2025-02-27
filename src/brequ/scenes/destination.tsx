import { Img, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { createRef, Direction, range, slideTransition, waitFor } from "@motion-canvas/core";
import destination from "../images/destination.jpg";

export default makeScene2D(function *(view) {
  const destinationImg = createRef<Img>();
  
  view.add(
    <Img src={destination} ref={destinationImg}  height={() =>view.height()} width={() => view.width()} />
  );

  
  view.add(
    <Rect opacity={0.7} zIndex={2} height={() =>view.height()} width={() => view.width()} fill={"#000"} />
  );

  yield* slideTransition(Direction.Right, 1);

  yield* destinationImg().scale(1.5, 3);

  view.add(<Txt fill={"#fff"} fontSize={100} zIndex={2}>INFORMATION</Txt>)

  view.add(
    range(5).map(x =>
      <Txt fill={"#fff"} fontSize={100} zIndex={2} position={[Math.floor(Math.random() *  (900 + 900 + 1) - 900), Math.floor(Math.random() * (500 + 500 + 1) - 500)]}>INFORMATION</Txt>
    )
  )

  yield* waitFor(2);
})