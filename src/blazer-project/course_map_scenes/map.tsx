import { Img, is, Layout, Line, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, chain, createRef, DEFAULT, Direction, slideTransition, tween, waitFor, waitUntil } from "@motion-canvas/core";
import colors from "../assets/colors";
import { WebViewer } from "../../assets/nodes/WebViewer";
import { Browser } from "../../assets/nodes/Browser";
import screenshots from "../puppeteer/map/screenshots";
import { helper } from "showdown";
import CodeOrckLogo from "../../assets/nodes/CodeOrckLogo";
import addCodeOrckLogo from "../../assets/nodes/CodeOrckLogo";


export default makeScene2D(function* (view) {
  const mainRect = createRef<Rect>();
  const mainBrower = createRef<Browser>();
  const webImg = createRef<Img>();
  const titleLayout = createRef<Layout>();
  const titleTxt = createRef<Txt>();
  const subTitleTxt = createRef<Txt>();
  const highliterRect = createRef<Rect>();
  const secondHighliterRect = createRef<Rect>();

  view.add(
    <Rect ref={mainRect} size={view.size()} fill={colors.cerulean.DEFAULT} />
  );
  mainRect().add(
    <Layout layout direction={"column"} ref={titleLayout} justifyContent={"center"} alignItems={"center"} gap={20}>
      <Txt ref={titleTxt} fontSize={70} fill={"#fff"}>1. Queries and Dashboard</Txt>
      <Txt ref={subTitleTxt} fontSize={50} fill={"#fff"}></Txt>
    </Layout>
  )


  yield* slideTransition(Direction.Top, 1);
  // const browser: Browser = yield puppeteer.launch();
  // console.log(browser, "=====")
  // const page = yield browser.newPage()

  yield* waitFor(2);



  mainRect().add(
    <Browser ref={mainBrower} url="https://blazer.dokkuapp.com/" x={-2000}>
      <Img zIndex={1} opacity={0} ref={webImg} src={screenshots[0]} width={"100%"} y={470} />
    </Browser>
  )


  yield* tween(1, (val) => {
    mainBrower().position.x(-2000 + (val * 2000));
    titleLayout().position.x(2000 * val)
  })

  yield* chain(
    // mainBrower().writeUrl("https://blazer.dokkuapp.com/", 1),
    webImg().opacity(1, 1)
  )


  yield* webImg().y(-370, .5).back(.5);

  yield* mainBrower().navigateToUrl(
    "https://blazer.dokkuapp.com/query/",
    <Img zIndex={1} opacity={1} src={screenshots[1]} width={"100%"} y={470} />,
    .5
  )

  yield* waitFor(3.5)

  yield* mainBrower().goBack(.5)
  yield* webImg().position.y(470, .5)


  yield* tween(1, (val) => {
    mainBrower().position.x(-2000 * val);
    titleLayout().position.x(2000 - (2000 * val))
  })

  yield* titleTxt().text("2. Variables", 2);
  
  yield* waitUntil("variables")


  yield* tween(1, (val) => {
    mainBrower().position.x(-2000 + (val * 2000));
    titleLayout().position.x(2000 * val)
  });

  view.add(
    <>
      <Rect ref={highliterRect} zIndex={2} fill={"black"} opacity={.2} position={[-660, 155]} height={60} width={0} stroke={"red"} />
      <Rect ref={secondHighliterRect} zIndex={2} fill={"black"} opacity={.2} position={[-645, -275]} height={50} width={0} stroke={"red"} />
    </>
  )


  yield* webImg().position.y(-200, .5);



  yield* all (
    highliterRect().width(350, 1),
  );

  yield* all(
    mainBrower().navigateToUrl(
      "https://blazer.dokkuapp.com/queries/2-smart-column",
      <Img zIndex={1} opacity={1} src={screenshots[2]} width={"100%"} y={470} />,
      .5
    ),
    highliterRect().opacity(0, .5)
  );

  highliterRect().position([-670, -50]);
  highliterRect().height(100)
  highliterRect().opacity(.3)
  highliterRect().width(0);


  yield* all(
    secondHighliterRect().width(190, 1),
    highliterRect().width(360, 1)
  )

  yield* waitFor(.5);

  yield* all(
    secondHighliterRect().width(0, .2),
    highliterRect().width(0, .2)
  )

  yield* mainBrower().goBack(.5)


  highliterRect().position([-660, 219]);
  highliterRect().height(70);
  yield* highliterRect().width(380, .5)

  yield* waitFor(.5);

  yield* all(
    mainBrower().navigateToUrl(
      "https://blazer.dokkuapp.com/queries/1-smart-variable",
      <Img zIndex={1} opacity={1} src={screenshots[3]} width={"100%"} y={470} />,
      .3
    ),
    highliterRect().opacity(0, .3),
    highliterRect().width(0, .3),
  );


  mainBrower().showOnPage(
    <Img zIndex={1} opacity={1} src={screenshots[4]} width={"100%"} y={470} />
  )

  yield* mainBrower().navigateToUrl(
    "https://blazer.dokkuapp.com/queries/1-smart-variable?occupation_id=1",
    <Img zIndex={1} opacity={1} src={screenshots[5]} width={"100%"} y={470} />,
    .3
  ),

    yield* waitFor(.5);

  yield* mainBrower().goBack(.3);
  yield* mainBrower().goBack(.3);


  highliterRect().position([-743, -111]);
  highliterRect().opacity(.3)

  yield* highliterRect().width(200, .3)

  yield* all(
    highliterRect().width(0, .3),
  );


  yield* mainBrower().navigateToUrl(
    "https://blazer.dokkuapp.com/queries/3-linked-column",
    <Img zIndex={1} opacity={1} src={screenshots[6]} width={"100%"} y={470} />,
    .3
  ),

  highliterRect().position([-125, -68]);

  yield waitFor(.2);
  yield* highliterRect().width(310, .2);

  const indicatorLine = createRef<Line>();
  const indicatorTxt = createRef<Txt>();
  view.add(
    <>
      <Line ref={indicatorLine} points={[highliterRect().top(), highliterRect().top().addY(-100).addX(50)]} stroke={"#000"} lineWidth={2} startArrow/>
      <Txt ref={indicatorTxt} fontSize={40} position={highliterRect().top().addY(-130).addX(50)}>Links</Txt>
    </>
  )

  yield* all(
    indicatorLine().opacity(0, .5),
    indicatorTxt().opacity(0, .5)
  )
  indicatorLine().remove();
  indicatorTxt().remove()

  yield* highliterRect().width(0, .2)

  yield* mainBrower().goBack(.5);

  yield* tween(1, (val) => {
    mainBrower().position.x(-2000 * val);
    titleLayout().position.x(2000 - (2000 * val))
  })

  yield* titleTxt().text("3. Charts", 2);


  yield* waitUntil("charts")


  yield* tween(1, (val) => {
    mainBrower().position.x(-2000 + (val * 2000));
    titleLayout().position.x(2000 * val)
  });


  highliterRect().position([-775, 21]);

  yield* chain(
    highliterRect().width(150, .5),
    highliterRect().width(0, .5)
  );

  yield* mainBrower().navigateToUrl(
    "https://blazer.dokkuapp.com/queries/17-pie-chart",
    <Img zIndex={1} opacity={1} src={screenshots[7]} width={"100%"} y={470} />,
    .5
  ),

  yield* waitFor(.5);

  yield* mainBrower().goBack(.5);

  highliterRect().position([-745, 91]);

  yield* chain(
    highliterRect().width(200, .5),
    highliterRect().width(0, .5)
  );

  yield* mainBrower().navigateToUrl(
    "https://blazer.dokkuapp.com/queries/16-scatter-chart",
    <Img zIndex={1} opacity={1} src={screenshots[8]} width={"100%"} y={470} />,
    .5
  ),

  yield* waitFor(2);
  yield* mainBrower().goBack(.5)

  yield* tween(1, (val) => {
    mainBrower().position.x(-2000 * val);
    titleLayout().position.x(2000 - (2000 * val))
  })

  yield* titleTxt().text("4. Checks", 2);
  yield* waitUntil("checks")


  yield* tween(1, (val) => {
    mainBrower().position.x(-2000 + (val * 2000));
    titleLayout().position.x(2000 * val)
  });

  yield* webImg().position.y(400, .2);

  highliterRect().position([-715, -166]);

  yield* chain(
    highliterRect().width(250, .5),
    highliterRect().width(0, .5 )
  );

  yield* mainBrower().navigateToUrl(
    "https://blazer.dokkuapp.com/queries/10-check-for-bad-data",
    <Img zIndex={1} opacity={1} src={screenshots[9]} width={"100%"} y={470} />,
    .5
  ),

  highliterRect().position([-694, -203]);

  yield* chain(
    highliterRect().width(120, .5),
    highliterRect().width(0, .5)
  );

  yield* mainBrower().goBack(.5);

  
  highliterRect().position([-691, -97]);
  yield* chain(
    highliterRect().width(270, .5),
    highliterRect().width(0, .5)
  );


  yield* mainBrower().navigateToUrl(
    "https://blazer.dokkuapp.com/queries/11-check-for-missing-data",
    <Img zIndex={1} opacity={1} src={screenshots[10]} width={"100%"} y={470} />,
    .5
  ),

  highliterRect().position([-694, -203]);

  yield* chain(
    highliterRect().width(120, 1),
    waitFor(1),
    highliterRect().width(0, 1)
  );

  yield* mainBrower().goBack(1);


  yield* tween(1, (val) => {
    mainBrower().position.x(-2000 * val);
    titleLayout().position.x(2000 - (2000 * val))
  })

  yield* titleTxt().text("5. Cohort Analysis", 2);
  yield* waitUntil("cohort")


  yield* tween(1, (val) => {
    mainBrower().position.x(-2000 + (val * 2000));
    titleLayout().position.x(2000 * val)
  });

  yield* webImg().position.y(400, 1);

  highliterRect().position([-550, -28]);

  yield* chain(
    highliterRect().width(570, .5),
    highliterRect().width(0, .5)
  );

  yield* mainBrower().navigateToUrl(
    "https://blazer.dokkuapp.com/queries/19-cohort-analysis-from-first-order",
    <Img zIndex={1} opacity={1} src={screenshots[11]} width={"100%"} y={470} />,
    .5
  ),

  highliterRect().position([-754, 267]);
  highliterRect().width(200);
  highliterRect().height(0);

  yield*  highliterRect().height(600, .5);
  yield* waitFor(1)
  yield* highliterRect().height(0, .5);

  highliterRect().width(0);
  highliterRect().height(80);

  yield* mainBrower().goBack(.5);


  yield* tween(1, (val) => {
    mainBrower().position.x(-2000 * val);
    titleLayout().position.x(2000 - (2000 * val))
  })

  yield* titleTxt().text("6. Datasources", 2);
  yield* waitUntil("datasources")


  yield* tween(1, (val) => {
    mainBrower().position.x(-2000 + (val * 2000));
    titleLayout().position.x(2000 * val)
  });

  yield* webImg().y(470, 1);

  highliterRect().position([726, -380]);



  yield* chain(
    highliterRect().width(240, .5),
    highliterRect().width(0, .5)
  );

  yield* mainBrower().navigateToUrl(
    "https://blazer.dokkuapp.com/query/new",
    <Img zIndex={1} opacity={1} src={screenshots[1]} width={"100%"} y={470} />,
    .5
  );

  yield* waitFor(1)

  const arrowLine = createRef<Line>();
  
  mainBrower().showOnPage(
    <Img zIndex={1} opacity={1} src={screenshots[12]} width={"100%"} y={470} />
  );

  view.add(
    <>
      <Line ref={arrowLine} points={[[-206, 21], [-144, 21]]} startArrow stroke={"#000"} lineWidth={5} />
      <Txt fontSize={40} position={() => arrowLine().right().addX(40).addY(20)}>Name for datasource</Txt>
    </>
  )

  yield* arrowLine().position.y(arrowLine().position.y() + 40, 1)

  yield* arrowLine().position.y(arrowLine().position.y() + 40, 1)

  yield* waitFor(2);

  arrowLine().remove();
  view.findLast(is(Txt)).remove();

  yield* mainBrower().goBack(1);

  yield* tween(2, (val) => {
    mainBrower().position.x(-2000 * val);
    titleLayout().position.x(2000 - (2000 * val))
  })

  yield* titleTxt().text("7. Miscellaneous", 2);
  yield* waitFor(2)

  const overlayRect = createRef<Rect>();
  const contentLayout = createRef<Rect>();

  view.add(<Rect ref={overlayRect} y={-1200} size={view.size()} opacity={.7} fill={"#000"} />)

  yield* overlayRect().position.y(0, 1)
  view.add(
    <Layout ref={contentLayout} layout direction={"column"} zIndex={5} gap={30}>
      <Txt zIndex={5} fontSize={70} fill={"#fff"}>- Forcasting</Txt>
      <Txt zIndex={5} fontSize={70} fill={"#fff"}>- Trends</Txt>
      <Txt zIndex={5} fontSize={70} fill={"#fff"}>- Any other thing missed</Txt>
    </Layout>
  )

  yield* waitUntil("conclusion")

  // view.findLast(is(Layout)).children().forEach(r => r.remove());

  contentLayout().remove();

  yield* overlayRect().position.y(-1200, 1)


  yield* titleTxt().text("Conclusion", 2);
  // yield* tween(2, (val) => {
  //   mainBrower().position.x(-2000 + (val * 2000));
  //   titleLayout().position.x(2000 * val)
  // });


  const logo = addCodeOrckLogo(view);
  logo.position([874, 475])

  yield* waitFor(1);

  yield* all(
    logo.scale(1.5, 1),
    logo.rotation(360, 1)
  )

  yield* subTitleTxt().text("Thanks for listenning.", 2)
  yield* waitFor(3)

});

