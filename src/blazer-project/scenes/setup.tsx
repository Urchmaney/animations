import { Code, Rect, makeScene2D } from "@motion-canvas/2d";
import { Direction, createRef, slideTransition, waitFor } from "@motion-canvas/core";
import { VSCode } from "../../assets/nodes/VSCode";

export default makeScene2D(function* (view) {
  yield* slideTransition(Direction.Left, 1);
  const vscodeRef = createRef<VSCode>();
  const codeRef = createRef<Code>();

  view.add(
    <VSCode
      ref={vscodeRef}
      sideBarTree={
        {
          name: "Ramen",
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
      <Rect padding={10}>
        <Code
          ref={codeRef}
          fontSize={20}
          offsetX={-1}
          x={-400}
          code={`\
function hello() {
  console.log('Hello');
}`}

        />
      </Rect>

    </VSCode>
  )

  yield* vscodeRef().highlightTree("Ramen/config/initializers/file.rb", 1);
  yield* waitFor(2);
  yield* vscodeRef().writeToTerminal("gem install blazer", 2);
  yield* waitFor(2);
  yield* vscodeRef().addFileTo("Ramen/config/initializers", "sleep.rb", 1);
  yield* waitFor(2);
  yield* vscodeRef().addFileTo("Ramen/config/initializers", "run.rb", 0.5);
  yield* waitFor(2);
  yield* codeRef().selection(codeRef().findAllRanges(/hello/gi), 0.6);
})