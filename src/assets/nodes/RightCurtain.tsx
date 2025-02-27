import { colorSignal, computed, Curve, CurveProfile, CurveProps, DesiredLength, initial, Layout, LayoutProps, Line, LineSegment, Segment, Shape, ShapeProps, signal, Spline, SplineProps } from "@motion-canvas/2d";
import { all, BBox, ColorSignal, makeRef, PossibleColor, Reference, SerializedVector2, SignalValue, SimpleSignal, Vector2 } from "@motion-canvas/core";


export interface RightCurtainProps extends CurveProps {
  headerColor?: SignalValue<PossibleColor>
  headerWidth?: SignalValue<number>
  headerDelta?: SignalValue<number>
}

export class RightCurtain extends Curve {
  
  protected override childrenBBox(): BBox {
    return BBox.fromSizeCentered(this.computedSize());
  }

  @computed()
  public profile(): CurveProfile {
    // throw new Error("Method not implemented.");
    return getCurtainProfile(this.childrenBBox(), 20);
      //  return getRectProfile(
      //   this.childrenBBox(),
      //   this.radius(),
      //   this.smoothCorners(),
      //   this.cornerSharpness(),
      // );
  }

  protected override getPath(): Path2D {
    if (this.requiresProfile()) {
      return this.curveDrawingInfo().path;
    }

    const path = new Path2D();
    // const radius = this.radius();
    // const smoothCorners = this.smoothCorners();
    // const cornerSharpness = this.cornerSharpness();
    const box = BBox.fromSizeCentered(this.size().addX(-40));
    console.log(box)
    drawLeftCurtain(path, box, 40);
  
    return path;
  }


  protected override desiredSize(): SerializedVector2<DesiredLength> {
    return {
      x: this.width.context.getter(),
      y: this.height.context.getter(),
    };
  }

  protected override offsetComputedLayout(box: BBox): BBox {
    return box;
  }


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

  // @initial('#90EE90')
  // @colorSignal()
  // public declare readonly fill: ColorSignal<this>;


  public constructor(props: RightCurtainProps) {
    super(props);
    // this.add(
    //   <>
    //     <Line ref={makeRef(this, "header")} lineWidth={this.headerWidth()} stroke={this.headerColor()} points={() => [
    //       this.topRight,
    //       [this.bottomRight().x - this.headerDelta(), this.bottomRight().y]
    //     ]} lineCap={"round"} />
    //     <Spline ref={makeRef(this, "cover")} smoothness={0} fill={this.fill()} points={() => [
    //       this.bottomLeft,
    //       this.topLeft,
    //       this.topRight,
    //       [this.bottomRight().x - this.headerDelta(), this.bottomRight().y]
    //     ]} closed />
    //     {props.children}
    //   </>
    // )
  }

  * coverCurtain() {

  }

  * openCurtain() {
    // yield* all(
    //   this.header.endOffset(this.header.baseArcLength() / 2, 1),
    //   this.header.startOffset(this.header.baseArcLength() / 2 + 10, 1),
    // );

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


function drawRightCurtain(context: Path2D, rect: BBox, headerAdjustment: number){
 
  headerAdjustment = 0.2 * rect.width;
  context.moveTo(rect.left, rect.bottom);
  context.lineTo(rect.left, rect.top);
  context.lineTo(rect.right + headerAdjustment, rect.top);
  context.lineTo(rect.right, rect.bottom);
  context.lineTo(rect.left, rect.bottom);
}

function drawLeftCurtain(context: Path2D, rect: BBox, headerAdjustment: number){
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
