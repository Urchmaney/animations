import {Circle, makeScene2D} from '@motion-canvas/2d';
import {DEFAULT, Direction, all, createRef, range, slideTransition, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  // Create your animations here

  const circle = createRef<Circle>();
  const smallerCircle = createRef<Circle>()

  view.add(<Circle ref={circle} size={320} fill={'lightseagreen'} />);


  yield* all(
    circle().position.x(300, 1).to(-300, 1),
    circle().fill('#e6a700', 1).to('#e13238', 1),
  );

  yield*  circle().scale(2, 2).to(1, 2);

  circle().add(
    <Circle ref={smallerCircle} size={100} fill={'yellow'} />
  );

  yield* waitFor(1);

  for(let i = 0; i < 5; i++) {
    yield* smallerCircle().position.y(120, 1);
    yield* smallerCircle().position.x(120, 1);
    yield* smallerCircle().position.y(-120, 1);
    yield* smallerCircle().position.x(-120, 1);
  }

});
