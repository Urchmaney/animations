import { Img, JSX, Layout, Rect, RectProps, Txt, is } from "@motion-canvas/2d";
import dropDownImg from "../../assets/images/dropDown.svg";
import rubyImg from "../../assets/images/ruby.png";
import rightArrowImg from "../../assets/images/arrowRight.svg";
import { ThreadGenerator, all, createRef, makeRef, range, waitFor } from "@motion-canvas/core";

type FolderTree = {
  name: string,
  children?: FolderTree[],
  isFile?: boolean,
}

export interface VSCodeProps extends RectProps {
  sideBarTree: FolderTree,
}

export class VSCode extends Rect {
  private sidebarLayoutsRefs: { [key: string]: Rect } = {};
  public readonly terminal: Layout;
  public readonly activeTerminalLine: Layout;

  public constructor({ sideBarTree, children, ...props }: VSCodeProps) {
    super({
      layout: true,
      ...props,
      fill: "#2b2b2b",
      padding: 0,
      gap: 3
    });

    this.add(
      <>
        <Rect
          width={"20%"}
          fill={"#181818"}
          height={"100%"}
          paddingLeft={10}
          paddingTop={10}
          direction={"column"}
        >
          
          <VSCodeSideBar sidebarTree={sideBarTree} key="" refs={this.sidebarLayoutsRefs} />
        </Rect>
        <Rect
          width={"80%"}
          layout
          direction={"column"}
          height={"100%"}
          fill={"black"}
        >
          <Rect
            fill={"#1f1f1f"}
            width={"100%"}
            height={"70%"}
          >
            {children}
          </Rect>
          <Rect fill={"#181818"} height={"30%"} layout direction={"column"}>
            <Layout padding={10} gap={25} height={"15%"}>
              <Rect>
                <Txt fontSize={20} fill={"white"}>PROBLEMS</Txt>
              </Rect>
              <Rect>
                <Txt fontSize={20} fill={"white"}>DEBUG CONSOLE</Txt>
              </Rect>
              <Rect layout fill={"lightblue"}>
                <Rect width={"102%"} height={"95%"} fill={"#181818"}>
                  <Txt fontSize={20} fill={"white"}>TERMINAL</Txt>
                </Rect>
              </Rect>
              <Rect>
                <Txt fontSize={20} fill={"white"}>PORTS</Txt>
              </Rect>
            </Layout>
            <Layout height={"85%"} padding={10} paddingTop={10} ref={makeRef(this, 'terminal')} direction={"column"}>

              <Layout gap={10} ref={makeRef(this, "activeTerminalLine")}>
                <Txt fill={"white"} fontSize={18} text="C:\Users\Lenovo\Documents\test\ramen>   " />
                <Txt fill={"yellow"} fontSize={18} text="" />
              </Layout>
              {
                range(6).map(() => (
                  <Layout>
                    <Txt fill={"white"} fontSize={18} text="" />
                  </Layout>
                ))
              }

            </Layout>
          </Rect>
        </Rect>
      </>
    )
  }

  * writeToTerminal(content: string, time: number): ThreadGenerator {
    const layout = this.terminal.findFirst<Layout>(is(Layout));
    const txt = layout.findLast(is(Txt));
    yield* txt.text(`${txt.text()}${content}`, time);
  }

  * submitToTerminal(content: string, time: number): ThreadGenerator {
    yield* this.writeToTerminal(content, time);
    const txts = this.terminal.findAll(is(Txt));
    yield* all(
      ...txts.slice(2).map(tx => tx.text(".", time / 2))
    )
  
    yield* waitFor(1);
    yield* all(
      ...txts.slice(1).map(tx => tx.text("", time / 2))
    )
  }

  * addFileTo(folder: string, fileName: string, time: number): ThreadGenerator {
    if (folder[0] !== "/") folder = `/${folder}`;
    const folderRect = this.sidebarLayoutsRefs[folder];
    folderRect.add(
      <VSCodeSideBar sidebarTree={{ name: fileName, isFile: true }} key={folder} refs={this.sidebarLayoutsRefs} />
    )
    yield* this.sidebarLayoutsRefs[`${folder}/${fileName}`].findFirst<Rect>(is(Rect)).fill("lightgreen", time).back(time)
  }

  * highlightTree(id: string, time: number): ThreadGenerator {
    if (id[0] !== "/") id = `/${id}`;

    yield* this.sidebarLayoutsRefs[id].findFirst<Rect>(is(Rect)).fill("lightgray", time).back(time);
  }
}

interface VSCodeSideBarProp {
  sidebarTree: FolderTree
  key: string
  refs: { [key: string]: Layout }
}

function VSCodeSideBar({sidebarTree, key, refs }: VSCodeSideBarProp): JSX.Element {
  const currentKey = `${key}/${sidebarTree.name}`;
  return (
    <Rect ref={makeRef(refs, currentKey)} layout direction={"column"} paddingLeft={20}>
      <Rect layout gap={10} paddingTop={10} paddingBottom={10}>
        {!sidebarTree.isFile && sidebarTree.children?.length && <Img src={dropDownImg} size={14} />}
        {!sidebarTree.isFile && !sidebarTree.children?.length && <Img src={rightArrowImg} size={14} />} 
        <Layout gap={5}>
          {sidebarTree.isFile && <Img src={rubyImg} size={14} />}
          <Txt fontSize={14} fill={"white"}>{sidebarTree.name}</Txt>
        </Layout>
      </Rect>
      {
        sidebarTree.children?.length &&
        <>
          {
            sidebarTree.children.map(t => <VSCodeSideBar sidebarTree={t} key={currentKey} refs={refs} />)
          }
        </>
      }
    </Rect>
  )
}
