import { Camera, Circle, Rect, RectProps, Node, signal, initial } from "@motion-canvas/2d";
import { all, createRef, Reference, SimpleSignal } from "@motion-canvas/core";

interface MagnifierProps extends RectProps { }

export class Magnifier extends Rect {
  private readonly camera: Reference<Camera> = createRef<Camera>();
  private readonly lens: Reference<Camera> = createRef<Camera>();
  private readonly lensClip: Reference<Circle> = createRef<Circle>();

  @initial(600)
  @signal()
  public declare readonly magnifySize: SimpleSignal<number, this>;

  constructor({ children, ...props }: MagnifierProps) {
    super(props);
    const scene = (
      <Node>
        {children}
      </Node>
    )

    this.add(
      <>
        <Camera.Stage
          cameraRef={this.camera}
          scene={scene}
          size={this.size()}
          position={[0, 0]}
        />

        <Circle
          ref={this.lensClip}
          clip
          layout
          shadowColor={"#cdd6f4"}
          shadowBlur={40}
          size={() => this.magnifySize()}
          opacity={0}
        >
          <Camera.Stage
            cameraRef={this.lens}
            scene={scene}
            size={"100%"}
            position={[0, 0]}
          />
        </Circle>

      </>
    )
  }

  * magnifyNode(node: Node, duration: number) {
    this.lens().zoom(2);
    yield* all(
      this.lensClip().opacity(1, duration / 4),
      this.lensClip().position(
        node.absolutePosition().transformAsPoint(this.camera().scene().worldToLocal()),
        duration
      ),
      this.lens().centerOn(node, duration),
    )
  }

  * reset(duration: number) {
    yield* all(
      this.lensClip().opacity(0, duration),
      this.lens().zoom(1, duration)
    )
  }
}