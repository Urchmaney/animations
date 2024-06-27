import { Img, Layout, Rect, RectProps, Txt, is } from "@motion-canvas/2d";
import dropDownImg from "../../assets/images/dropDown.svg";
import rubyImg from "../../assets/images/ruby.png";
import rightArrowImg from "../../assets/images/arrowRight.svg";
import { ThreadGenerator, createRef, makeRef, waitFor } from "@motion-canvas/core";

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
          {
            VSCodeSideBar(sideBarTree, 0, "", this.sidebarLayoutsRefs)
          }
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
          <Rect fill={"#181818"} height={"30%"}>
            <Layout>

            </Layout>
          </Rect>
        </Rect>
      </>
    )
  }

  * highlightTree(id: string, time: number) : ThreadGenerator{
    if (id[0] !== "/") {
      id = `/${id}`
    }

    yield* this.sidebarLayoutsRefs[id].fill("red", time).back(time);
  }
}

function VSCodeSideBar(sidebarTree: FolderTree, startPadding: number, key: string, refs: { [key: string]: Layout }) {
  const currentKey = `${key}/${sidebarTree.name}`;
  return (
    <>
      <Rect layout gap={10} paddingTop={10} paddingBottom={10} paddingLeft={startPadding + 10} ref={makeRef(refs, currentKey)}>
        { !sidebarTree.isFile && sidebarTree.children?.length && <Img src={dropDownImg} size={14} /> }
        { !sidebarTree.isFile && !sidebarTree.children?.length && <Img src={rightArrowImg} size={14} /> }
        <Layout gap={5}>
          { sidebarTree.isFile && <Img src={rubyImg} size={14} /> }
          <Txt fontSize={14} fill={"white"}>{sidebarTree.name}</Txt>
        </Layout>
      </Rect>
      {
        sidebarTree.children?.length &&
        <Layout direction={"column"}>
          {
            sidebarTree.children.map(t => VSCodeSideBar(t, startPadding + 20, currentKey, refs))
          }
        </Layout>
      }
    </>
  )
}