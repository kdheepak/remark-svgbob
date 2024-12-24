import { visit } from "unist-util-visit";
import type { Node } from "unist";
import { getRenderer } from "./svgbob-wasm";
import { fromHtml } from 'hast-util-from-html'
import { MdxJsxAttribute, MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import { Root, Element as HASTElement, Text as HASTText, Properties, RootContent} from "hast";

interface CodeNode extends Node {
  lang?: string;
  value: string;
}

// Convert HAST attributes into MdxJsx attributes
function processHastAttributes(properties: Properties) : MdxJsxAttribute[] {
  function get_value_as_string(key) : string {
    let value = properties[key];
    if(value instanceof Array) {
      return value.map((v) => v.toString()).join(" ");
    }
    else if(typeof value === "number") {
      return properties[key].toString();
    }
    else if (typeof value === "string") {
      return properties[key] as string;
    }
  };

  return Object.keys(properties).map((key) => {
    return {
      type: "mdxJsxAttribute",
      name: key,
      value: get_value_as_string(key),
    }
  });
}

function isElement(node: RootContent) : node is HASTElement {
  return node?.type == "element";
}

function isText(node: RootContent) : node is HASTText {
  return node?.type == "text";
}

function processHastElement(node: RootContent) : MdxJsxFlowElement | undefined {
  let ret = undefined;
  if(isElement(node)) {
    // Deal with text nodes seperately so that we don't recursively place whitespace only 
    // nodes in the output tree which will litter the html with empty <text> nodes.
    if(node.tagName === "text" && node?.children.length == 1 && isText(node.children[0])) { 
      ret = {
        type: "mdxJsxFlowElement",
        name: node.tagName,
        attributes: processHastAttributes(node.properties),
        children: [{type: "text", value: node.children[0].value}],
      }
    } else {
      ret = {
        type: "mdxJsxFlowElement",
        name: node.tagName,
        attributes: processHastAttributes(node.properties),
        children: node?.children.map((child) => processHastElement(child)).filter((n) => n!=undefined) || [],
      }
    }
  }

  return ret;
}


export const remarkPlugin = () => {
  return async function transformer(tree: Node): Promise<Node> {
    const render = await getRenderer();

    visit(tree, "code", (node: CodeNode, index: any, parent: any) => {
      if (node.lang === "svgbob") {
        const svg = render(node.value);
        // Convert into hast format
        let hast : Root = fromHtml(svg, {fragment: true});
        // The first (and only) child of the root node will an svg element
        let element = hast.children[0];
        // Recursively process the elements into mdxJsxFlowElements
        let image : MdxJsxFlowElement = processHastElement(element);
        // Replace the code node with the image node
        parent.children.splice(index, 1, image);
      }
    });

    return tree;
  };
};

