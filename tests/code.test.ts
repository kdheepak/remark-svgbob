import { test, expect } from "vitest";
import svgBobCode from "../src/index";
import { remark } from "remark";

test("converts svgbob ascii to svg", async () => {
  const content = "svg";
  const md = `
Use a code block with the language \`svgbob\`

\`\`\`svgbob
       .---.
      /-o-/--
   .-/ / /->
  ( *  \/
   '-.  \
      \ /
       '
\`\`\`
  `.trim();
  const processor = remark().use(svgBobCode);
  const result = await processor.process(md);
  console.log(result.toString());
  expect(result.toString()).toContain(content);
});
