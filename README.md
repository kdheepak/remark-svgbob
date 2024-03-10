# remark-svgbob

`remark-svgbob` is a plugin for [Remark](https://github.com/remarkjs/remark), a Markdown processor
powered by plugins part of the unified collective, that converts ASCII diagrams within code blocks
into crisp SVG images using the [`svgbob`](https://github.com/ivanceras/svgbob) tool.

This allows you to seamlessly integrate ASCII art diagrams into your Markdown files and have them
rendered as high-quality SVG images in the resulting HTML.

## Features

- `remark-svgbob` detects code blocks tagged with a specific language identifier (e.g., `svgbob`) in
  your Markdown and replaces them with corresponding SVG images.
- Customize the appearance of the SVG output with `svgbob`'s configuration options.
- SVG output is scalable and styleable with CSS, making it perfect for responsive designs.

## Installation

Install `remark-svgbob` with npm:

```bash
npm install remark-svgbob
```

## Usage

Import it and use it with Remark as follows:

```js
import remark from "remark";
import remarkSVGBob from "remark-svgbob";

remark()
  .use(remarkSVGBob, options)
  .process(markdown, function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });
```

## Options

You can pass configuration options to `remark-svgbob`:

```js
const options = {
  // `svgbob` options go here
};

remark().use(remarkSVGBob, options);
```

Refer to the `svgbob` documentation for available configuration options.

## Contributing

Contributions are always welcome! Feel free to fork the repository, make changes, and submit a pull
request.

## License

Distributed under the MIT License. See `LICENSE` file for more information.

---

Note: The `remark-svgbob` plugin is not officially associated with `svgbob`.
