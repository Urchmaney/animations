import { Circle, makeScene2D, Txt } from "@motion-canvas/2d";


import { Layout, LayoutProps, Node, Rect } from '@motion-canvas/2d';
import {
    Reference,
    range,
    all,
    linear,
    loop,
    createRef,
    unwrap,
    Vector2,
    chain,
    waitFor,
    waitUntil,
} from '@motion-canvas/core';

const YELLOW = '#FFC66D';
const RED = '#FF6470';
const GREEN = '#99C47A';
const BLUE = '#68ABDF';

const Trail = (props: LayoutProps) => (
    <Layout layout direction={'column'} gap={30} offsetY={-1} {...props} />
);

export class MotionCanvasLogo extends Layout {
    private readonly star: Reference<Node>;
    private readonly trail1: Reference<Layout>;
    private readonly trail2: Reference<Layout>;
    private readonly trail3: Reference<Layout>;
    private readonly dot: Reference<Rect>;

    public constructor(props: LayoutProps) {
        super({
            ...props,
            size: () => (new Vector2(unwrap(props.scale)).x ?? 1) * 300,
        });
        this.star = createRef();
        this.trail1 = createRef();
        this.trail2 = createRef();
        this.trail3 = createRef();
        this.dot = createRef();

        this.add(
            <Layout layout={false}>
                <Node rotation={-45} position={44} scale={0.8} cache>
                    <Node cache y={-270}>
                        <Trail ref={this.trail1}>
                            {range(3).map(() => (
                                <Rect width={40} radius={20} height={120} fill={YELLOW} />
                            ))}
                        </Trail>
                        <Rect
                            width={40}
                            radius={20}
                            height={270}
                            fill={'white'}
                            offsetY={-1}
                            compositeOperation={'destination-in'}
                        />
                    </Node>
                    <Node cache x={-70} y={-200}>
                        <Trail ref={this.trail2}>
                            {range(3).map(() => (
                                <Rect width={40} height={120} radius={20} fill={RED} />
                            ))}
                        </Trail>
                        <Rect
                            width={40}
                            radius={20}
                            height={180}
                            fill={'white'}
                            offsetY={-1}
                            compositeOperation={'destination-in'}
                        />
                    </Node>
                    <Node cache x={70} y={-300}>
                        <Trail ref={this.trail3}>
                            {range(4).map(i => (
                                <Rect
                                    ref={i === 1 ? this.dot : undefined}
                                    width={40}
                                    radius={20}
                                    height={100}
                                    fill={i === 0 ? GREEN : BLUE}
                                    offsetY={1}
                                />
                            ))}
                        </Trail>
                        <Rect
                            width={40}
                            radius={20}
                            height={220}
                            fill={'white'}
                            offsetY={-1}
                            y={60}
                            compositeOperation={'destination-in'}
                        />
                    </Node>
                    <Node ref={this.star}>
                        {range(5).map(i => (
                            <Rect
                                width={100}
                                radius={50}
                                height={150}
                                fill={'white'}
                                offsetY={1}
                                rotation={(360 / 5) * i}
                                compositeOperation={'destination-out'}
                            />
                        ))}
                        {range(5).map(i => (
                            <Rect
                                width={40}
                                radius={20}
                                height={120}
                                fill={'white'}
                                offsetY={1}
                                rotation={(360 / 5) * i}
                            />
                        ))}
                    </Node>
                </Node>
            </Layout>,
        );
    }

    public animate() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias -- need this for generator functions to work
        const that = this;
        return loop(() =>
            all(
                chain(that.star().rotation(360, 4, linear), that.star().rotation(0, 0)),
                loop(4, function* () {
                    yield* that.trail1().position.y(-150, 1, linear);
                    that.trail1().position.y(0);
                }),
                loop(2, function* () {
                    yield* that.trail2().position.y(-150, 2, linear);
                    that.trail2().position.y(0);
                }),
                loop(2, function* () {
                    yield* all(
                        that.trail3().position.y(-130, 2, linear),
                        that.dot().fill(GREEN, 2, linear),
                    );
                    that.dot().fill(BLUE);
                    that.trail3().position.y(0);
                }),
            ),
        );
    }
}

export default makeScene2D(function* (view) {
    const mc = createRef<MotionCanvasLogo>();
    const rLayout = createRef<Layout>();
    const titleLayout = createRef<Rect>();

    yield* waitUntil("start");
    view.add(
        <Layout ref={rLayout} layout justifyContent={"space-between"} gap={190} direction={"column"} alignItems={"center"}>
            <MotionCanvasLogo ref={mc} />
            <Txt fontSize={80} fill={"#080f0f"} fontFamily={"'Platypi', serif"}>Motion Canvas</Txt>
        </Layout>

    )

    view.add(
        <Circle ref={titleLayout} direction={"column"} layout paddingLeft={200} fill={"#a52422"} width={() => view.width()} height={() => view.height() * 2} position={[2000, 0]} justifyContent={"center"} alignItems={"start"}>
            <Txt fontSize={100} fill={"white"}>Introduction</Txt>
        </Circle>
    )

    yield* waitFor(1);
    yield mc().animate();
    yield* all(rLayout().position.x(-400, 2), titleLayout().position.x(900, 2));
    yield* waitFor(1);

    titleLayout().add(
        <Rect layout alignItems={"center"} gap={20} paddingLeft={70} paddingTop={20}>
             <Circle fill={"#fff"} size={10} /> 
            <Txt fontSize={50} fill={"white"}>What is it?</Txt>
        </Rect>
    );


    yield* waitUntil("next"); 
})