import { visit } from "unist-util-visit";
import type { Node } from "unist";
import { getRenderer } from "./svgbob-wasm";
import { Buffer } from "node:buffer";

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
        const svg = render(node.value);
        const buffer = Buffer.from(svg, "utf8");
        const base64SVG = buffer.toString("base64");
        const imgSrc = `data:image/svg+xml;base64,${base64SVG}`;

        const image = {
          type: "mdxJsxFlowElement",
          name: "img",
          attributes: [
            { type: "mdxJsxAttribute", name: "src", value: imgSrc },
            { type: "mdxJsxAttribute", name: "alt", value: "svgbob" },
          ],
          children: [],
        };

        parent.children.splice(index, 1, image);
      }
    });

    return tree;
  };
};
