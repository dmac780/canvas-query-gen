# Query string Canvas image generator

**Stateless, URL-driven canvas image generator for psychedelic visuals or generic placeholders for blogs, demos, and test cases.**

---

## Description

This is a **purely client-side, URL-driven tool** that generates vibrant psychedelic patterns or simple gray placeholder images showing their dimensions, all controlled via query string parameters.

Sometimes you just need royalty-free placeholder images at specific sizes for whatever purpose


---

## Query Parameters

| Parameter   | Default      | Description                                                                                       |
|-------------|-------------|---------------------------------------------------------------------------------------------------|
| `effect`    | `plasma`    | Which effect to generate. Options: `plasma`, `marble`, `fractal`, `ripples`, `vortex`, `placeholder` |
| `size`      | `1200x630`  | Width × Height in pixels, e.g., `800x600`                                                        |
| `colors`    | `00ffff,0080ff,8000ff` | Comma-separated hex RGB colors. Only used for procedural effects, ignored by `placeholder` |
| `intensity` | `5`         | Float, controls effect intensity. Ignored by `placeholder`                                       |
| `format`    | `webp`      | Output image format: `webp` or `png`                                                            |

---

## Procedural / Psychedelic Example URLs

- **Fractal**:  
<https://dmac780.github.io/canvas-query-gen/?effect=fractal&size=1200x630&intensity=7>  

- **Plasma**:  
<https://dmac780.github.io/canvas-query-gen/?effect=plasma&size=1200x600&colors=ff0000,00ff00,0000ff&intensity=10>  

- **Marble**:  
<https://dmac780.github.io/canvas-query-gen/?effect=marble&size=1600x400&colors=ff0000,000000&intensity=8>  

- **Ripples**:  
<https://dmac780.github.io/canvas-query-gen/?effect=ripples&size=300x300>  

- **Vortex**:  
<https://dmac780.github.io/canvas-query-gen/?effect=vortex&size=800x600&colors=ff5500,ffaa00>  

---

## Placeholder Image Example URLs

- **180×180**:  
<https://dmac780.github.io/canvas-query-gen/?effect=placeholder&size=180x180>  

- **300×250**:  
<https://dmac780.github.io/canvas-query-gen/?effect=placeholder&size=300x250>  

- **1200×630**:  
<https://dmac780.github.io/canvas-query-gen/?effect=placeholder&size=1200x630>  

- **1920×1080**:  
<https://dmac780.github.io/canvas-query-gen/?effect=placeholder&size=1920x1080>  

---

## Usage Notes

- Browse to https://dmac780.github.io/canvas-query-gen/
- Add/modify query string values as desired. You can mix parameters freely and add as many colors as you want. Best results: use 2-8 colors.
- **Click the image** to download it. 

<https://dmac780.github.io/canvas-query-gen/?effect=marble&size=1600x400&colors=921CFF,1CE5FF,FF4D00,FF00A0,00FFA3&intensity=10&format=webp>
