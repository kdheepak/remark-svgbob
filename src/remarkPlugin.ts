import { visit } from "unist-util-visit";
import type { Node } from "unist";
import { getRenderer } from "./svgbob-wasm";

interface CodeNode extends Node {
  lang?: string;
  value: string;
}

export const remarkPlugin = () => {
  return async function transformer(tree: Node): Promise<Node> {
    const render = await getRenderer();
    // Create an array to hold all of the images from the markdown file

    visit(tree, "code", (node: CodeNode, index: any, parent: any) => {
      if (node.lang === "svgbob") {
        const value = node.value;
        const svg = render(value);
        const image = {
          type: "html",
          value: `<span>${svg}</span>`,
        };

        parent.children.splice(index, 1, image);
      }
    });

    return tree;
  };
};
