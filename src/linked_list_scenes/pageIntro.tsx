import { Layout, Rect, View2D, makeScene2D, Txt, Img, fillRect } from "@motion-canvas/2d";
import { Window } from "../nodes/window";
import { Reference, all, createRef, loop, makeRef, range, waitFor, waitUntil } from "@motion-canvas/core";
import ruby from "../images/ruby.png";

const theme = {
    bg: '#24211d',
    bgDark: '#0f0d0c',
    bgDarker: '#050404',
    stroke: '#66615c',
    radius: 8,
    window: '#cc812b',
    event: '#cc2b2b',
    music: '#0880b4',
    component: '#45811b',
    buttons: '#0f0e0c',
  };

export default makeScene2D(function* (view: View2D) {
    const pageOneLoaders: Rect[] = [];
    const pageTwoLoaders: Rect[] = [];
    const pageOne = Page("pageOne", pageOneLoaders);
    const pageTwo = Page("PageTwo", pageTwoLoaders);
    const window = createRef<Window>();
    const container = createRef<Rect>();
    const nxtBtn = createRef<Rect>();
    const prvBtn = createRef<Rect>();

    view.add(
      <Window 
        theme={theme} 
        height={view.height() - 200} 
        width={view.width() - 300}
        wrap={"nowrap"}
        ref={window}
        direction={"row"}
      >
        <Rect
          layout
          direction={"column"}
          fill={"#fff"}
        >
          <Rect
            fill={"white"}            
            grow={2}
            ref={container}
          >
                
          </Rect>
          <Layout
            justifyContent={"space-evenly"} 
            alignItems={"center"}
            width={view.width() - 300}
            height={100} 
            grow={1}
            
          >
            <Rect height={50} width={200} fill={"gray"} layout alignItems={"center"} justifyContent={"center"} ref={prvBtn}>
              <Txt fontSize={30} fill={"white"}>Previous</Txt>
            </Rect>
            <Rect height={50} width={200} fill={"gray"} layout alignItems={"center"} justifyContent={"center"} ref={nxtBtn}>
              <Txt fontSize={30} fill={"white"}>Next</Txt>
            </Rect>
          </Layout>
        </Rect>
       
      </Window>
    )
    pageOne.width(view.width() - 300);
    pageOne.grow(1)
    pageTwo.width(view.width() - 300);
    pageTwo.grow(1)
    container().add(pageOne);
    container().add(pageTwo);
    

  
    // pageOneLoaders.map((rect) => {
    //    loop(() => rect.fill("aab8c2", 2)
    //   )}
    // )

    for(let i = 0; i < pageOneLoaders.length; i++) {
      yield loop(() => pageOneLoaders[i].fill("aab8c2", 1).back(1))
    }

    yield* waitUntil("next_and_previous");
    yield* all(
      nxtBtn().scale(1.1, 0.5).back(0.5).to(1.1, 0.5).back(0.5),
      prvBtn().scale(1.1, 0.5).back(0.5).to(1.1, 0.5).back(0.5),
    )
    yield* waitUntil("next_takes");


    yield* all(
      nxtBtn().fill("lightgray", 0.5).back(0.5),
      pageOne.width(0, 1)
    )
    
    yield* waitUntil("clicking_prev")

    yield* all(
      prvBtn().fill("lightgray", 0.5).back(0.5),
      pageOne.width(view.width() - 300, 1)
    )
  
    yield* waitFor(4);

})

function Page(id: string, loadersRef: Rect[]): Rect {
  const page = createRef<Rect>();

  <Rect
    ref={page} 
    direction={"column"} 
    grow={1}
    width={"100%"}
    height={"100%"}
    paddingTop={100}
    alignItems={"start"}
    paddingLeft={50}
    fill={"#fff"}
    layout>
      <Rect
         width={"100%"}
         height={"100%"}
         alignItems={"start"}
         direction={"column"} 
         layout
         gap={30}
      >
        <Rect
           width={"100%"}
           marginBottom={40}
           
        >
          <Txt
            fontSize={100}
          >{id}</Txt>
        </Rect>
       
        {
          range(6).map((x) => (<Rect width={`${10 + (Math.random() * 70)}%`} height={40} fill={"#d9e4e9"} ref={makeRef(loadersRef, x)} radius={10} />))
        }
      </Rect>
    </Rect>
  return page();
}


function Pager(id: string, fill: string = "000"): Rect {
    const page = createRef<Rect>();
    <Rect ref={page} fill={fill} layout>
        <Rect justifyContent={"space-between"} alignItems={"center"} width={'70%'} height={"100%"} direction={"column"} layout>
            <Rect>
                    <Txt fill="#fff">{id}</Txt>
                    <Rect layout grow={1} height={"90%"}  width={"100%"} alignItems={"center"}>
                    <Img src={ruby}/>
                </Rect>
                <Rect layout grow={0} height={"90%"} width={"0%"}  alignItems={"center"}>
                    <Img src={ruby}/>
                </Rect>
            </Rect>
            
            <Layout justifyContent={"space-between"} width={"100%"}>
                <Rect height={50} width={200} fill={"gray"} layout alignItems={"center"} justifyContent={"center"}>
                    <Txt fontSize={30} fill={"white"}>Previous</Txt>
                </Rect>
                <Rect height={50} width={200} fill={"gray"} layout alignItems={"center"} justifyContent={"center"}>
                    <Txt fontSize={30} fill={"white"}>Next</Txt>
                </Rect>
            </Layout>
            
        </Rect>
    </Rect>

    return page();
}

// function SitePage() {
//     return (
//         <Rect layout fill={"red"}>
            
//         </Rect>
//     )
// }