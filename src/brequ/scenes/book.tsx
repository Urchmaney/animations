import { Img, Layout, makeScene2D, Rect, Txt, Video } from "@motion-canvas/2d";
import { createRef, waitFor, waitUntil } from "@motion-canvas/core";
import fallingBook from "../videos/plain_book.mp4"
import openningBook from "../videos/openning_book.mp4";
import library from "../images/library.jpg";
import destination from "../images/destination.jpg";
import frustrated from "../images/frustrated.jpg";
import brequ from "../images/brequ.png";
import brequSingle from "../images/brequ-image.png";


export default makeScene2D(function* (view) {
    // const fallingBookVid = createRef<Video>();
    const openningBookVid = createRef<Video>();
    const libraryImg = createRef<Img>();
    const destinationImg = createRef<Img>();
    const frustratedImg = createRef<Img>();
    const brequImg = createRef<Img>();
    const brequSingleImg = createRef<Img>();
    view.add(
        <Rect fill={"red"} size={view.size()}>
            <Img src={library} ref={libraryImg}  height={() =>view.height()} width={() => view.width()} />
           
            {/* <Video height={() =>view.height()} width={() => view.width()} src={fallingBook} ref={fallingBookVid} /> */}
        </Rect>
    );

    view.add(
        <Rect opacity={0.7} zIndex={2} height={() =>view.height()} width={() => view.width()} fill={"#000"} />
    );

    view.add(
        <Txt fill={"#fff"} zIndex={3} fontFamily={"Lilita One"} fontSize={120}>
            We Read
        </Txt>
    )

    // fallingBookVid().play();

    // yield* fallingBookVid().scale(0.5, 1).back(1)

    yield* libraryImg().scale(1.5, 3).back(1);

    


    yield* waitFor(1);

    // view.add(
    //     <Img src={destination} ref={destinationImg}  height={() =>view.height()} width={() => view.width()} />
    // )

    // yield* destinationImg().scale(1.5, 3);

    // yield* waitUntil("books_can");

    // view.add(
    //     <Video height={() =>view.height()} width={() => view.width()} src={openningBook} ref={openningBookVid} /> 
    // )

    // openningBookVid().play();

    // yield* waitFor(3);

    // view.add(
    //     <Img height={() =>view.height()} width={() => view.width()} src={frustrated} ref={frustratedImg} /> 
    // )

    // yield* waitUntil("hey");

    // view.add(
    //     <Rect height={() =>view.height()} width={() => view.width()} fill={"#fff"}>
    //         <Layout>

    //             <Img height={200} width={400} src={brequ} ref={brequImg} />

    //         </Layout>
            
    //     </Rect>
    // )

    // yield* brequImg().scale(1.5, 1).back(1)

    // yield* waitFor(4)
});