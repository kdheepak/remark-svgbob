import { test, expect } from "vitest";
import svgBobCode from "../src/index";
import { remark } from "remark";

test("converts svgbob ascii to svg", async () => {
  const content = "svg";
  const md = `
  # Some title

  \`\`\`svgbob
  ,-------------.
  |Get Key Event|
  \`-----+-------'
        |
        |
  ,-----v------.
  |Update State|
  \`-----+------'
        |
        |
    ,---v----.
    | Render |
    \`--------'
  \`\`\`

  Some block of text
  `.trim();
  const processor = remark().use(svgBobCode);
  const result = await processor.process(md);
  console.log(result.toString());
  expect(result.toString()).toContain(content);
});
