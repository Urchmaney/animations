import { Img, Layout, Length, Rect, RectProps, Txt } from "@motion-canvas/2d";
import rightIcon from "../images/right.svg";
import leftIcon from "../images/left.svg";
import hh from "../../blazer-project/images/screenshot_3.png";


export interface BrowserProps extends RectProps {
  layout?: boolean;
  height?: Length;
  width?: Length;
}

export class Browser extends Rect {

  constructor({
    children,
    layout=true,
    width = '100%',
    height = '100%',
    ...props
  }: BrowserProps) {
    super({
      layout,
      width,
      height,
      ...props
    });

    this.add(
      <Rect layout direction="column" height="100%" width="100%" fill="lightgray">
        <Rect>
          <Layout gap={40} padding={20} width="100%" alignItems="center">
            <Img src={leftIcon} width={30} height={30} />
            <Img src={rightIcon} width={30} height={30} />
            <Rect fill="white" zIndex={2} stroke="gray" width="70%" radius={25} padding={10} paddingLeft={30} alignItems="center"> 
              <Txt fontSize={30}>why me</Txt>
            </Rect>
            
          </Layout>
        </Rect>
        <Rect grow={1} layout direction="column" fill="red"> 
          {/* {children} */}
          <Img src={hh} width="100%" height="100%" />
        </Rect>
      </Rect>
   
    )
  }


}