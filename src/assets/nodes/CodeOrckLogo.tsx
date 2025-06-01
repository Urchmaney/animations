import { Img, Layout, Node, Rect } from "@motion-canvas/2d"
import orcksImage from "../images/orcks.png";
import orcksBlackImage from "../images/orcksBlack.png";
import { createRef } from "@motion-canvas/core";

export default function addCodeOrckLogo (node: Layout | Rect, white: boolean = true) {
    const orckLogo = createRef<Img>();

    node.add(
        <Img ref={orckLogo} src={white ? orcksImage : orcksBlackImage} position={() => node.bottomRight().addX(-70).addY(-50)}/>
    )
    return orckLogo();
}