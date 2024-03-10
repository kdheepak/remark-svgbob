import { visit } from "unist-util-visit";
import type { Node } from "unist";
import bob from "bob-wasm";
import { isElement } from "hast-util-is-element";
import { hasProperty as has, hasProperty } from "hast-util-has-property";

interface CodeNode extends Node {
  lang?: string;
  value: string;
}

export const remarkPlugin = () => {
  return async function transformer(tree: Node): Promise<Node> {
    await bob.loadWASM(); // First of all you need to load the WASM instance and wait for it
    // Create an array to hold all of the images from the markdown file

    visit(tree, "code", (node: CodeNode, index: any, parent: any) => {
      if (node.lang === "svgbob") {
        const value = node.value;
        const svg = bob.render(value);
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
