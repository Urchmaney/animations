import { Bezier, Img, QuadBezier, Rect, Txt, is, makeScene2D } from "@motion-canvas/2d";
import codeOrck from "../../assets/images/orcks.png";
import { DEFAULT, Direction, SimpleSignal, Vector2, all, createRef, createSignal, makeRef, range, slideTransition, waitFor } from "@motion-canvas/core";

const studentPositions: [number, number][] = [
    [320, 130],
    [-470, -260],
    [354, -226],
    [-550, 250],
    [52, -96],
    [410, 350]
]

const curvePoints: [[number, number], [number, number], [number, number]][] = [
    [[420, 127], [878, -620], [-372, -324]],
    [[-374, -244], [-24, -306], [253, -246]],
    [[314, -130], [180, 135], [-450, 236]],
    [[-544, 143], [-260, 40], [-50, -54]],
    [[52, 9], [-28, 245], [309, 328]],
    [[512, 357], [600, 357], [650, 357]]
]

// const newCurvePoints: [[number, number], [number, number], [number, number]][] = [
//     [[]]
// ]

// export default makeScene2D(function* (view) {

//     const orcks = createRef<Img>();

//     const students: Rect[] = [];
//     const curves: QuadBezier[] = [];

//     view.add(
//         range(6).map(i => (
//             <Rect
//                 ref={makeRef(students, i)}
//                 height={200}
//                 width={200}
//                 fill={"#fff"}
//                 x={-500 + 225 * i}
//                 direction={"column"}
//                 justifyContent={"center"}
//                 alignItems={"center"}
//                 gap={20}
//             >
//                 <Txt text={`${i + 1}`} />
//             </Rect>
//         ))
//     )

//     view.add(
//         <Img ref={orcks} src={codeOrck} position={[890, 500]} />
//     )

//     yield* slideTransition(Direction.Right);

//     yield* waitFor(2);

//     yield* all(
//         ...students.map((student, i) => student.position.x(studentPositions[i][0], 2)),
//         ...students.map((student, i) => student.position.y(studentPositions[i][1], 2)),
//     )

//     yield* waitFor(2);

//     students.map((student, i) => student.add(
//         <Txt layout fontSize={30} text={`${(i + 2) > 6 ? 'none' : (i + 2)}`} offset={[0, 1]} position={[60, 90]} />
//     ))

//     yield* waitFor(2);

//     view.add(
//         range(6).map((i) => (
//             <QuadBezier
//                 lineWidth={5}
//                 endArrow
//                 stroke={'lightgreen'}
//                 p0={curvePoints[i][0]}
//                 p1={curvePoints[i][1]}
//                 p2={curvePoints[i][2]}
//                 ref={makeRef(curves, i)}
//                 end={0}
//             />
//         ))
//     )

//     for (let i = 0; i < curves.length; i++) {
//         yield* curves[i].end(2, 2);
//     }

//     // for(let i = curves.length - 1; i >= 0; i--) {
//     //     yield* curves[i].end(0, 1);
//     // }

//     yield* all(
//         ...students.map((student, i) => student.position.x(-700 + 300 * i, 2)),
//         ...students.map((student, i) => student.position.y(0, 2)),
//         ...curves.map((curve, i) => curve.p0.x((-700 + 300 * i) + 100, 2)),
//         ...curves.map((curve, i) => curve.p0.y(0, 2)),
//         ...curves.map((curve, i) => curve.p1.x((-700 + 300 * i) + 150, 2)),
//         ...curves.map((curve, i) => curve.p1.y(0, 2)),
//         ...curves.map((curve, i) => curve.p2.x((-700 + 300 * i) + 200, 2)),
//         ...curves.map((curve, i) => curve.p2.y(0, 2)),
//     );


//     yield* waitFor(2);

// })


