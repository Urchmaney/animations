import { is, Layout, makeScene2D, Rect, Txt, View2D } from "@motion-canvas/2d";
import { all, chain, createRef, DEFAULT, delay, Reference, waitFor, waitUntil } from "@motion-canvas/core";
import colorPallete from "../colors";


function *trueMatchMovement(input: Rect, container: Rect) {
    yield* all(
        input.position.y(container.y() - 120, 1), 
        delay(.5, 
            all(
                container.fill("lightgreen", .5).back(.1),
                container.scale(container.scale().add(.2), .3).back(.1),
                container.ripple(.3)
            )
        )
    )

    container.fill("#000")
}


function *falseMatchMovement(input: Rect, container: Rect) {
    const failedColor = "#ff474c"
    yield* all(
        input.position.y(container.y() - 120, 1), 
        delay(.5, 
            all(
                container.fill(failedColor, .5).back(.1),
            )
        )
    )

    container.fill("#000")
   
}

function addInputBox(view: View2D, ref: Reference<Rect>, t: string, position: [number, number]) {

    let fontSize = 90
    if (t.length >= 4) {
        fontSize = Math.floor(270 / Math.min(5, t.length))
    }
    view.add(
        <Rect radius={40} zIndex={-1} fill={colorPallete["dark_cyan"]["DEFAULT"]} size={200} ref={ref} position={position}>
            <Txt fontSize={fontSize}>{t}</Txt>
        </Rect>
    );
}

