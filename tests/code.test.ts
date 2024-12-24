import { test, expect } from "vitest";
import svgBobCode from "../src/index";
import { remark } from "remark";
import remarkMDX from "remark-mdx";

const runTest = async (useMDX: boolean) => {
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
  const processor = useMDX ? remark().use(remarkMDX).use(svgBobCode) : remark().use(svgBobCode);
  const result = await processor.process(md);
  console.log(result.toString());
  expect(result.toString()).toContain(content);
};

test("converts svgbob ascii to svg with mdx", async () => {
  await runTest(true);
});

test("converts svgbob ascii to svg without mdx", async () => {
  await runTest(false);
});

test('works fine with multiple calls with mdx', async () => {
  const processor = remark().use(remarkMDX).use(svgBobCode);
  await processor.process(`\`\`\`svgbob\nn\n\`\`\``);
  await processor.process(`\`\`\`svgbob\ni\n\`\`\``);
  await processor.process(`\`\`\`svgbob\nc\n\`\`\``);
  await processor.process(`\`\`\`svgbob\ne\n\`\`\``);
})

test('works fine with multiple calls without mdx', async () => {
  const processor = remark().use(svgBobCode);
  await processor.process(`\`\`\`svgbob\nn\n\`\`\``);
  await processor.process(`\`\`\`svgbob\ni\n\`\`\``);
  await processor.process(`\`\`\`svgbob\nc\n\`\`\``);
  await processor.process(`\`\`\`svgbob\ne\n\`\`\``);
})
