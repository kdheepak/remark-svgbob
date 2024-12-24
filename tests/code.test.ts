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
  const r1 = await processor.process(`\`\`\`svgbob\nhello\n\`\`\``);
  expect(r1.toString()).toContain("<svg");
  expect(r1.toString()).toContain("hello");
  const r2 = await processor.process(`\`\`\`svgbob\nworld\n\`\`\``);
  expect(r2.toString()).toContain("<svg");
  expect(r2.toString()).toContain("world");
  const r3 = await processor.process(`\`\`\`svgbob\ngoodbye\n\`\`\``);
  expect(r3.toString()).toContain("<svg");
  expect(r3.toString()).toContain("goodbye");
  const r4 = await processor.process(`\`\`\`svgbob\nworld\n\`\`\``);
  expect(r4.toString()).toContain("<svg");
  expect(r4.toString()).toContain("world");
});

test("works fine with multiple calls without mdx", async () => {
  const processor = remark().use(remarkSVGBob);
  const r1 = await processor.process(`\`\`\`svgbob\nhello\n\`\`\``);
  expect(r1.toString()).toContain("<svg");
  expect(r1.toString()).toContain("hello");
  const r2 = await processor.process(`\`\`\`svgbob\nworld\n\`\`\``);
  expect(r2.toString()).toContain("<svg");
  expect(r2.toString()).toContain("world");
  const r3 = await processor.process(`\`\`\`svgbob\ngoodbye\n\`\`\``);
  expect(r3.toString()).toContain("<svg");
  expect(r3.toString()).toContain("goodbye");
  const r4 = await processor.process(`\`\`\`svgbob\nworld\n\`\`\``);
  expect(r4.toString()).toContain("<svg");
  expect(r4.toString()).toContain("world");
});
