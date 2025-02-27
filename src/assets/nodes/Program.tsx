
// import { Code, initial, lines, Node, NodeProps, Rect, signal } from "@motion-canvas/2d";
// import { BBox, makeRef, SimpleSignal } from "@motion-canvas/core";

import { Node, Code, Rect, NodeProps, lines, initial, signal } from "@motion-canvas/2d";
import { BBox, Reference, SimpleSignal, createRef, createSignal, makeRef } from "@motion-canvas/core";

const code = `\
const name = "show";
function man() {
    var g = game
    g * 7
    return 2;
}
// `

// export class Program extends Node {
//     public declare readonly block: Code;
//     public declare readonly highlight: Rect;

//     @initial(0)
//     @signal()
//     public declare readonly line: SimpleSignal<number, this>;

//     @initial(0)
//     @signal()
//     public declare readonly range: SimpleSignal<BBox, this>;

//     public getDefaultRange() {

//         const boxes = this.block?.getSelectionBBox(lines(Math.floor(this.line())));
//         let box = boxes[0];
//         for (let i = 1; i < boxes.length; i++) {
//             const b = boxes[i];
//             box = box.union(b)
//         }
//         return box;
//     }



//     public constructor(props: NodeProps) {
//         super(props);




//         this.add(
//             <Code fontSize={32} code={code} ref={makeRef(this, "block")}>
//                 <Rect
//                     fill={"white"}
//                     lineWidth={4}
//                     opacity={0.1}
//                     // width={() => {
//                     //     return this.range()?.width || 0
//                     // }}
//                     // height={() => this.range()?.height || 0}
//                     size={() => this.range()?.size || 0}
//                     offset={-1}
//                     position={() => this.range()?.position || 0}
//                     ref={makeRef(this, "highlight")}
//                 />
//             </Code>
//         );


//     }
//     *focusLine(num: number) {
//       this.line(num);
//       yield;
//     }

// }

export class Program extends Node {
    private block: Reference<Code>;
    private highlight: Reference<Rect>;
    private line: SimpleSignal<number, number>;

    public constructor(props: NodeProps) {
        super(props);

        this.block = createRef<Code>();
        this.highlight = createRef<Rect>();
        this.line = createSignal(1);

        this.add(<Code fontSize={32} code={code} ref={this.block} />);

        const range = createSignal(() => {
            const boxes = this.block()?.getSelectionBBox(lines(Math.floor(this.line())));
            let box = boxes[0];
            return box;

        });

        this.block().add(
            <Rect
                fill={"white"}
                width={"100%"}
                opacity={0.1}
                offset={-1}
                size={() => range()?.size || 0}
                position={() =>   range()?.position || 0}
                ref={this.highlight}
            />,
        );
    }

    public * focusLine(num: number) {
        yield this.line(num);
    }
}
