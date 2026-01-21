/**
 * Stateless, querystring-driven image renderer
 * Author: DMAC @ Imagination Driver
 * Date: 2026-01-20
 * License: MIT
*/

const params      = new URLSearchParams(location.search);
const canvas      = document.getElementById("canvas");
const ctx         = canvas.getContext("2d");
const greyColor   = "#e0e0e0";
const borderColor = "#b5b5b5";
const textColor   = "#777777";
const fontType    = "system-ui, -apple-system, Segoe UI, sans-serif";
const fontStyle   = "bold";
const fontAlign   = "center";
const fontBase    = "middle";
const dSize       = "1200x630";
const dEffect     = "plasma";
const dFormat     = "webp";
const dColors     = "00ffff,0080ff,8000ff";
const dIntensity  = 5;
const imgQuality  = 0.95;
const fontScaler  = 0.2;


/**
 * Retrieves a query parameter value from the URL.
 * @param {string} key - The name of the query parameter.
 * @param {string} def - The default value if the parameter is not found.
 * @returns {string} The value of the query parameter or the default value.
 */
const get = (key, def) => params.get(key) ?? def;


/**
 * Converts a hex color string to an RGB array.
 * @param {string} hex - Hex color string (example #ff0000).
 * @returns {number[]} RGB array (example [255, 0, 0]).
 */
const hexToRgb = hex => [
  parseInt(hex.slice(0, 2), 16),
  parseInt(hex.slice(2, 4), 16),
  parseInt(hex.slice(4, 6), 16)
];


/**
 * Interpolates between colors in the given array based on the given value.
 * @param {number[][]} colors - Array of colors in RGB format.
 * @param {number} t - Value between 0 and 1.
 * @returns {number[]} Interpolated color in RGB format.
 */
const interpolateColor = (colors, t) => {
  if (colors.length === 1) return colors[0];
  const n  = colors.length - 1;
  const i  = Math.min(Math.floor(t * n), n - 1);
  const f  = t * n - i;
  const c1 = colors[i];
  const c2 = colors[i + 1];
  return [
    c1[0] + (c2[0] - c1[0]) * f,
    c1[1] + (c2[1] - c1[1]) * f,
    c1[2] + (c2[2] - c1[2]) * f
  ];
};


/**
 * Attaches a click event listener to the canvas that downloads the image.
 * @param {Blob} blob - The image data as a Blob.
 */
function attachCanvasDownload(blob) {
  const url = URL.createObjectURL(blob);
  canvas.onclick = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `image-${Date.now()}.${format}`;
    a.click();
  };
}


/**
 * Draws a placeholder image with the given width and height.
 * @param {CanvasRenderingContext2D} ctx - 2D rendering context.
 * @param {number} width - Width of the image.
 * @param {number} height - Height of the image.
 */
function drawPlaceholder(ctx, width, height) {
  const text     = `${width} × ${height}`;
  const fontSize = Math.floor(Math.min(width, height) * fontScaler);

  ctx.fillStyle = greyColor;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = borderColor;
  ctx.lineWidth   = Math.max(1, Math.floor(Math.min(width, height) * 0.02));
  ctx.strokeRect(0, 0, width, height);

  ctx.fillStyle    = textColor;
  ctx.font         = `${fontStyle} ${fontSize}px ${fontType}`;
  ctx.textAlign    = fontAlign;
  ctx.textBaseline = fontBase;
  ctx.fillText(text, width / 2, height / 2);
}


/* ================================
 * Effects
 * ================================ */
const effects = {
  plasma(x, y, t, i) {
    const s = 0.01 * i;
    const v =
      Math.sin(x * s + t) +
      Math.sin(y * s + t) +
      Math.sin((x + y) * s + t) +
      Math.sin(Math.sqrt(x * x + y * y) * s + t);
    return (v + 4) / 8;
  },

  marble(x, y, t, i) {
    const s = 0.005 * i;
    const v =
      Math.sin(x * s + Math.sin(y * s * 0.6) * 3 + t) +
      Math.cos(y * s + Math.cos(x * s * 0.6) * 3 + t);
    return (v + 2) / 4;
  },

  fractal(x, y, t, i) {
    let v    = 0;
    let amp  = 1;
    let freq = 0.005 * i;
    for (let n = 0; n < 5; n++) {
      v    += Math.sin(x * freq + t) * Math.cos(y * freq + t) * amp;
      amp  *= 0.5;
      freq *= 2;
    }
    return (v + 2) / 4;
  },

  ripples(x, y, t, i, w, h) {
    const cx = w / 2;
    const cy = h / 2;

    const d1 = Math.hypot(x - cx, y - cy);
    const d2 = Math.hypot(x - cx * 0.5, y - cy * 1.5);
    const d3 = Math.hypot(x - cx * 1.5, y - cy * 0.5);

    const s = 0.05 * i;
    const v =
      Math.sin(d1 * s + t) +
      Math.sin(d2 * s * 1.4 - t) +
      Math.sin(d3 * s * 1.2 + t * 0.5);

    return (v + 3) / 6;
  },

  vortex(x, y, t, i, w, h) {
    const cx = w / 2;
    const cy = h / 2;
    const dx = x - cx;
    const dy = y - cy;
    const d  = Math.sqrt(dx * dx + dy * dy);
    const a  = Math.atan2(dy, dx);
    const s  = 0.03 * i;
    const v  = Math.sin(d * s + a * 3 + t) + Math.cos(d * s * 0.66 - a * 2 + t * 0.5);
    return (v + 2) / 4;
  }
};


/* ================================
 * Parse API params and Render Blob
 * ================================ */
const [width, height] = get("size", dSize).split("x").map(Number);
const effectName      = get("effect", dEffect);
const intensity       = parseFloat(get("intensity", dIntensity));
const format          = get("format", dFormat);
const colors          = get("colors", dColors).split(",").map(hexToRgb);
canvas.width          = width;
canvas.height         = height;

if (effectName === "placeholder") {
  drawPlaceholder(ctx, width, height);
} else {
  const img = ctx.createImageData(width, height);
  const t   = Math.random() * Math.PI * 2;
  const fx  = effects[effectName] ?? effects.plasma;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const v         = fx(x, y, t, intensity, width, height);
      const [r, g, b] = interpolateColor(colors, v);
      const i         = (y * width + x) * 4;
      img.data[i]     = r;
      img.data[i + 1] = g;
      img.data[i + 2] = b;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}

canvas.toBlob(blob => attachCanvasDownload(blob), `image/${format}`, imgQuality);