# remark-svgbob

![npm](https://img.shields.io/npm/v/remark-svgbob)
![NPM Downloads](https://img.shields.io/npm/dm/remark-svgbob)
![License](https://img.shields.io/npm/l/remark-svgbob)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

`remark-svgbob` is a plugin for [Remark](https://github.com/remarkjs/remark), a Markdown processor
powered by plugins part of the unified collective, that converts ASCII diagrams within code blocks
into crisp SVG images using the [`svgbob`](https://github.com/ivanceras/svgbob) tool.

<img width="685" alt="image" src="https://github.com/kdheepak/remark-svgbob/assets/1813121/ad7b6d47-3063-45f0-a2c7-d6ff00a7b97a">

This allows you to seamlessly integrate ASCII art diagrams into your Markdown files and have them
rendered as high-quality SVG images in the resulting HTML.

## Features

- `remark-svgbob` detects code blocks tagged with a specific language identifier (e.g., `svgbob`) in
  your Markdown and replaces them with corresponding SVG images.
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
  .use(remarkSVGBob)
  .process(markdown, function (err, file) {
    if (err) throw err;
    console.log(String(file));
  });
```

Then write markdown 

````markdown
Use a code block with the language `svgbob`

```svgbob
       .---.
      /-o-/--
   .-/ / /->
  ( *  \/
   '-.  \
      \ /
       '
```
````

This will generate the following content:

<details>
  
```markdown
Use a code block with the language `svgbob`

<span><svg xmlns="http://www.w3.org/2000/svg" width="136" height="112">
    <style>
        line, path, circle, rect, polygon{stroke:black;stroke-width:2;stroke-opacity:1;fill-opacity:1;stroke-linecap:round;stroke-linejoin:miter;}text{font-family:Iosevka Fixed, monospace;font-size:14px;}rect.backdrop{stroke:none;fill:transparent;}.broken{stroke-dasharray:8;}.filled{fill:black;}.bg_filled{fill:transparent;}.nofill{fill:transparent;}.end_marked_arrow{marker-end:url(#arrow);}.start_marked_arrow{marker-start:url(#arrow);}.end_marked_diamond{marker-end:url(#diamond);}.start_marked_diamond{marker-start:url(#diamond);}.end_marked_circle{marker-end:url(#circle);}.start_marked_circle{marker-start:url(#circle);}.end_marked_open_circle{marker-end:url(#open_circle);}.start_marked_open_circle{marker-start:url(#open_circle);}.end_marked_big_open_circle{marker-end:url(#big_open_circle);}.start_marked_big_open_circle{marker-start:url(#big_open_circle);}
        <!--separator-->

    </style>
    <defs>
        <marker id="arrow" viewBox="-2 -2 8 8" refX="4" refY="2" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <polygon points="0,0 0,4 4,2 0,0"></polygon>
        </marker>
        <marker id="diamond" viewBox="-2 -2 8 8" refX="4" refY="2" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <polygon points="0,2 2,0 4,2 2,4 0,2"></polygon>
        </marker>
        <marker id="circle" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <circle cx="4" cy="4" r="2" class="filled"></circle>
        </marker>
        <marker id="open_circle" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <circle cx="4" cy="4" r="2" class="bg_filled"></circle>
        </marker>
        <marker id="big_open_circle" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <circle cx="4" cy="4" r="3" class="bg_filled"></circle>
        </marker>
    </defs>
    <rect class="backdrop" x="0" y="0" width="136" height="112"></rect>
    <circle cx="68" cy="24" r="3" class="nofill"></circle>
    <line x1="66" y1="28" x2="56" y2="48" class="solid"></line>
    <line x1="72" y1="24" x2="104" y2="24" class="solid"></line>
    <circle cx="36" cy="56" r="3" class="filled"></circle>
    <line x1="64" y1="48" x2="56" y2="64" class="solid"></line>
    <text x="42" y="76" >.</text>
    <line x1="128" y1="64" x2="120" y2="80" class="solid"></line>
    <text x="58" y="92" >&#39;</text>
    <g>
        <path d="M 64,8 A 8,8 0,0,0 58,12" class="nofill"></path>
        <line x1="58" y1="12" x2="38" y2="52" class="solid"></line>
        <line x1="64" y1="8" x2="88" y2="8" class="solid"></line>
        <path d="M 88,8 A 3,3 0,0,1 90,12" class="nofill"></path>
        <line x1="90" y1="12" x2="72" y2="48" class="solid"></line>
        <line x1="52" y1="24" x2="64" y2="24" class="solid"></line>
        <line x1="76" y1="40" x2="88" y2="40" class="solid"></line>
        <polygon points="88,36 96,40 88,44" class="filled"></polygon>
        <path d="M 32,40 A 8,8 0,0,0 26,44" class="nofill"></path>
        <line x1="26" y1="44" x2="24" y2="48" class="solid"></line>
        <line x1="32" y1="40" x2="44" y2="40" class="solid"></line>
        <path d="M 24,48 A 16,16 0,0,0 24,64" class="nofill"></path>
        <line x1="24" y1="64" x2="26" y2="68" class="solid"></line>
        <path d="M 26,68 A 8,8 0,0,0 32,72" class="nofill"></path>
        <line x1="32" y1="72" x2="40" y2="72" class="solid"></line>
    </g>
</svg></span>
```

</details>

## Contributing

Contributions are always welcome! Feel free to fork the repository, make changes, and submit a pull
request.

## License

Distributed under the MIT License. See `LICENSE` file for more information.

---

Note: The `remark-svgbob` plugin is not officially associated with `svgbob`.
