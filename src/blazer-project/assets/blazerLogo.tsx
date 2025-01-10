import { Line, Rect, RectProps } from "@motion-canvas/2d";
import { chain, makeRef, PossibleVector2 } from "@motion-canvas/core";

export class BlazerLogo extends Rect {

    public declare readonly logoBarLine: Line;
    public declare readonly logoChartLine: Line;

    constructor(props: RectProps) {
        super({
            ...props,
            layout: false,
            width: props.width || 150,
            height: props.height || 100
        });

        this.add(
            <>
                <Line
                    ref={makeRef(this, "logoBarLine")}
                    points={() => [
                        this.topLeft(),
                        this.bottomLeft(),
                        this.bottomRight()
                    ]}
                    stroke={'#fff'}
                    lineWidth={5}
                    end={0}
                />,
                <Line
                    ref={makeRef(this, "logoChartLine")}
                    points={() => [
                        this.bottomLeft().addX((this.width() / 100) * 5).addY((this.height() / 100) * -7),
                        this.bottomLeft().addX((this.width() / 100) * 5).addY((this.height() / 100) * -60),
                        this.bottomLeft().addX((this.width() / 100) * 40).addY((this.height() / 100) * -90),
                        this.bottomLeft().addX((this.width() / 100) * 55).addY((this.height() / 100) * -45),
                        this.bottomLeft().addX((this.width() / 100) * 70).addY((this.height() / 100) * -70),
                        this.bottomLeft().addX((this.width() / 100) * 95).addY((this.height() / 100) * -7),
                        this.bottomLeft().addX((this.width() / 100) * 3).addY((this.height() / 100) * -7),
                    ]}
                    stroke={'#fff'}
                    lineWidth={5}
                    fill={"#fff"}
                    end={0}

                />
            </>
        )

    }

    * show(time: number) {
        const half_time = time / 2;
        yield* chain(
            this.logoBarLine.end(1, half_time),
            this.logoChartLine.end(1, half_time)
        )
    }


    * hide(time: number) {
        const half_time = time / 2;
        yield* chain(
            this.logoBarLine.end(0, half_time),
            this.logoChartLine.end(0, half_time)
        )
    }
}