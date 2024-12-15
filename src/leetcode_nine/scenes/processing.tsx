import { Code, is, Layout, Line, lines, makeScene2D, Rect, Spline, Txt, View2D, word } from "@motion-canvas/2d";
import { all, chain, createRef, createSignal, delay, Direction, makeRef, Promisable, range, slideTransition, ThreadGenerator, tween, Vector2, waitFor, waitUntil } from "@motion-canvas/core";
import colorPallete from "../../leetcode_nine/colors";


export default makeScene2D(function* (view) {
  const patternString = "ab*a*c*a"
  const inputString = "aaca"


  const inputStr = createRef<Txt>();
  const inputStrValue = createRef<Txt>();
  const patternStr = createRef<Txt>();
  const patternValue = createRef<Txt>();
  const inputsLayoutRef = createRef<Layout>();

  const iColor = "#fe7d6a";

  const stageRefs: Rect[] = [];
  view.add(
    <Layout layout direction={"column"} gap={30} ref={inputsLayoutRef} zIndex={2}>
      <Rect layout gap={80} fill={iColor} fontSize={70} radius={20} padding={20}>
        <Txt ref={inputStr}></Txt>
        <Txt ref={inputStrValue}>{`s = "${inputString}"`}</Txt>
      </Rect>

      <Rect layout gap={80} fill={iColor} fontSize={70} radius={20} padding={20}>
        <Txt ref={patternStr}></Txt><Txt ref={patternValue}>{`p = "${patternString}"`}</Txt>
      </Rect>
    </Layout>
  );
  yield* slideTransition(Direction.Left);

  yield* chain(
    all(inputStr().text(`input string`, .5), patternStr().text(`pattern string`, .5)),
    waitFor(1),
    all(inputStr().text(``, .5), patternStr().text(``, .5)),
  )
  patternStr().remove();
  inputStr().remove()
  yield* waitFor(4);

  inputsLayoutRef().offset([-1, -1])

  yield* all(inputsLayoutRef().position([-940, -520], 1), inputsLayoutRef().scale(0.6, 1))

  const stageLayoutRef = createRef<Layout>();
  const fDirection = createRef<Spline>();
  const sDirection = createRef<Spline>();
  view.add(
    <Layout ref={stageLayoutRef} layout alignItems={"end"}>
      <Rect size={150} ref={makeRef(stageRefs, 3)} >
      </Rect>
      <Rect ref={makeRef(stageRefs, 0)} size={320} layout radius={30} justifyContent={"center"} alignItems={"center"} fill={colorPallete.cinnabar.DEFAULT}>
        <Txt fill={"#fff"} textAlign={"center"} fontWeight={600} textWrap>Pattern Formation</Txt>
      </Rect>
      <Rect size={150}>

      </Rect>
      <Rect ref={makeRef(stageRefs, 1)} size={320} layout radius={30} justifyContent={"center"} alignItems={"center"} fill={colorPallete.cinnabar.DEFAULT}>
        <Txt fill={"#fff"} fontWeight={600} textWrap textAlign={"center"}>
          Recursive Matching
        </Txt>
      </Rect>
    </Layout>
  )


  yield* waitFor(2);


  yield* chain(
    all(stageRefs[0].scale(1.2, 1).back(.2), stageRefs[0].ripple(1)),
    waitFor(.5),
    all(stageRefs[1].scale(1.2, 1).back(.2), stageRefs[1].ripple(2)),
  )


  yield* waitFor(2)

  yield* stageRefs[0].scale(1.5, 1)
  yield* waitFor(1)

  yield* tween(1, (val) => {
    stageLayoutRef().position.x((-2000 * val));
  });



  const splittingRef = createRef<Layout>();

  const ref = createRef<Layout>();
  const pStr = createRef<Txt>();
  const patternArray = createSignal<string[]>([]);
  view.add(
    <>
      <Layout ref={splittingRef}>
        <Rect textAlign={"center"} layout={false} y={-300}>
          <Rect ref={ref} layout direction={"column"}>
            <Txt>Pattern Formation</Txt>
          </Rect>
          <Line zIndex={2} stroke={"red"} lineWidth={10} points={[ref().left(), ref().right()]} position={ref().bottom().addY(10)}></Line>
        </Rect>

        <Rect y={-90}>
          <Layout layout direction={"column"} gap={100} justifyContent={"center"} alignItems={"center"}>
            <Rect layout gap={20}>
              {() => patternArray().map(x => <Rect layout justifyContent={"center"} alignItems={"center"} size={100} fill={"black"} radius={20}>
                <Txt fill={"#fff"}>{x}</Txt>
              </Rect>)}
            </Rect>
          </Layout>
        </Rect>
      </Layout>
      <Txt offset={[-1, -1]} ref={pStr} zIndex={2}>{patternString}</Txt>
    </>
  )

  pStr().absolutePosition(patternValue().absolutePosition())

  pStr().absoluteScale(patternValue().absoluteScale());

  pStr().fontSize(patternValue().fontSize())

  yield* all(
    pStr().position(60, 1),
    pStr().letterSpacing(100, 1),
    pStr().fontSize(100, 1),
    pStr().offset([0, 0], 1)
  )

  yield* waitUntil("loop");

  const charWidth = (100);
  const dSignal = createSignal(20);
  const pointerRef = createRef<Spline>()

  view.add(<Spline ref={pointerRef} endArrow lineWidth={10} stroke={"red"} points={() => [
    pStr().bottomLeft().addY(30).addX(dSignal()),
    pStr().bottomLeft().addX(dSignal()),
  ]}></Spline>)

  for (let i = 0; i < patternString.length; i++) {
    const char = patternString[i];
    // const last = `${patternArray()[patternArray().length - 1]}${char}`
    let l = char === "*" || patternString[i + 1] === "*" ? 85 : charWidth
    if (char === "*") {
      const last = `${patternArray()[patternArray().length - 1]}${char}`
      yield* patternArray([...patternArray().slice(0, patternArray().length - 1), last], 1)
    } else {
      yield* patternArray([...patternArray(), char], 1)
    }

    let waitTime = 1.5;

    if (i === 2) waitTime = 2.5

    yield* dSignal(dSignal() + l, 1.5);
  }

  const pattern_splitted = createRef<Rect>();

  inputsLayoutRef().add(
    <Rect layout direction={"column"} fill={iColor} gap={10} fontSize={70} radius={20} padding={20}>
      <Txt>
        {`pattern = [`}
      </Txt>
      <Rect layout gap={20} scale={.8} ref={pattern_splitted}>
        {() => patternArray().map(x => <Rect layout justifyContent={"center"} alignItems={"center"} size={100} fill={colorPallete.cinnabar.DEFAULT} radius={20}>
          <Txt fill={"#fff"}>{x}</Txt>
        </Rect>)}
      </Rect>
      <Txt>
        {`]`}
      </Txt>
    </Rect>
  )


  pointerRef().remove();

  const stageCurrentPosX = stageLayoutRef().x()
  yield* tween(1, (val) => {
    stageLayoutRef().position.x((stageCurrentPosX - (stageCurrentPosX * val)));
    splittingRef().position.x(2000 * val)
    pStr().position.x(2000 * val)
  });

  pStr().remove();
  splittingRef().remove();

  yield* inputsLayoutRef().scale(.4, 2)

  yield* all(
    stageRefs[0].scale(1, 1),
    stageRefs[1].scale(1.5, 1),
  )


  yield* waitUntil("recurs")
  yield* tween(1, (val) => {
    stageLayoutRef().position.x((-2000 * val));
  });


  const findMatchingRef = createRef<Layout>();
  const matchTitleRef = createRef<Rect>();


  // const patternContentSignals = patternArray().map(_ => createSignal([]));
  // const inputHighligher = createRef<Rect>();
  // const inputsCharRef: Rect[] = [];
  // const pContainer: Rect[] = [];
  view.add(
    <>
      <Layout ref={findMatchingRef}>
        <Rect textAlign={"center"} layout={false} y={-300}>
          <Rect ref={matchTitleRef} layout={true} direction={"column"} textAlign={"center"}>
            <Txt>Recursive Matching</Txt>
          </Rect>
          <Line zIndex={2} stroke={"red"} lineWidth={10} points={[matchTitleRef().left().addX(10), matchTitleRef().right().addX(10)]} position={ref().bottom().addY(10)}></Line>
        </Rect>
      </Layout>
    </>
  )

  const cloned_pattern = pattern_splitted().clone();

  cloned_pattern.reparent(view);
  cloned_pattern.absolutePosition(pattern_splitted().absolutePosition());
  cloned_pattern.absoluteScale(pattern_splitted().absoluteScale());
  cloned_pattern.zIndex(4)

  yield* all(
    cloned_pattern.position([0, 0], 1),
    cloned_pattern.scale(2, 1)
  )

  yield* all(
    cloned_pattern.scale(0.1, 2),
    cloned_pattern.opacity(0, 2)
  )

  cloned_pattern.removeChildren();

  cloned_pattern.scale(1);

  const nodeArray: Rect[] = [];
  cloned_pattern.add(
    <>
      {
        patternArray().map((x, i) => (
          <Rect ref={makeRef(nodeArray, i)} layout size={[400, 200]}>
            <Rect size={[100, 200]}>
              <Line points={[[0, 100], [100, 100]]} stroke={colorPallete.caput_mortuum.DEFAULT} lineWidth={5} endArrow></Line>
            </Rect>
            <Rect size={[200, 200]} fill={colorPallete.caput_mortuum.DEFAULT} radius={10} padding={10} direction={"column"} justifyContent={"space-between"}>
              <Layout>
                <Rect size={50} fill={colorPallete.wheat.DEFAULT}></Rect>
              </Layout>
              <Txt textAlign={"center"} fontSize={60} fill={"#fff"}>{x}</Txt>
              <Layout justifyContent={"end"}>
                <Rect size={50} fill={colorPallete.wheat.DEFAULT}></Rect>
              </Layout>
            </Rect>
            <Rect size={[100, 200]} justifyContent={"end"} direction={"column"}>
              <Line points={[[0, 100], [100, 100]]} stroke={colorPallete.caput_mortuum.DEFAULT} lineWidth={5} startArrow></Line>
            </Rect>
          </Rect>
        ))
      }
    </>
  )

  cloned_pattern.scale(.1);

  yield* all(
    cloned_pattern.scale(.8, 1),
    cloned_pattern.opacity(1, 1),
  )

  const iCode = createRef<Code>();
  view.add(
    <Code fontSize={60} ref={iCode} fill={"#000"} code={inputString} />
  )

  iCode().absolutePosition(inputStrValue().absolutePosition());
  iCode().absoluteScale(inputStrValue().absoluteScale());
  iCode().zIndex(2);

  yield* waitFor(2)

  const exampleNode = cloned_pattern.children()[0].clone();
  exampleNode.reparent(view);
  exampleNode.absolutePosition(cloned_pattern.findFirst(is(Rect)).absolutePosition())
  exampleNode.opacity(0)

  yield* all(
    cloned_pattern.opacity(0, 1),
    exampleNode.opacity(1, 1),
    exampleNode.position(0, 1),
    exampleNode.scale(1, 1)
  )


  const testString = "acct"
  const testCode = createRef<Code>();
  view.add(
    <Code ref={testCode} fill={"#000"} code={testString} />
  )

  testCode().absolutePosition(exampleNode.findFirst(is(Line)).absolutePosition().addY(50));

  yield* waitUntil("pick first");
  yield* testCode().selection(word(0, 0, 1), 1);

  const matchLayout = createRef<Layout>();



  view.add(
    <>
      <Layout ref={matchLayout} size={700} position={[600, -200]}>
        <Rect zIndex={2} radius={40} size={300} fill={"#000"}>
          <Txt fill={"#fff"}>a</Txt>
        </Rect>
        <Rect radius={40} size={200} y={350} fill={colorPallete.dark_cyan.DEFAULT}>
          <Txt></Txt>
        </Rect>
      </Layout>
    </>
  )

  matchLayout().findFirst(is(Txt)).absolutePosition(exampleNode.findFirst(is(Txt)).absolutePosition());


  yield* waitUntil("match")
  yield* all(
    matchLayout().findFirst(is(Txt)).position(0, 1),
    matchLayout().findFirst(is(Txt)).fontSize(90, 1),
  );

  matchLayout().findLast(is(Txt)).text("a");
  matchLayout().findLast(is(Txt)).absolutePosition(testCode().absolutePosition());
  yield* all(
    matchLayout().findLast(is(Txt)).position(0, 1),
    matchLayout().findLast(is(Txt)).fontSize(70, 1)
  )

  yield* all(
    matchLayout().findLast(is(Rect)).position(matchLayout().findLast(is(Rect)).position().addY(-300), 1),
    delay(
      .5,
      all(
        matchLayout().findFirst(is(Rect)).fill("lightgreen", .5).back(.1),
        matchLayout().findFirst(is(Rect)).scale(matchLayout().findFirst(is(Rect)).scale().add(.2), .3).back(.1),
        matchLayout().findFirst(is(Rect)).ripple(.3),
        exampleNode.findAll(is(Rect))[2].fill("lightgreen", 1),
        exampleNode.findAll(is(Rect))[2].ripple(.3)
      )
    )
  )

  yield* matchLayout().opacity(0, 1);
  yield* waitFor(9);
  const nextStrCode = cloneCode(testCode(), testString.substring(1), view)

  yield* nextStrCode.absolutePosition(nextStrCode.absolutePosition().addX(450), 2)

  yield* waitUntil("failure")
  yield* exampleNode.findAll(is(Rect))[3].fill("red", 1)
  nextStrCode.remove();


  yield* waitUntil("next chara")

  yield* testCode().selection(word(0, 0, 2), 2);

  yield* waitUntil("our case")
  matchLayout().findLast(is(Rect)).position(matchLayout().findLast(is(Rect)).position().addY(300))
  matchLayout().findLast(is(Txt)).text("ac");
  matchLayout().findLast(is(Txt)).fontSize(40)
  matchLayout().findLast(is(Txt)).absolutePosition(testCode().absolutePosition());

  yield* matchLayout().opacity(1, 1)
  
  yield* all(
    matchLayout().findLast(is(Txt)).position(0, 1),
    matchLayout().findLast(is(Txt)).fontSize(70, 1)
  )

 
  yield* all(
    matchLayout().findLast(is(Rect)).position(matchLayout().findLast(is(Rect)).position().addY(-300), 1),
    delay(
      .5,
      all(
        matchLayout().findFirst(is(Rect)).fill("red", .5).back(.1),
        exampleNode.findAll(is(Rect))[2].fill("red", 1),
      )
    )
  )

 
  yield* matchLayout().opacity(0, 1);
  testCode().remove();

  yield* waitUntil("lets return")

  yield* exampleNode.scale(0, 1)
  exampleNode.remove();

  yield* all(
    cloned_pattern.opacity(1, 1),
    cloned_pattern.scale(.8, 1)
  )


  yield* all(
    iCode().scale(.8, 2),
    iCode().absolutePosition(nodeArray[0].findFirst(is(Line)).absolutePosition().addX(-50).addY(50), 2)
  );

  yield* chain(
    waitFor(2),
    iCode().position(iCode().position().addX(50), 2),
    waitFor(1)
  )

  yield* animateNode(0, iCode(), inputString, nodeArray, patternArray(), view)




  yield* all(...nodeArray.map(x => x.opacity(1, 1)))
  yield* waitFor(1);
});


