import { Circle, Code, CodeProps, Layout, LayoutProps, LezerHighlighter, Rect, RectProps, Txt, TxtProps } from "@motion-canvas/2d";
import { makeRef, SignalValue } from "@motion-canvas/core";
import { Terminal } from "./Terminal";
import {parser} from '@lezer/javascript';

interface CodeWhisperProps extends LayoutProps {
  codeProps?: CodeProps
  codeBoxProps?: Omit<RectProps, 'layout'| 'column'>
  speakerTxtProps?: TxtProps
}

Code.defaultHighlighter = new LezerHighlighter(parser);
export class CodeWhisper extends Layout {

  public readonly declare codeBox: Rect;
  public readonly declare code: Code;
  public readonly declare speakerTxt: Txt;
  public readonly declare terminalBox: Terminal

  constructor(props: CodeWhisperProps) {
    const { codeProps, codeBoxProps, speakerTxtProps, ...others } = props
    super({ layout: true, direction: "column", gap: 10, ...others });

    const codeboxProps = { ...({ padding: 50, fill: "#2a2727", gap: 0,  width: "100%", layout: true, direction: "column" })as RectProps, ...(codeBoxProps || {}) }
    this.add(
      <>
        <Rect width={100} height={100}>
          <Txt ref={makeRef(this, "speakerTxt")} {...speakerTxtProps}></Txt>
        </Rect>
        <Layout  grow={1} width={"100%"} height={"100%"} layout>
          <Rect ref={makeRef(this, "codeBox")} {...codeboxProps}>
            <Layout layout gap={10}>
              <Circle fill={"red"} size={30}></Circle>
              <Circle fill={"yellow"} size={30}></Circle>
              <Circle fill={"green"} size={30}></Circle>
            </Layout>
            <Code  {...codeProps} ref={makeRef(this, "code")} />
          </Rect>
          <Rect fill={"black"} grow={1} paddingTop={50}>
            <Terminal ref={makeRef(this, "terminalBox")}></Terminal>
          </Rect>
        </Layout>
      </>
    )
  }

  * say(text: string, duration: number) {
    yield* this.speakerTxt.text("", .05); 
    yield* this.speakerTxt.text(text, duration)
  }
}