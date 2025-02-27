import { Img, is, Layout, Line, makeScene2D, Rect, Spline, Txt } from "@motion-canvas/2d";
import { all, chain, createRef, createSignal, Direction, makeRef, makeRefs, range, slideTransition, tween, Vector2, waitFor } from "@motion-canvas/core";
import colorPallete from "../../leetcode_nine/colors";


export default makeScene2D(function* (view) {
  const patternString = "ab*a*c*a"
  const inputString = "aaca"

  const inputStr = createRef<Txt>();
  const patternStr = createRef<Txt>();
  const inputsLayoutRef = createRef<Layout>();

  const iColor = "#fe7d6a";

  const stageRefs: Rect[] = [];
  view.add(
    <Layout layout direction={"column"} gap={30} ref={inputsLayoutRef} zIndex={2}>
      <Rect layout gap={80} fill={iColor} fontSize={70} radius={20} padding={20}>
        <Txt ref={inputStr}></Txt>
        <Txt>{`s = "${inputString}"`}</Txt>
      </Rect>

      <Rect layout gap={80} fill={iColor} fontSize={70} radius={20} padding={20}>
        <Txt ref={patternStr}></Txt><Txt>{`p = "${patternString}"`}</Txt>
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
      <Rect ref={makeRef(stageRefs, 0)} size={320} layout radius={30} justifyContent={"center"} alignItems={"center"} fill={colorPallete.cinnabar.DEFAULT}>
        <Txt fontWeight={600} fill={"#FFF"} textWrap>Input</Txt>
      </Rect>
      <Rect size={150} ref={makeRef(stageRefs, 3)} >
        <Spline ref={fDirection} lineWidth={10} stroke={"black"} points={[
          [-75, 0],
          [75, 0]
        ]} endArrow end={0}></Spline>
      </Rect>
      <Rect ref={makeRef(stageRefs, 1)} size={320} layout radius={30} justifyContent={"center"} alignItems={"center"} fill={colorPallete.cinnabar.DEFAULT}>
        <Txt fill={"#fff"} textAlign={"center"} fontWeight={600} textWrap>Pattern Splitting</Txt>
      </Rect>
      <Rect size={150}>
        <Spline ref={sDirection} lineWidth={10} stroke={"black"} points={[
          [-75, 0],
          [75, 0]
        ]} endArrow end={0}></Spline>
      </Rect>
      <Rect ref={makeRef(stageRefs, 2)} size={320} layout radius={30} justifyContent={"center"} alignItems={"center"} fill={colorPallete.cinnabar.DEFAULT}>
        <Txt fill={"#fff"} fontWeight={600} textWrap textAlign={"center"}>
          Find Percentage match
        </Txt>
      </Rect>
    </Layout>
  )

  yield* chain(fDirection().end(1, 1), waitFor(1), sDirection().end(1, 1));
  yield* waitFor(4);

  const highligter = createRef<Rect>();
  view.add(
    <Rect ref={highligter} zIndex={-1} radius={30} fill={colorPallete.cinnabar["800"]} size={330} position={stageRefs[0].position()}></Rect>
  )
  yield* all(highligter().ripple(1), inputsLayoutRef().scale(.8, .5).back(.5))

  yield* all(highligter().position(() => {
    return stageRefs[1].position()
  }, 1));

  yield* tween(1, (val) => {
    stageLayoutRef().position.x((-2000 * val));
    highligter().position.x(-2000 * val)
  });



  const splittingRef = createRef<Layout>();

  const ref = createRef<Layout>();
  const pStr = createRef<Txt>();
  const patternArray = createSignal<string[]>([]);
  view.add(
    <>
      {/* <Layout layout direction={"column"}>
      <Rect textAlign={"center"} layout={false}>
        <Rect ref={ref} layout direction={"column"}>
          <Txt>Pattern Splitting</Txt>
        </Rect>
        <Line zIndex={2} stroke={"red"} lineWidth={10} points={[ref().left(), ref().right()]} position={ref().bottom().addY(10)}></Line>
      </Rect> 

      <Rect>
        <Layout layout direction={"column"} gap={30}>
          <Rect layout>
            <Rect size={100} fill={"black"} radius={20}></Rect>
          </Rect>
          <Txt letterSpacing={50}>shjdhjfdfhdhj</Txt>
        </Layout>
      </Rect> 
    </Layout> */}
      <Layout ref={splittingRef}>
        <Rect textAlign={"center"} layout={false} y={-300}>
          <Rect ref={ref} layout direction={"column"}>
            <Txt>Pattern Splitting</Txt>
          </Rect>
          <Line zIndex={2} stroke={"red"} lineWidth={10} points={[ref().left(), ref().right()]} position={ref().bottom().addY(10)}></Line>
        </Rect>

        <Rect>
          <Layout layout direction={"column"} gap={100} justifyContent={"center"} alignItems={"center"}>
            <Rect layout gap={20}>
              {() => patternArray().map(x => <Rect layout justifyContent={"center"} alignItems={"center"} size={100} fill={"black"} radius={20}>
                <Txt fill={"#fff"}>{x}</Txt>
              </Rect>)}
            </Rect>
            <Txt ref={pStr} letterSpacing={50} fontSize={50}>{patternString}</Txt>
          </Layout>
        </Rect>
      </Layout>

    </>
  )

  yield* waitFor(1);

  const charWidth = pStr().width() / patternString.length;
  const dSignal = createSignal(charWidth / 2 - 20);
  const pointerRef = createRef<Spline>()

  view.add(<Spline ref={pointerRef} endArrow lineWidth={10} stroke={"red"} points={() => [
    pStr().bottomLeft().addY(30).addX(dSignal()),
    pStr().bottomLeft().addX(dSignal()),
  ]}></Spline>)

  for (let i = 0; i < patternString.length; i++) {
    const char = patternString[i];
    // const last = `${patternArray()[patternArray().length - 1]}${char}`
    if (char === "*") {
      const last = `${patternArray()[patternArray().length - 1]}${char}`
      yield* patternArray([...patternArray().slice(0, patternArray().length - 1), last], 1)
    } else {
      yield* patternArray([...patternArray(), char], 1)
    }
    yield* dSignal(dSignal() + charWidth, 1);
  }


  inputsLayoutRef().add(
    <Rect layout direction={"column"} fill={iColor} gap={10} fontSize={70} radius={20} padding={20}>
      <Txt>
        {`pattern_splitted = [`}
      </Txt>
      <Rect layout gap={20} scale={.8}>
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
  const highligterCurrentX = highligter().x();
  yield* tween(1, (val) => {
    stageLayoutRef().position.x((stageCurrentPosX - (stageCurrentPosX * val)));
    splittingRef().position.x(2000 * val)
    highligter().position.x(highligterCurrentX - (highligterCurrentX * val));
  });

  yield* inputsLayoutRef().scale(.4, 1)

  yield* all(highligter().ripple(1));
  yield* all(highligter().position(() => {
    return stageRefs[2].position()
  }, 1));


  yield* tween(1, (val) => {
    stageLayoutRef().position.x((-2000 * val));
    highligter().position.x(-2000 * val)
  });



  const LIGHT_GRAY = "#e5acb6";
  const findMatchingRef = createRef<Layout>();
  const matchTitleRef = createRef<Rect>();

  const inputContainer = createRef<Rect>();

  const patternContentSignals = patternArray().map(_ => createSignal([]));
  const inputHighligher = createRef<Rect>();
  const inputsCharRef: Rect[] = [];
  const pContainer: Rect[] = [];
  view.add(
    <>
      <Layout ref={findMatchingRef}>
        <Rect textAlign={"center"} layout={false} y={-300}>
          <Rect ref={matchTitleRef} layout={true} direction={"column"} textAlign={"center"}>
            <Txt> Percentage Match</Txt>
          </Rect>
          <Line zIndex={2} stroke={"red"} lineWidth={10} points={[matchTitleRef().left().addX(10), matchTitleRef().right().addX(10)]} position={ref().bottom().addY(10)}></Line>
        </Rect>

        <Rect>
          <Layout layout direction={"column"} gap={100} justifyContent={"center"} alignItems={"center"}>
            <Rect layout gap={20}>
              {patternArray().map((x, i) => (
                <Rect layout padding={5} fill={LIGHT_GRAY} radius={10} ref={makeRef(pContainer, i)}>
                  <Rect layout direction={"column"} radius={10} fill={"#ffc0cb"} justifyContent={"start"} alignItems={"center"} minHeight={110}>
                    <Rect><Txt>{`${x}`}</Txt></Rect>
                    <Rect gap={10}>
                      {() => (patternContentSignals[i]()).map(y => (
                        <Rect layout justifyContent={"center"} alignItems={"center"} size={50} radius={[0, 0, 10, 10]} fill={"gray"}>
                          <Txt>{y}</Txt>
                        </Rect>
                      ))}
                    </Rect>

                  </Rect>
                </Rect>
              ))}
            </Rect>
            <Rect layout gap={20} ref={inputContainer} padding={10} radius={10}>
              {inputString.split("").map((x, i) => <Rect ref={makeRef(inputsCharRef, i)} layout justifyContent={"center"} alignItems={"center"} size={100} fill={"black"} radius={20}>
                <Txt fill={"#fff"}>{x}</Txt>
              </Rect>)}
            </Rect>
          </Layout>
        </Rect>
      </Layout>
      <Rect ref={inputHighligher} zIndex={-2} opacity={0} radius={20} size={110} fill={"white"}></Rect>
    </>
  )

  const visitedPattern: Record<string, boolean> = {};
  const MAX_SEQUENCE = 9;
  let sequence = 0
  let patternIndex = 0;
  let inputIndex = 0;
  let justbreak = false

  while (inputIndex < inputString.length && patternIndex < patternArray().length && !justbreak) {
    const inputTxt = inputsCharRef[inputIndex].findFirst<Txt>(is(Txt))
    const t = inputTxt.text();
    const p = patternArray()[patternIndex];

    yield* chain(
      inputHighligher().absolutePosition(inputsCharRef[inputIndex].absolutePosition(), .5),
      pContainer[patternIndex].fill("#fff", 1),
      inputHighligher().opacity(1, .5),
    );

    if (p.includes("*") && !visitedPattern[p]) {
      yield* pContainer[patternIndex].fill("lightgreen", 1).to(LIGHT_GRAY, .2)
      visitedPattern[p] = true
      patternIndex++
      sequence++
      continue;
    }

    yield* chain(
      inputTxt.text("", 1),
      patternContentSignals[patternIndex]([...patternContentSignals[patternIndex](), t], 1),
    )

    if ((patternIndex === patternArray().length - 1 && inputIndex < inputString.length - 1) || !isMatch(p, t)) {
      if (isMatch(p, t)) {
        yield* pContainer[patternIndex].fill("lightgreen", 1).to(LIGHT_GRAY, .2);
      }
      else {
        yield* pContainer[patternIndex].fill("red", 1).to(LIGHT_GRAY, .2);
      }
      yield* chain(
        inputContainer().fill("red", 1).back(.5),
        patternContentSignals[patternIndex]([...patternContentSignals[patternIndex]().slice(0, -1)], 1),
        inputTxt.text(t, 1),
        pContainer[patternIndex].fill(LIGHT_GRAY, .2)
      )
      patternIndex--
      sequence++
      continue;
    }

    yield* pContainer[patternIndex].fill("lightgreen", 1).to(LIGHT_GRAY, .2);

    inputIndex++
    patternIndex++
    sequence++
  }

  yield* inputContainer().fill("lightgreen", 1)
  yield* waitFor(1);
  yield* waitFor(4);

});


const isMatch = (op: string, s: string) => {
  if(op.length == 1) {
    return s.length == 1 && (op == s || op == ".")
  }
  else if (op.length == 2) {
    for(let i = 0; i < s.length; i++) {
      if (op[0] !== "." && op[0] != s[i]) return false
    }
    return true
  }
  else {
    return false
  }
}