import { Circle, Code, CodeProps, Layout, LayoutProps, LezerHighlighter, Rect, Txt, TxtProps } from "@motion-canvas/2d";
import { makeRef, SignalValue } from "@motion-canvas/core";
import { Terminal } from "./Terminal";
import {parser} from '@lezer/javascript';

interface CodeWhisperProps extends LayoutProps {
  codeProps?: CodeProps
  speakerTxtProps?: TxtProps
}

Code.defaultHighlighter = new LezerHighlighter(parser);
export class CodeWhisper extends Layout {

  public readonly declare codeBox: Rect;
  public readonly declare speakerTxt: Txt;
  public readonly declare terminalBox: Terminal

  constructor(props: CodeWhisperProps) {
    const { codeProps, speakerTxtProps, ...others } = props
    super({ layout: true, direction: "column", gap: 10, ...others });
    this.add(
      <>
        <Rect width={100}>
          <Txt ref={makeRef(this, "speakerTxt")} {...speakerTxtProps}>Welcome</Txt>
        </Rect>
        <Layout grow={1} width={"100%"} height={"100%"} layout>
          <Rect padding={50} layout direction={"column"} fill={"black"} gap={20}>
            <Layout layout gap={10}>
              <Circle fill={"red"} size={30}></Circle>
              <Circle fill={"yellow"} size={30}></Circle>
              <Circle fill={"green"} size={30}></Circle>
            </Layout>
            <Code {...codeProps} ref={makeRef(this, "codeBox")} />
          </Rect>
          <Rect fill={"black"} grow={1} width={"100%"}>
            <Terminal ref={makeRef(this, "terminalBox")}></Terminal>
          </Rect>
        </Layout>
      </>
    )
  }

  * say(text: string, duration: number) {
    yield* this.speakerTxt.text(text, duration)
  }
}