import { visit } from "unist-util-visit";
import type { Node } from "unist";
import { getRenderer } from "./svgbob-wasm";
import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { Root, Element as HASTElement, Text as HASTText, Properties, RootContent } from "hast";

interface CodeNode extends Node {
  lang?: string;
  value: string;
}

// Convert HAST attributes into MdxJsx attributes
function processHastAttributes(properties: Properties): MdxJsxAttribute[] {
  function get_value_as_string(key): string {
    let value = properties[key];
    if (value instanceof Array) {
      return value.map((v) => v.toString()).join(" ");
    } else if (typeof value === "number") {
      return properties[key].toString();
    } else if (typeof value === "string") {
      return properties[key] as string;
    }
  }

  return Object.keys(properties).map((key) => {
    return {
      type: "mdxJsxAttribute",
      name: key,
      value: get_value_as_string(key),
    };
  });
}

function isElement(node: RootContent): node is HASTElement {
  return node?.type == "element";
}

function isText(node: RootContent): node is HASTText {
  return node?.type == "text";
}

function processMdxHastElement(node: RootContent): MdxJsxFlowElement | undefined {
  let ret = undefined;
  if (isElement(node)) {
    // Deal with text nodes separately so that we don't recursively place whitespace only
    // nodes in the output tree which will litter the html with empty <text> nodes.
    if (node.tagName === "text" && node?.children.length == 1 && isText(node.children[0])) {
      ret = {
        type: "mdxJsxFlowElement",
        name: node.tagName,
        attributes: processHastAttributes(node.properties),
        children: [{ type: "text", value: node.children[0].value }],
      };
    } else {
      ret = {
        type: "mdxJsxFlowElement",
        name: node.tagName,
        attributes: processHastAttributes(node.properties),
        children:
          node?.children
            .map((child) => processMdxHastElement(child))
            .filter((n) => n != undefined) || [],
      };
    }
  }

  return ret;
}

interface RemarkPluginOptions {
  useMdx?: boolean;
}

/**
 * A remark plugin to transform code blocks with language `svgbob` into SVG elements.
 *
 * @param useMdx - A boolean flag to determine if MDX should be used for the output elements.
 * @returns A transformer function that processes the Markdown AST.
 *
 * @example
 * import { remark } from 'remark';
 * import remarkSVGBob from 'remark-svgbob';
 *
 * const processor = remark().use(remarkSVGBob);
 *
 * processor.process('# Example\n```svgbob\nA -> B\n```').then((file) => {
 *   console.log(String(file));
 * });
 */
export const remarkPlugin = (options: RemarkPluginOptions = {}) => {
  const { useMdx = false } = options;
  return async function transformer(tree: Node): Promise<Node> {
    const render = await getRenderer();

    visit(tree, "code", (node: CodeNode, index: any, parent: any) => {
      if (node.lang === "svgbob") {
        const svg = render(node.value);
        if (useMdx) {
          // Convert into hast format
          let hast: Root = fromHtml(svg, { fragment: true });
          // The first (and only) child of the root node will an svg element
          let element = hast.children[0];
          // Recursively process the elements into mdxJsxFlowElements or HAST elements
          let image = processMdxHastElement(element);
          // Replace the code node with the image node
          parent.children.splice(index, 1, image);
        } else {
          // TODO: Make this feature compatible with MDX
          const image = {
            type: "html",
            value: `${svg}`,
          };
          parent.children.splice(index, 1, image);
        }
      }
    });

    return tree;
  };
};
