import { Circle, CubicBezier, Img, Layout, Line, makeScene2D, Polygon, Rect, signal } from "@motion-canvas/2d";
import { all, createRef, SignalValue, waitFor } from "@motion-canvas/core";
import normalBook from "../images/normal.jpg";
import neuralNetworkBook from "../images/neural.png";

export default makeScene2D(function* (view) {
    const bezier = createRef<CubicBezier>();
    const flipLine = createRef<Line>();
    const book = createRef<Line>();
    const rect = createRef<Rect>();
    const rectT = createRef<Rect>();

    const mainLayout = createRef<Layout>();
    const bookLayout = createRef<Layout>();
   
    // view.add(
    //     <CubicBezier
    //         ref={bezier}
    //         lineWidth={6}
    //         stroke={'lightseagreen'}
    //         p0={[-200, 0]}
    //         p1={[-50, 0]}
    //         p2={[100, 0]}
    //         p3={[200, 0]}
    //         />,
    // );


 
    view.add(
        <Rect layout ref={mainLayout} height={() => view.height()} direction={"column"} paddingTop={20}>
            <Layout ref={bookLayout}>
                <Img src={neuralNetworkBook} height={700} />
            </Layout>
        </Rect>
    )

    const startPos: [number, number] = [-500, 450]
    view.add(

        <Line
            ref={book}
            points={[
                [startPos[0], startPos[1] - 40],
                [startPos[0] + 10, startPos[1] - 20],
                [startPos[0] + 15, startPos[1] - 20],
                [startPos[0] + 200, startPos[1] - 20],
                [startPos[0] + 200, startPos[1] - 50],
                [startPos[0] + 15, startPos[1] - 50],
                [startPos[0], startPos[1] - 70],
                [startPos[0] - 10, startPos[1] - 50],
                [startPos[0] - 200, startPos[1] - 50],
                [startPos[0] - 200, startPos[1] - 20],
                [startPos[0] - 10, startPos[1] - 20],
                [startPos[0], startPos[1] - 40],
                // [startPos[0] + 10, startPos[1] - 70],
                // [startPos[0], startPos[1] - 50],
                // [startPos[0] - 200, startPos[1] - 20],
                // [startPos[0] - 15, startPos[1] -20],
                // [startPos[0] - 10, startPos[1]],
                // startPos
            ]}
            fill={"#f5a425"}
            stroke={'#fff'}
            lineWidth={5}
        />
    )

    view.add(
        <Rect ref={rectT} width={200} height={5} fill={"#f5a425"} offsetX={-1} position={[startPos[0] , startPos[1] - 60]} />

   )
    

    // const startPosition = signal();
    const startPosition: [number, number] = [0, 450];

    view.add(

        <Line
            ref={book}
            points={[
                startPosition,
                [startPosition[0] + 10, startPosition[1]],
                [startPosition[0] + 15, startPosition[1] - 20],
                [startPosition[0] + 200, startPosition[1] - 20],
                [startPosition[0] + 200, startPosition[1] - 50],
                [startPosition[0] - 200, startPosition[1] - 50],
                [startPosition[0] - 200, startPosition[1] - 20],
                [startPosition[0] - 15, startPosition[1] -20],
                [startPosition[0] - 10, startPosition[1]],
               startPosition
            ]}
            fill={"#f5a425"}
            stroke={'#fff'}
            lineWidth={5}
        />
    )

    // view.add(
    //     // <CubicBezier
    //     //     ref={bezier}
    //     //     lineWidth={6}
    //     //     stroke={'lightseagreen'}
    //     //     p0={[startPosition[0], startPosition[1] - 10]}
    //     //     p1={[startPosition[0] + 50, startPosition[1] - 10]}
    //     //     p2={[startPosition[0] + 80, startPosition[1] - 10]}
    //     //     p3={[startPosition[0] + 100 , startPosition[1] - 10]}
    //     //     offsetX={-1}
        
    //     //     />,
    //     <Line
    //         ref={flipLine}
    //         points={[
    //             [startPosition[0], startPosition[1] - 10],
    //             [startPosition[0] + 100 , startPosition[1] - 10]
    //         ]}
    //         stroke={'#fff'}
    //         lineWidth={5}
    //         offsetX={-1}
    //     />
    // );

    // view.add(
    //      <CubicBezier
    //         ref={bezier}
    //         lineWidth={6}
    //         stroke={'lightseagreen'}
    //         p0={[startPosition[0], startPosition[1] - 10]}
    //         p1={[startPosition[0] + 50, startPosition[1] - 10]}
    //         p2={[startPosition[0] + 80, startPosition[1] - 10]}
    //         p3={[startPosition[0] + 80 , startPosition[1] - 10]}
    //         offsetX={-1}
    //         bottom={book().position}
        
    //         />,
    // )



    view.add(
         <Rect ref={rect} width={200} height={5} fill={"#f5a425"} offsetX={-1} position={[startPosition[0] + 10, startPosition[1] - 60]} />

    )

    // yield* all(
    //     flipLine().points([
    //     [startPosition[0], startPosition[1] - 10],
    //     [startPosition[0] - 150, startPosition[1] - 10]
    //     ], 2),
    //     flipLine().offset([-1, -1], 1)
    // )

  

    yield* all(
        // flipLine().rotation(-180, 2),
        rect().rotation(-180, 2),
        rectT().rotation(-180, 2),
        // flipLine().points([[startPosition[0], startPosition[1] - 10], [startPosition[0], startPosition[1] - 100]], 2)
    )

  
});
