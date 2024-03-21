import {
  __wbg_set_wasm,
  render,
  __wbindgen_object_drop_ref,
  __wbindgen_throw,
} from "./svgbob_wasm_bg.js";
import wasmText from './base64File.js';

const text = atob(wasmText);
const bytes = new Uint8Array(text.length);
for (let i = 0; i < text.length; i++) {
  bytes[i] = text.charCodeAt(i);
}

const wasm = WebAssembly.instantiate(bytes, {
  "./svgbob_wasm_bg.js": {
    __wbindgen_object_drop_ref,
    __wbindgen_throw,
  },
});

let hasLoaded = false;
wasm.then(({ instance }) => {
  __wbg_set_wasm(instance.exports);
  hasLoaded = true;
});

export const getRenderer = async () => {
  if (hasLoaded) return render;

  await wasm;
  
  return render;
};