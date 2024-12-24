import { test, expect } from "vitest";
import remarkSVGBob from "../src/index";
import { remark } from "remark";
import remarkMDX from "remark-mdx";

const runTest = async (useMdx: boolean) => {
  const content = "<svg";
  const md = `
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
  const processor = useMdx
    ? remark().use(remarkMDX).use(remarkSVGBob, { useMdx })
    : remark().use(remarkSVGBob, { useMdx });
  const result = await processor.process(md);
  console.log(result.toString());
  expect(result.toString()).toContain(content);
};

test("converts svgbob ascii to svg without mdx", async () => {
  await runTest(false);
});

test("converts svgbob ascii to svg with mdx", async () => {
  await runTest(true);
});

test("works fine with multiple calls with mdx", async () => {
  const processor = remark().use(remarkMDX).use(remarkSVGBob, { useMdx: true });
  await processor.process(`\`\`\`svgbob\nn\n\`\`\``);
  await processor.process(`\`\`\`svgbob\ni\n\`\`\``);
  await processor.process(`\`\`\`svgbob\nc\n\`\`\``);
  await processor.process(`\`\`\`svgbob\ne\n\`\`\``);
});

test("works fine with multiple calls without mdx", async () => {
  const processor = remark().use(remarkSVGBob, { useMdx: false });
  await processor.process(`\`\`\`svgbob\nn\n\`\`\``);
  await processor.process(`\`\`\`svgbob\ni\n\`\`\``);
  await processor.process(`\`\`\`svgbob\nc\n\`\`\``);
  await processor.process(`\`\`\`svgbob\ne\n\`\`\``);
});
