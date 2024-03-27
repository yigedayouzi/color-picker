export const hsvToRGB = (h: number, s: number, v: number) => {
  h === 360 && (h = 0);
  let i = Math.floor(h / 60) % 6;
  let f = h / 60 - i;
  let p = v * (1 - s);
  let q = v * (1 - s * f);
  let t = v * (1 - s * (1 - f));
  let r = 0,
    g = 0,
    b = 0;
  if (i === 0) {
    r = v;
    g = t;
    b = p;
  } else if (i === 1) {
    r = q;
    g = v;
    b = p;
  } else if (i === 2) {
    r = p;
    g = v;
    b = t;
  } else if (i === 3) {
    r = p;
    g = q;
    b = v;
  } else if (i === 4) {
    r = t;
    g = p;
    b = v;
  } else if (i === 5) {
    r = v;
    g = p;
    b = q;
  }

  r = Math.floor(r * 255 + 0.5);
  g = Math.floor(g * 255 + 0.5);
  b = Math.floor(b * 255 + 0.5);
  return { r, g, b };
};
