import { colorSignal, initial, Line, Rect, RectProps, signal, Spline } from "@motion-canvas/2d";
import { cancel, ColorSignal, createRef, loop, makeRef, PossibleColor, Reference, SignalValue, SimpleSignal, ThreadGenerator } from "@motion-canvas/core";


export interface BoxCurtainProps extends Omit<RectProps, "layout"> {
  headerColor?: SignalValue<PossibleColor>
  headerWidth?: SignalValue<number>
  headerDelta?: SignalValue<number>
  coverFill?: SignalValue<PossibleColor>
}

export class BoxCurtain extends Rect {

  public declare readonly header: Line;
  public declare readonly cover: Spline;
  private readonly virtualRect: Reference<Rect> = createRef<Rect>();
  private blinkTask: ThreadGenerator;

  @initial(50)
  @signal()
  public declare readonly headerDelta: SimpleSignal<number, this>;

  @initial(10)
  @signal()
  public declare readonly headerWidth: SimpleSignal<number, this>;

  @initial('#FFF')
  @colorSignal()
  public declare readonly headerColor: ColorSignal<this>;

  @initial('#90EE90')
  @colorSignal()
  public declare readonly coverFill: ColorSignal<this>;

  public constructor(props: BoxCurtainProps) {
    super(props);
    this.add(
      <>
        <Line ref={makeRef(this, "header")} zIndex={6} lineWidth={this.headerWidth()} stroke={this.headerColor()} points={() => [
          [this.virtualRect().topLeft().x - 6, this.virtualRect().topLeft().y],
          [this.virtualRect().bottomLeft().x - this.headerDelta() - 6, this.virtualRect().bottomLeft().y],
        ]} lineCap={"round"} />
        <Rect ref={this.virtualRect} offset={1} position={() => [this.width() / 2, this.height() / 2]}>

        </Rect>
        <Spline zIndex={5} ref={makeRef(this, "cover")} smoothness={0} fill={this.coverFill()} points={() => [
          this.virtualRect().topLeft(),
          [this.virtualRect().bottomLeft().x - this.headerDelta(), this.virtualRect().bottomLeft().y],
          [this.virtualRect().bottomRight().x - this.headerDelta(), this.virtualRect().bottomRight().y],
          this.virtualRect().topRight(),
        ]} closed />
        {props.children}
      </>
    )
  }

  *revealContent(time: number) {
    yield* this.virtualRect().width(0, time / 2);
    yield* this.virtualRect().height(0, time / 2);
  }

  *coverContent(time: number) {
    yield* this.virtualRect().height(this.height(), time / 2);
    yield* this.virtualRect().width(this.width(), time / 2);
  }

  *blink(freq: number) {
    this.blinkTask = yield loop(() => this.header.opacity(0, freq / 2).back(freq / 2))
  }

  *canceBlinking() {
    cancel(this.blinkTask);
    this.header.opacity(1);
  }
}