export default makeScene2D(function* (view) {
    const r = createRef<Rect>();
    const rec = createRef<Rect>();
    const patternsLayout = createRef<Layout>();
    const abc = createRef<Txt>();

    const failedColor = "#ff474c"
    const patterns: { pattern: string, ref: Reference<Rect> }[] = [
        { pattern: ".", ref: createRef<Rect>() },
        { pattern: "a-z", ref: createRef<Rect>() },
        { pattern: "*", ref: createRef<Rect>() }
    ]
    const SIZE_RECT = 250;
    view.add(
        <>
            <Layout ref={patternsLayout} layout gap={150}>
                {
                    patterns.map(x => (
                        <Rect ref={x.ref} radius={20} fill={"#000"} layout justifyContent={"center"} alignItems={"center"} size={SIZE_RECT} opacity={.3}>
                            <Txt textAlign={"center"} fontSize={100} fill={"#fff"}>{x.pattern}</Txt>
                        </Rect>
                    ))
                }
            </Layout>
        </>
    )
    yield* waitUntil("show pattern");
    yield* all(patterns[0].ref().opacity(1, .5).back(.5), patterns[0].ref().scale(1.5, .5).back(.5));
    yield* all(patterns[1].ref().opacity(1, .5).back(.5), patterns[1].ref().scale(1.5, .5).back(.5));
    yield* all(patterns[2].ref().opacity(1, .5).back(.5), patterns[2].ref().scale(1.5, .5).back(.5));
    yield* waitFor(1);
    yield* all(...patterns.map(x => x.ref().opacity(1, 1)), patternsLayout().position.y(-200, 1));
    yield* waitUntil("explaining");

    yield* all(patterns[0].ref().opacity(1, .5), patterns[0].ref().scale(1.5, .5), ...patterns.slice(1).map(x => x.ref().opacity(.4, .5)));
    yield* waitUntil("alphabet");

    for (let i = 0; i < 3; i++) {
        const charr = createRef<Rect>()
        view.add(
            <Rect radius={40} zIndex={-1} fill={colorPallete["dark_cyan"]["DEFAULT"]} size={200} ref={charr} x={patterns[0].ref().x()} y={patterns[0].ref().y() + 400}>
                <Txt fontSize={90}>{String.fromCharCode(97 + i)}</Txt>
            </Rect>
        );


        yield* trueMatchMovement(charr(), patterns[0].ref())
        charr().remove()
    }

    yield* waitUntil("going");
    yield* all(
        patterns[0].ref().opacity(.4, .5), patterns[0].ref().scale(1, .5), patterns[1].ref().scale(1.5, .5), patterns[1].ref().opacity(1, .5)
    )


    for (let i = 0; i < 4; i++) {
        let c = "a"
        if (i < 2) {
            c = String.fromCharCode(Math.floor(Math.random() * ((97 + 24) - 97 + 1) + 97));
        }
        if (i == 3) {
            c = "b"
        }

        let charr = createRef<Rect>()
        view.add(
            <Rect radius={40} zIndex={-1} fill={colorPallete["dark_cyan"]["DEFAULT"]} size={200} ref={charr} x={patterns[1].ref().x()} y={patterns[1].ref().y() + 400}>
                <Txt fontSize={90}>{c}</Txt>
            </Rect>
        );
        let t = patterns[1].ref().findFirst(is(Txt));
        yield* t.text(c, .5);
        yield* trueMatchMovement(charr(), patterns[1].ref())
        charr().remove();

        charr = createRef<Rect>();
        addInputBox(view, charr, String.fromCharCode(c.charCodeAt(0) + 2), [patterns[1].ref().x(), patterns[1].ref().y() + 400])
        // view.add(
        //     <Rect radius={40} zIndex={-1} fill={colorPallete["dark_cyan"]["DEFAULT"]} size={200} ref={charr} x={patterns[1].ref().x()} y={patterns[1].ref().y() + 400}>
        //         <Txt fontSize={90}>{String.fromCharCode(c.charCodeAt(0) + 2)}</Txt>
        //     </Rect>
        // );

        yield* falseMatchMovement(charr(), patterns[1].ref())
        charr().remove();
    }



    yield* waitUntil("lastly");

    yield* all(
        patterns[1].ref().opacity(.4, .5), patterns[1].ref().scale(1, .5), patterns[2].ref().scale(1.5, .5), patterns[2].ref().opacity(1, .5)
    )

    let patternTxt = patterns[2].ref().findFirst(is(Txt));
    yield* chain(waitFor(1), patternTxt.text(".*", 2).to("d*", 1))
    yield* waitUntil("p");
    const p = "p";
    yield* patternTxt.text("p*", 2);

    yield* waitUntil("empty-string")

    for (let i = 0; i < 3; i++) {
        const charr = createRef<Rect>()
        view.add(
            <Rect radius={40} zIndex={-1} fill={colorPallete.dark_cyan.DEFAULT} size={200} ref={charr} x={patterns[2].ref().x()} y={patterns[1].ref().y() + 400}>
                <Txt fontSize={90}>{`${p.repeat(i)}`}</Txt>
            </Rect>
        );

        yield* trueMatchMovement(charr(), patterns[2].ref())
        // yield* all(charr().position.y(patterns[2].ref().y() - 120, 1), patterns[2].ref().fill("lightgreen", 1).back(.1))
        charr().remove();
        if (i < 2) {
            yield* waitUntil(`start-${p.repeat(i + 1)}`)
        }
    }

    yield* waitUntil("wrong-p");

    for (let i = 0; i < 3; i++) {
        const charr = createRef<Rect>()
        view.add(
            <Rect radius={40} zIndex={-1} fill={colorPallete.dark_cyan.DEFAULT} size={200} ref={charr} x={patterns[2].ref().x()} y={patterns[1].ref().y() + 400}>
                <Txt fontSize={90}>{`${p.repeat(i)}f`}</Txt>
            </Rect>
        );
        yield* falseMatchMovement(charr(), patterns[2].ref());
        charr().remove();

    }


    yield* waitFor(5);

    yield* patternTxt.text(".*", 1);
    yield* waitFor(5);

    const inputs = ["abcd", "kjdjsjd", "qwerty"]

    yield* waitUntil("abc");
    for (let i = 0; i < inputs.length; i++) {
        const charr = createRef<Rect>()
        addInputBox(view, charr, inputs[i], [patterns[2].ref().x(), patterns[1].ref().y() + 400])
        yield* trueMatchMovement(charr(), patterns[2].ref());
        charr().remove();
        if (i < inputs.length - 1) {
            yield* waitUntil(`combination-${i}`)
        }
       
    }

    yield* all(patterns[2].ref().opacity(0.4, 1), patterns[2].ref().scale(1, 1))
    yield* all(patternsLayout().position.y(0, 1))
    yield* waitFor(.5);
});