const isMatch = (op: string, s: string) => {
  if (op.length == 1) {
    return s.length == 1 && (op == s || op == ".")
  }
  else if (op.length == 2) {
    for (let i = 0; i < s.length; i++) {
      if (op[0] !== "." && op[0] != s[i]) return false
    }
    return true
  }
  else {
    return false
  }
}

function* animateNode(index: number, strCode: Code, str: string, nodes: Rect[], ops: string[], view: View2D): IterableIterator<boolean | ThreadGenerator | void | Promise<any> | Promisable<any>> {
  if (index >= ops.length && str.length > 0) {
    yield* waitFor(1);
    strCode.remove();
    return false;
  }

  if (index >= ops.length && str.length == 0) {
    yield* waitFor(1);
    // strCode.remove();
    return true;
  }

  yield* activateNode(index, nodes)


  const op = ops[index]

  let result: boolean = false

  const matchBox: Rect = nodes[index].findAll(is(Rect))[2]
  const returnBox: Rect = nodes[index].findAll(is(Rect))[3]

  if (op.length == 2) {
    yield* strCode.selection(word(0, 0, 0), 1);
    yield* matchBox.fill("lightgreen", 1);
    const nextStr = str.substring(0);
    const nextStrCode = cloneCode(strCode, nextStr, view);
    yield* nextStrCode.absolutePosition(nextStrCode.absolutePosition().addX(350), 2)

    result = yield* animateNode(index + 1, nextStrCode, nextStr, nodes, ops, view);
    yield* activateNode(index, nodes);
    yield* returnBox.fill(result ? "lightgreen" : "red", 1)
  }

  for (let i = 0; i < str.length; i++) {
    if (result) {
      yield* waitFor(1);
      // yield* returnBox.fill("red", 2)
      // strCode.remove();
      return true
    }

    const pickedStr = str.substring(0, i + 1)

    const valid = isMatch(op, pickedStr);
    yield* strCode.selection(word(0, 0, i + 1), 1);

    if (!valid) {
      yield* matchBox.fill("red", 1)
      yield* waitFor(1);
      strCode.remove();
      return false;
    }


    yield* matchBox.fill("lightgreen", 1);
    const nextStr = str.substring(i + 1);
    const nextStrCode = cloneCode(strCode, nextStr, view);
    yield* nextStrCode.absolutePosition(nextStrCode.absolutePosition().addX(350), 2);

    result = yield* animateNode(index + 1, nextStrCode, nextStr, nodes, ops, view);
    yield* activateNode(index, nodes);
    yield* returnBox.fill(result ? "lightgreen" : "red", 1)
  }

  yield* waitFor(1);
  if (!result) strCode.remove();
  return result
}

function cloneCode(currentCode: Code, code: string, view: View2D): Code {
  const cloneCode = currentCode.clone();
  cloneCode.reparent(view);
  cloneCode.absolutePosition(currentCode.absolutePosition())
  cloneCode.selection(lines(0));
  cloneCode.code(code);

  return cloneCode
}

function* activateNode(index: number, nodes: Rect[]) {
  yield* all(...nodes.map((x, i) => {
    if (i === index) {
      return x.opacity(1, .5)
    }

    return x.opacity(.2, .5)
  }));
}