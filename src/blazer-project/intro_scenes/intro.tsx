import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { BlazerLogo } from "../assets/blazerLogo";
import colors from "../assets/colors";
import { all, createRef, waitFor } from "@motion-canvas/core";
import addCodeOrckLogo from "../../assets/nodes/CodeOrckLogo";

export default makeScene2D(function* (view) {
  const blazerLogo = createRef<BlazerLogo>();
  const introMainRect = createRef<Rect>();
  const subTitleTxt = createRef<Txt>();
  const titleTxt = createRef<Txt>();
  view.add(
    <Rect ref={introMainRect} width={view.width()} height={view.height()} fill={colors.auburn.DEFAULT}>
      <BlazerLogo ref={blazerLogo} width={300} height={150} y={-10} />
      <Txt ref={titleTxt} y={120} fontSize={90} fill={"#fff"} letterSpacing={5}>Blazer</Txt>
      <Txt ref={subTitleTxt} y={230} fill={"#fff"}></Txt>
    </Rect>
  )
  const orckLogo = addCodeOrckLogo(introMainRect());

  yield* blazerLogo().show(2);
  yield* orckLogo.rotation(360, 1);

  yield* all(
    blazerLogo().position.y(blazerLogo().y() - 40, 1),
    blazerLogo().width(250, 1),
    blazerLogo().height(150, 1),
    titleTxt().position.y(titleTxt().y() - 40, 1),
    subTitleTxt().position.y(subTitleTxt().y() - 40, 1),
    subTitleTxt().text("Queries and Dashboards (Basic Authentication)", 1)
  )

})