import { Code, makeScene2D } from "@motion-canvas/2d";
import { Direction, createRef, slideTransition, waitFor } from "@motion-canvas/core";
import { VSCode } from "../../assets/nodes/VSCode";

export default makeScene2D(function* (view) {
  yield* slideTransition(Direction.Left, 1);
  const vscodeRef = createRef<VSCode>();

  view.add(
    <VSCode
    ref={vscodeRef}
      sideBarTree={
        { name: "Ramen",
          children: [
            {
              name: "app",
              children: [
                {
                  name: "model"
                }
              ]
            },
            {
              name: "config",
              children: [
                {
                  name: "initializers",
                  children: [
                    {
                      name: "file.rb",
                      isFile: true
                    }
                  ]
                }
              ]
            }
          ]
        }}
      height={() => view.height()}
      width={() => view.width()}
    >
      <Code>

      </Code>
    </VSCode>
  )

  yield* vscodeRef().highlightTree("Ramen/config/initializers/file.rb", 1);
  yield* waitFor(2);
})