import { Img, Rect, RectProps } from "@motion-canvas/2d";
import { makeRef } from "@motion-canvas/core";
import puppeteer, { Browser, Page } from "puppeteer";

export interface WebViewerProps extends RectProps {
  browser?: Browser
  page?: Page
}

// const browser = await puppeteer.launch();
// const page = await browser.newPage();

export class WebViewer extends Rect {
  public readonly declare bodyImage: Img;
  private readonly browser? : Browser
  private page : Page;

  constructor(props: WebViewerProps) {
    const { browser, page, ...others } = props;
    super(others);
    this.browser = browser;
    this.page = page;
    this.add(
      <Img ref={makeRef(this, "bodyImage")} size={() => this.size()}/>
    )
  }

  async * show(time: number) {
    await page.goto('https://developer.chrome.com/');

    const image  = await page.screenshot({
     encoding: 'base64'
    });

    yield this.bodyImage.src(image, time);
  }


}