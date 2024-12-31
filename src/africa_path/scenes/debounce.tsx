import { Circle, is, Line, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, cancel, chain, createRef, createSignal, DEFAULT, Direction, join, loop, SimpleSignal, slideTransition, ThreadGenerator, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const debouncer = createRef<Circle>();
  const msg = createRef<Txt>();
  const mainMsg = createRef<Txt>();
  const store = createRef<Txt>();
  const timer = createSignal(10);
  const dbRect = createRef<Rect>();
  view.add(
    <>
      <Circle fill={"#fff1d0"} layout ref={debouncer} size={300} justifyContent={"center"} alignItems={"center"}>
        {
          () => <Txt fontSize={70}>{`${Math.floor(timer()) === 10 ? '' : Math.floor(timer()) }`}</Txt>
        }
      </Circle>
      <Line stroke={"white"} endArrow lineWidth={10} points={[debouncer().left().addX(-900), debouncer().left().addX(-100)]}></Line>
      <Txt ref={store} fill={"white"} position={() => debouncer().position().addY(-240)} fontSize={70} letterSpacing={20}></Txt>
      {/* <Txt ref={msg} offsetX={1} fill={"white"} position={debouncer().left().addX(-900).addY(-60)}>Save <Txt fontSize={80} ref={mainMsg}>C</Txt> in database</Txt> */}
      <Txt ref={msg} fontSize={60} offsetX={1} fill={"white"} position={debouncer().left().addX(-900).addY(-60)}>
        <Txt fontSize={40} fill={"#06aed5"}>save</Txt><Txt> C</Txt></Txt>
      <Rect ref={dbRect} fill={"lightgray"} x={700} width={300} justifyContent={"start"} padding={20} height={500} radius={50} direction={"column"} paddingLeft={40} gap={10} paddingTop={50} layout>
        <Txt fontSize={50}>Man</Txt>
        <Txt fontSize={50}>slope</Txt>
      </Rect>
    </>
  )

  yield* slideTransition(Direction.Right);
  let timerCancel = yield loop(10, () => timer(timer() - 1, 1));
 
  // yield* chain(
  //   msg().position.x(-250,5),
  //   msg().opacity(0, 1),
  // ); 

  // cancel(val);
  // timer(10);

  // yield* all(
  //   store().text("C", 1),
  //   msg().opacity(0, 1)
  // );

  yield* sendMsgToDebouncer(msg(), store(), timer, timerCancel, "C");
  msg().position(debouncer().left().addX(-900).addY(-60));
  timerCancel = yield loop(10, () => timer(timer() - 1, 1));
  msg().findLast(is(Txt)).text(" a");
  msg().opacity(1)
  yield* sendMsgToDebouncer(msg(), store(), timer, timerCancel, "a");
  msg().position(debouncer().left().addX(-900).addY(-60));
  timerCancel = yield loop(10, () => timer(timer() - 1, 1));
  msg().findLast(is(Txt)).text(" r");
  msg().opacity(1)
  yield* sendMsgToDebouncer(msg(), store(), timer, timerCancel, "r");
 
  yield loop(10, () => timer(timer() - 1, 1));
  yield* waitFor(10);

  yield* all(
    debouncer().x(300, 1),
    debouncer().rotation(360, 1)
  );

  yield* waitFor(1);
  const cloneStore = store().clone();
  cloneStore.reparent(view);
  cloneStore.absolutePosition(store().absolutePosition())
  

  yield* all(
    store().opacity(0, 1),
    cloneStore.position([620, -190], 1)
  );
  cloneStore.fill("black");
  cloneStore.letterSpacing(0)
  cloneStore.fontSize(50)
  cloneStore.reparent(dbRect());
  yield* debouncer().position(0, 1)
});

function *sendMsgToDebouncer(msg: Txt, store: Txt, timer: SimpleSignal<number, void>, cancelTimer: ThreadGenerator, msgVal: string) {
  yield* chain(
    msg.position.x(-250,5),
    msg.opacity(0, 1),
  );

  cancel(cancelTimer);
  timer(10);

  yield* all(
    store.text(`${store.text()}${msgVal}`, 1),
    msg.opacity(0, 1)
  );

}