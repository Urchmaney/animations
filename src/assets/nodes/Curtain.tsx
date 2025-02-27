import { colorSignal, computed, Curve, CurveProfile, CurveProps, DesiredLength, initial, Layout, LayoutProps, Line, LineSegment, Rect, Segment, Shape, ShapeProps, signal, Spline, SplineProps } from "@motion-canvas/2d";
import { BBox, cancel, ColorSignal, createRef, loop, makeRef, PossibleColor, Reference, SerializedVector2, SignalValue, SimpleSignal, ThreadGenerator, Vector2 } from "@motion-canvas/core";


export interface CurtainProps extends Omit<LayoutProps, "layout"> {
  headerColor?: SignalValue<PossibleColor>
  headerWidth?: SignalValue<number>
  headerDelta?: SignalValue<number>
}

export class Curtain extends Rect {
  public declare readonly header: Line;
  public declare readonly cover: Spline;

  @initial(50)
  @signal()
  public declare readonly headerDelta: SimpleSignal<number, this>;

  @initial(10)
  @signal()
  public declare readonly headerWidth: SimpleSignal<number, this>;

  @initial('#FFF')
  @colorSignal()
  public declare readonly headerColor: ColorSignal<this>;

  private readonly virtualRect: Reference<Rect> = createRef<Rect>();

  private blinkTask: ThreadGenerator;
  // @initial('#90EE90')
  // @colorSignal()
  // public declare readonly fill: ColorSignal<this>;


  public constructor(props: CurtainProps) {
    super(props);
    this.add(
      <>
        <Line ref={makeRef(this, "header")} lineWidth={this.headerWidth()} stroke={this.headerColor()} points={() => [
          [this.virtualRect().topLeft().x - 10, this.virtualRect().topLeft().y],
          [this.virtualRect().bottomLeft().x - this.headerDelta() - 10, this.virtualRect().bottomLeft().y],
        ]} lineCap={"round"} />
        <Rect ref={this.virtualRect} offset={1} position={() => [this.width() / 2, this.height() / 2]}>

        </Rect>
        <Spline zIndex={5} ref={makeRef(this, "cover")} smoothness={0} fill={"rgb(38,182,168)"} points={() => [
          this.virtualRect().topLeft(),

          [this.virtualRect().bottomLeft().x - this.headerDelta(), this.virtualRect().bottomLeft().y],
          [this.virtualRect().bottomRight().x - this.headerDelta(), this.virtualRect().bottomRight().y],
          this.virtualRect().topRight(),

        ]} closed />
        {props.children}
      </>
    )
  }

  * revealContent(time: number) {
    yield* this.virtualRect().width(0, time / 2);
    yield* this.virtualRect().height(0, time / 2);
  }

  * coverContent(time: number) {
    yield* this.virtualRect().height(this.height(), time / 2);
    yield* this.virtualRect().width(this.width(), time / 2);
  }

  * blink(freq: number) {
    this.blinkTask = yield loop(() => this.header.opacity(0, freq / 2).back(freq / 2))
  }

  *canceBlinking() {
    cancel(this.blinkTask);
    this.header.opacity(1);
  }
}

function getCurtainProfile(rect: BBox, headerAdjustment: number): CurveProfile {
  const profile: CurveProfile = {
    arcLength: 0,
    segments: [],
    minSin: 1,
  }

  let from = new Vector2(rect.left, rect.bottom);
  let to = new Vector2(rect.left, rect.top);
  addSegment(profile, new LineSegment(from, to));

  from = new Vector2(rect.left, rect.top);
  to = new Vector2(rect.right + headerAdjustment, rect.top);
  addSegment(profile, new LineSegment(from, to));

  from = new Vector2(rect.right + headerAdjustment, rect.top);
  to = new Vector2(rect.right, rect.bottom);
  addSegment(profile, new LineSegment(from, to));

  from = new Vector2(rect.right, rect.bottom);
  to = new Vector2(rect.left, rect.bottom);
  addSegment(profile, new LineSegment(from, to));
  return profile;
}


function drawRightCurtain(context: Path2D, rect: BBox, headerAdjustment: number) {

  headerAdjustment = 0.2 * rect.width;
  context.moveTo(rect.left, rect.bottom);
  context.lineTo(rect.left, rect.top);
  context.lineTo(rect.right + headerAdjustment, rect.top);
  context.lineTo(rect.right, rect.bottom);
  context.lineTo(rect.left, rect.bottom);
}

function drawLeftCurtain(context: Path2D, rect: BBox, headerAdjustment: number) {
  console.log(rect.left, rect.right, rect.width)
  context.moveTo(rect.left, rect.bottom);
  context.lineTo(rect.left - headerAdjustment, rect.top);
  context.lineTo(rect.right, rect.top);
  context.lineTo(rect.right, rect.bottom);
  context.lineTo(rect.left, rect.bottom);
}

function addSegment(profile: CurveProfile, segment: Segment) {
  profile.segments.push(segment);
  profile.arcLength += segment.arcLength;
}
