
import { CODE, Code, Img, Layout, Line, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { ThreadGenerator, all, chain, createRef, loop, makeRef, range, tween, waitFor, waitUntil } from "@motion-canvas/core";
import searchImage from "../images/seacrhIcon.svg";
import { VSCode } from "../../assets/nodes/VSCode";
import { routeFile, sideBarTree } from "../assets/blazer_vscode";
import { BlazerLogo } from "../assets/blazerLogo";
import colors from "../assets/colors";
import addCodeOrckLogo from "../../assets/nodes/CodeOrckLogo";


export default makeScene2D(function* (view) {
  const mainVScode = createRef<VSCode>();
  const childCode = createRef<Code>();
  const blazerLogo = createRef<BlazerLogo>();
  const introMainRect = createRef<Rect>();
  const subTitleTxt = createRef<Txt>();
  const titleTxt = createRef<Txt>();

  const routePathSignal = Code.createSignal("");
  const urlSignal = Code.createSignal("blazer");

  view.add(
    <Rect ref={introMainRect} width={view.width()} height={view.height()} fill={colors.auburn.DEFAULT}>
      <BlazerLogo ref={blazerLogo} width={300} height={150} y={-10}/>
      <Txt ref={titleTxt} y={120} fontSize={90} fill={"#fff"} letterSpacing={5}>Blazer</Txt>
      <Txt ref={subTitleTxt} y={230} fill={"#fff"}></Txt>
    </Rect>
  )

  const orckLogo = addCodeOrckLogo(introMainRect());

  yield* waitFor(2);

  yield* blazerLogo().show(2);
  yield* orckLogo.rotation(360, 1);
  yield* waitUntil("spoke about")

  view.add(
    <VSCode
      ref={mainVScode}
      sideBarTree={sideBarTree}
      height={() => view.height()}
      width={() => view.width()}
      x={2000}
    >
      <Rect padding={10} paddingTop={5}>
        <Code
          ref={childCode}
          fontSize={20}
          offsetX={-1}
          x={-400}
          code={routeFile(routePathSignal)}
        />
      </Rect>
    </VSCode>
  );

  yield* tween(1, (val) => {
    introMainRect().position.x(val * 2000 * -1);
    mainVScode().position.x(2000 - (val * 2000))
  })

  yield* chain(
    mainVScode().submitToTerminal("bundle install", 1),
    routePathSignal(CODE`mount Blazer::Engine, at: '${urlSignal}'`, 1),
    urlSignal("analytics", .5 )
  );

  
  yield* tween(1, (val) => {
    mainVScode().position.x(val * 2000);
    introMainRect().position.x(-2000 + (val * 2000))
  });


  yield* all(
    blazerLogo().position.y(blazerLogo().y() - 40, 1),
    blazerLogo().width(250, 1),
    blazerLogo().height(150, 1),
    titleTxt().position.y(titleTxt().y() - 40, 1),
    subTitleTxt().position.y(subTitleTxt().y() - 40, 1),
    subTitleTxt().text("( Structure / Map )", 1)
  )
  yield* waitFor(5)
});