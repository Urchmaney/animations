import { colorSignal, initial, Layout, LayoutProps, Length, Rect, signal, Spline } from "@motion-canvas/2d";
import { all, ColorSignal, makeRef, PossibleColor, SignalValue, SimpleSignal } from "@motion-canvas/core";

interface HourGlassProp extends Omit<LayoutProps, "layout" | "width" | "height"> {
  stroke?: SignalValue<PossibleColor>
  fill?: SignalValue<PossibleColor>
  baseWidth?: SignalValue<number>
  width: SignalValue<Length>
  height: SignalValue<Length>
}

export class HourGlass extends Layout {


  @initial('#000')
  @colorSignal()
  public declare readonly stroke: ColorSignal<this>;


  @initial('#FFF')
  @colorSignal()
  public declare readonly fill: ColorSignal<this>;

  @initial(100)
  @signal()
  public declare readonly baseWidth: SimpleSignal<number, this>;


  public declare readonly lowerBase: Rect;
  public declare readonly topBase: Rect;
  public declare readonly leftStand: Spline;
  public declare readonly rightStand: Spline;
  public declare readonly topSand: Spline;
  public declare readonly lowerSand: Spline;

  private get minWidthAdjustment() {
    return this.width() / 16
  }

  private get midWidthAdjustment() {
    return this.width() / 20
  }

  private get maxWidthAdjustment() {
    return this.width() / 2.5
  }

  private get baseAdjustment() {
    return this.baseWidth() / 5
  }

  private get midHeightAdjustment() {
    return this.height() / 8
  }

  private readonly percentRange: number[] = [0.05, .1, .2, .3, .4, .5];
  private readonly lowerLeftPercentageRange: number[] = [.55, .6, .7, .8, .95];
  private readonly lowerRightPercentageRange = [.95, .8, .7, .6, .55];

  constructor(props: HourGlassProp) {
    super({
      ...props,
      justifyContent: "space-between",
      direction: "column",
      gap: 500,
    });

    this.add(
      <>
        {/* Top bar of the hour glass */}
        <Rect ref={makeRef(this, "topBase")} fill={this.stroke()} width={this.width()} height={this.baseWidth()} y={() => (this.height() / -2) + (this.baseWidth() / 2)} />

        {/* Left curly stand */}
        <Spline ref={makeRef(this, "leftStand")} stroke={this.stroke()} lineWidth={() => this.width() / 15} smoothness={0.4} points={() => [
          [this.topBase.bottomLeft().x + this.minWidthAdjustment, this.topBase.bottomLeft().y - this.baseAdjustment],
          [this.topBase.bottomLeft().x + this.midWidthAdjustment, this.topBase.bottomLeft().y + this.midHeightAdjustment],
          [this.topBase.bottomLeft().x + this.maxWidthAdjustment, (this.topBase.bottomLeft().y + this.lowerBase.topLeft().y) / 2],
          [this.topBase.bottomLeft().x + this.midWidthAdjustment, this.lowerBase.topLeft().y - this.midHeightAdjustment],
          [this.lowerBase.topLeft().x + this.minWidthAdjustment, this.lowerBase.topLeft().y + this.baseAdjustment]
        ]} />

        {/* Right curly stand */}
        <Spline ref={makeRef(this, "rightStand")} stroke={this.stroke()} lineWidth={() => this.width() / 15} smoothness={0.4} points={() => [
          [this.topBase.bottomRight().x - this.minWidthAdjustment, this.topBase.bottomRight().y - this.baseAdjustment],
          [this.topBase.bottomRight().x - this.midWidthAdjustment, this.topBase.bottomRight().y + this.midHeightAdjustment],
          [this.topBase.bottomRight().x - this.maxWidthAdjustment, (this.topBase.bottomRight().y + this.lowerBase.topRight().y) / 2],
          [this.topBase.bottomRight().x - this.midWidthAdjustment, this.lowerBase.topRight().y - this.midHeightAdjustment],
          [this.lowerBase.topRight().x - this.minWidthAdjustment, this.lowerBase.topRight().y + this.baseAdjustment]
        ]} />

        {/* Top Sand */}
        <Spline ref={makeRef(this, "topSand")} stroke={this.fill()} lineWidth={10} smoothness={0.4} points={() => [
          ...(this.percentRange.map((p) => [this.leftStand.getPointAtPercentage(p).position.x + 13, this.leftStand.getPointAtPercentage(p).position.y] as [number, number])),
          ...(this.percentRange.reverse().map((p) => [this.rightStand.getPointAtPercentage(p).position.x - 13, this.leftStand.getPointAtPercentage(p).position.y] as [number, number]))
        ]} zIndex={3} fill={this.fill()} />

        {/* Bottom Sand */}
        <Spline ref={makeRef(this, "lowerSand")} stroke={this.fill()} lineWidth={10} smoothness={0.4} points={() => [
          ...(this.lowerLeftPercentageRange.map((p) => [this.leftStand.getPointAtPercentage(p).position.x + 13, this.leftStand.getPointAtPercentage(p).position.y] as [number, number])),
          ...(this.lowerRightPercentageRange.map((p) => [this.rightStand.getPointAtPercentage(p).position.x - 13, this.leftStand.getPointAtPercentage(p).position.y] as [number, number]))
        ]} zIndex={3} fill={this.fill()} />


        {/* Low bar of the hour glass */}
        <Rect ref={makeRef(this, "lowerBase")} fill={this.stroke()} width={this.width()} height={this.baseWidth()} y={() => (this.height() / 2) - (this.baseWidth() / 2)} />
      </>
    )
  }

  *start(time: number) {
    const lowerSandArcLength = this.lowerSand.arcLength();
    this.lowerSand.startOffset(lowerSandArcLength / 2);
    this.lowerSand.endOffset(lowerSandArcLength / 2);
    let adjustEnd: boolean = false;
    let offset = 0;
    let increase = this.lowerSand.baseArcLength() / 2;

    const lowerCount = increase / 20;
    const upperCount = (this.topSand.baseArcLength() / (20 * 2))

    const count = 20;
    for (let i = 0; i < count ; i++) {
      if (!adjustEnd) {
        yield* all(this.topSand.startOffset(offset, time / count), this.lowerSand.startOffset(increase, time/count));
      } else {
        yield* all(this.topSand.endOffset(offset, time / count), this.lowerSand.endOffset(increase, time / count));
      }
      adjustEnd = !adjustEnd;
      increase -= lowerCount;
      offset += upperCount;
    }
  }
}