import { Img, Layout, Length, Node, Rect, RectProps, Txt } from "@motion-canvas/2d";
import rightIcon from "../images/right.svg";
import reloadIcon from "../images/refresht.svg";
import leftIcon from "../images/left.svg";
import { ThreadGenerator, makeRef } from "@motion-canvas/core";


export interface BrowserProps extends RectProps {
  layout?: boolean;
  height?: Length;
  width?: Length;
}

export class Browser extends Rect {
  public readonly url: Txt;
  public readonly page: Rect;

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
            <Img src={reloadIcon} width={30} height={30} />
            <Rect fill="white" zIndex={2} stroke="gray" width="70%" radius={25} padding={10} paddingLeft={30} alignItems="center"> 
              <Txt fontSize={30} ref={makeRef(this, "url")}></Txt>
            </Rect>
            
          </Layout>
        </Rect>
        <Rect grow={1} layout direction="column" fill="gray" ref={makeRef(this, "page")}> 
          {children} 
        </Rect>
      </Rect>
   
    )
  }


  
  * writeUrl(url: string, time: number): ThreadGenerator {
    yield* this.url.text(url, time)
  }

  setPage(node: Node) {
    this.page.removeChildren();
    this.page.add(
      node
    )
  }

  * navigateToUrl(url: string, node: Node, time: number) {
    yield* this.url.text(url, time);
    this.setPage(node);
  }
}