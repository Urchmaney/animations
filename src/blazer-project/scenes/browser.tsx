import { Img, Line, makeScene2D, Rect, Txt } from "@motion-canvas/2d"
import { createRef, Direction, slideTransition, waitFor } from "@motion-canvas/core";
import { Browser } from "../../assets/nodes/Browser";
import railsHomeImg from "../images/screenshot_1.png";
import blazerHomeImg from "../images/screenshot_2.png";
import blazerCreateProject from "../images/screenshot_3.png"
import blazerWithResult from "../images/screenshot_5.png";


export default makeScene2D(function* (view) {
  const browser = createRef<Browser>();
  const lineRef = createRef<Line>();
  const userRectRef = createRef<Rect>();
  const queryTxt = createRef<Txt>();
  const nameTxt = createRef<Txt>();
  const descTxt = createRef<Txt>();

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

  yield* browser().navigateToUrl(
    "http://localhost:3000/biz-analytics/queries/new",
    <Img src={blazerCreateProject} width="100%" height="100%"/>,
    1
  )


  view.add(
    <Rect width="100%" height="100%" fill="black" zIndex={5} opacity={0.9} ref={userRectRef}>
      <Rect width={500} height={700} fill="gray" opacity={1} layout direction="column" radius={20}> 
        <Rect width="100%" height={100} layout justifyContent="center" alignItems="center">
          <Txt fill="white">User</Txt>
        </Rect>
        <Line 
           points={[
            [-250, -250],
            [250, -250],
         
          ]}
          stroke={'black'}
          lineWidth={8}
        />
        <Rect layout direction="column" gap={40} padding={20} paddingTop={70}>
          <Txt fill="white">
            full_name
          </Txt>
          <Txt fill="white">
            email
            </Txt>
          <Txt fill="white">
            dob
          </Txt>
          <Txt fill="white">
            experience
          </Txt>

        </Rect>
      </Rect>
    </Rect>
  )

  yield* waitFor(2);

  userRectRef().remove();

  view.add(
    <Txt ref={queryTxt} position={[-800, -384]} fill="lightgray" zIndex={7} fontSize={24} textAlign="left" offsetX={-1}>
    </Txt>
  )

  yield* queryTxt().text("SELECT * FROM users where strftime('%m', dob) = '07'", 2);

  lineRef().points(
    [
      [133, -55],
      [290, -55],
      [290, 30],
      [133, 30],
      [133, -55]
    ]
  )
  
  yield* lineRef().end(1, 1).back(1);

  browser().setPage(<Img src={blazerWithResult} width="100%" height="100%"/>)

  view.add(
    <Txt ref={nameTxt} position={[345, -335]} fill="black" zIndex={7} fontSize={24} textAlign="left" offsetX={-1} fontWeight={5}>
    </Txt>
  )

  yield* nameTxt().text("DOB", 2);

  view.add(
    <Txt ref={descTxt} position={[357, -190]} fill="black" zIndex={7} fontSize={24} textAlign="left" offsetX={-1} fontWeight={5}>
    </Txt>
  )

  yield* descTxt().text("DOB", 2);
  yield* waitFor(20);

 

})