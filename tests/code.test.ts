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

test('works fine with multiple calls', async () => {
  const processor = remark().use(svgBobCode);
  await processor.process(`\`\`\`svgbob\nn\n\`\`\``);
  await processor.process(`\`\`\`svgbob\ni\n\`\`\``);
  await processor.process(`\`\`\`svgbob\nc\n\`\`\``);
  await processor.process(`\`\`\`svgbob\ne\n\`\`\``);
})