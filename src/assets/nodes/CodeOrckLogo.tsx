import { Img, Layout, Node, Rect } from "@motion-canvas/2d"
import orcksImage from "../images/orcks.png";
import { createRef } from "@motion-canvas/core";

export default function addCodeOrckLogo (node: Layout | Rect) {
    const orckLogo = createRef<Img>();

    node.add(
        <Img ref={orckLogo} src={orcksImage} position={() => node.bottomRight().addX(-70).addY(-50)}/>
    )
    return orckLogo();
}