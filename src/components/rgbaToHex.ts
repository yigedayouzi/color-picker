export const rgbaToHex = (r: any, g: any, b: any, a = 1) => {
  r = parseInt(r);
  let r1 = r.toString(16).length !== 2 ? "0" + r.toString(16) : r.toString(16);
  g = parseInt(g);
  let g1 = g.toString(16).length !== 2 ? "0" + g.toString(16) : g.toString(16);
  b = parseInt(b);
  let b1 = b.toString(16).length !== 2 ? "0" + b.toString(16) : b.toString(16);
  let a1 = "";
  if (a !== 1) {
    let temp = Math.floor(256 * a);
    a1 =
      temp.toString(16).length !== 2
        ? "0" + temp.toString(16)
        : temp.toString(16);
  }
  return `#${r1}${g1}${b1}${a1}`.toUpperCase();
};
export const hexToRGBA = (s: string): any => {
  const hex3To6 = (hex3: string): string => {
    return hex3.replace(/(.)/g, ($1) => $1 + $1);
  };

  const hex = s.replace(/^#/, ""); // 移除可能的前导#

  if (hex.length === 3 || hex.length === 4) {
    return hexToRGBA(hex3To6(hex));
  }

  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b, a: 1 };
  }

  if (hex.length === 8) {
    const a = parseInt(hex.substring(6, 8), 16) / 255;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b, a };
  }

  // 如果不符合任何已知格式，返回null或抛出错误
  return null;
};
