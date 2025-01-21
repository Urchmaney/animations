import { Img, Layout, Length, Node, Rect, RectProps, Txt } from "@motion-canvas/2d";
import rightIcon from "../images/right.svg";
import reloadIcon from "../images/refresht.svg";
import leftIcon from "../images/left.svg";
import { ThreadGenerator, makeRef } from "@motion-canvas/core";


export interface BrowserProps extends RectProps {
  layout?: boolean;
  height?: Length;
  width?: Length;
  url: string
}

export class Browser extends Rect {
  public readonly url: Txt;
  public readonly page: Rect;

  private urlToNodeMap: Record<string, Node> = {}

  private stackUrl: string[] = [];
  private stackPosition: number = -1;

  constructor({
    children,
    layout = true,
    width = '100%',
    height = '100%',
    url,
    ...props
  }: BrowserProps) {

    if (Array.isArray(children) && children.length > 1) {
      throw "The child must be a single element. Consider wrapping the children with a Layout"
    }
    super({
      layout,
      width,
      height,
      ...props
    });

    this.urlToNodeMap[url] = children as Node

    this.add(
      <Rect zIndex={2} layout direction="column" height="100%" width="100%" fill="lightgray">
        <Rect zIndex={2} fill={"lightgray"}>
          <Layout gap={40} padding={20} width="100%" alignItems="center">
            <Img src={leftIcon} width={30} height={30} />
            <Img src={rightIcon} width={30} height={30} />
            <Img src={reloadIcon} width={30} height={30} />
            <Rect fill="white" zIndex={2} height={50} stroke="gray" width="70%" radius={25} padding={10} paddingLeft={30} alignItems="center">
              <Txt fontSize={30} ref={makeRef(this, "url")}>{url}</Txt>
            </Rect>

          </Layout>
        </Rect>
        <Rect zIndex={1} grow={1} layout={false} direction="column" fill="gray" ref={makeRef(this, "page")} >
          {children}
        </Rect>
      </Rect>
    )
    this.stackUrl.push(url);
    this.stackPosition += 1;
  }


  * writeUrl(url: string, time: number): ThreadGenerator {
    yield* this.url.text(url, time);
  }

  showPage() {
    const url = this.stackUrl[this.stackPosition];
    const node = this.urlToNodeMap[url];
    this.page.removeChildren();
    this.page.add(
      node
    )
  }

  addPage(url: string, node: Node) {
    this.stackUrl = this.stackUrl.slice(0, this.stackPosition + 1);
    this.stackUrl.push(url);
    this.stackPosition += 1;
    this.urlToNodeMap[url] = node;
    this.showPage()
  }

  backPage() {
    if (this.stackPosition - 1 < 0) return;
    this.stackPosition -= 1;
    this.showPage()
  }

  * navigateToUrl(url: string, node: Node, time: number) {
    yield* this.url.text(url, time);
    this.addPage(url, node);
  }

  * goBack(time: number) {
    if (this.stackPosition - 1 < 0) return;
    this.stackPosition -= 1;
    yield* this.url.text(this.stackUrl[this.stackPosition], time);
    this.showPage()
  }

  showOnPage(node: Node) {
    this.page.add(
      node
    )
  }
}