export default makeScene2D(function* (view) {
    const orcks = createRef<Img>();
    const qText = createRef<Txt>();
    const students: Rect[] = [];
    const studentPosition: SimpleSignal<number[], void>[] = range(7).map((i) => createSignal([-700 + 270 * i, 0]));
    const curves: QuadBezier[] = [];

    view.add(
        <Img ref={orcks} src={codeOrck} position={[890, 500]} />
    )

    view.add(
        range(6).map(i => (
            <Rect
                ref={makeRef(students, i)}
                height={200}
                width={200}
                fill={"#fff"}
                x={() => studentPosition[i]()[0]}
                y={() => studentPosition[i]()[1]}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={20}
            >
                <Txt text={`${i + 1}`} />
            </Rect>
        ))
    );

    yield* slideTransition(Direction.Right);

    yield* waitFor(2);

    yield* all(
        ...studentPosition.map((position, i) => position(studentPositions[i], 2))
    );

    yield* waitFor(2);


    students.map((student, i) => student.add(
        <Txt layout fontSize={30} text={`${(i + 2) > 6 ? 'none' : (i + 2)}`} offset={[0, 1]} position={[60, 90]} />
    ));

    yield* waitFor(2);

    view.add(
        range(6).map((i) => (
            <QuadBezier
                lineWidth={5}
                endArrow
                stroke={'lightgreen'}
                p0={() => [studentPosition[i]()[0] + 100, studentPosition[i]()[1]]}
                p1={curvePoints[i][1]}
                p2={() => [studentPosition[i + 1]()[0] - 100, studentPosition[i + 1]()[1]]}
                ref={makeRef(curves, i)}
                end={0}
            />
        ))
    )

    for (let i = 0; i < curves.length; i++) {
        yield* curves[i].end(2, 2);
    }

    //  for(let i = curves.length - 1; i >= 0; i--) {
    //     yield* curves[i].end(0, 1);
    // }

    yield* all(
        ...studentPosition.map(position => position(DEFAULT, 2)),
        ...curves.map((curve, i) => curve.p1.x(-700 + 270 * i + 100 , 2)),
        ...curves.map((curve, i) => curve.p1.y(0, 2)),
    );

    yield* waitFor(2);

    yield* all(
        ...studentPosition.map(position => position([position()[0], position()[1] + 200], 2)),
        ...curves.map((curve, i) => curve.p1.y(200, 2)),
    );

    yield* waitFor(2);

    view.add(
        <Txt ref={qText} layout fontSize={50} offset={[0, 1]} position={[0, -254]} fill={"#fff"} />
    )

    yield* qText().text("What if we need to switch student 2 and 5 ?", 2).wait(2).back(2);

    yield* waitFor(2);

    const secondStudentPos = studentPosition[1];
    const fifthStudentPos = studentPosition[4];

    yield* all(
        secondStudentPos([secondStudentPos()[0], 0], 2),
        fifthStudentPos([fifthStudentPos()[0], 0], 2)
    )

    const secondStudent = students[1];
    const fifththStudent = students[4];
    
    yield* all(
        students[0].findLast<Txt>(is(Txt)).text("", 2),
        curves[0].end(0, 1)
    )

    yield* waitFor(2);

    yield* all(
        curves[1].end(0, 1),
        secondStudent.findLast<Txt>(is(Txt)).text("", 2)
    )

    yield* waitFor(2);




    yield* all(
        students[3].findLast<Txt>(is(Txt)).text("", 2),
        curves[3].end(0, 1)
    )

    yield* waitFor(2);
    const fifthSubscript = fifththStudent.findLast<Txt>(is(Txt));

    yield* all(
        curves[4].end(0, 1),
        fifthSubscript.text("", 2)
    )

    yield* waitFor(2);

    const forthPos = studentPosition[4]();
    const secondPos = studentPosition[1]();

    

    yield* all(
        studentPosition[1](forthPos, 2),
        studentPosition[4](secondPos, 2)
    );
    
    curves[0].p2(() => [studentPosition[4]()[0] - 100, studentPosition[4]()[1]])

    yield* waitFor(2);

    yield* all(
        students[0].findLast<Txt>(is(Txt)).text("5", 2),
        curves[0].end(1, 1)
    );

    yield* waitFor(2);

    curves[4].p2(() => [studentPosition[2]()[0] - 100, studentPosition[2]()[1]]);
    curves[4].p1([-700 + 270 * 1 + 100, 0]);

    yield* all(
        students[4].findLast<Txt>(is(Txt)).text("3", 2),
        curves[4].end(1, 1)
    );

    curves[3].p2(() => [studentPosition[1]()[0] - 100, studentPosition[1]()[1]])

    yield* waitFor(2);

    yield* all(
        students[3].findLast<Txt>(is(Txt)).text("2", 2),
        curves[3].end(1, 1)
    );


    curves[1].p2(() => [studentPosition[5]()[0] - 100, studentPosition[5]()[1]]);
    curves[1].p1([-700 + 270 * 4 + 100, 0]);

    yield* all(
        students[1].findLast<Txt>(is(Txt)).text("6", 2),
        curves[1].end(1, 1)
    );

    yield* waitFor(2);

    yield* all(
        secondStudentPos([secondStudentPos()[0], 200], 2),
        fifthStudentPos([fifthStudentPos()[0], 200], 2),
        curves[1].p1([curves[1].p1().x, 200], 2),
        curves[4].p1([curves[4].p1().x, 200], 2)
    )

    yield* all(
        ...studentPosition.map(position => position([position()[0], position()[1] - 200], 2)),
        ...curves.map((curve, i) => curve.p1.y(0, 2)),
    );

    yield* waitFor(2);
})