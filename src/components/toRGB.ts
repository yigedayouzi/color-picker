// 判断颜色格式
export const toRGB = (colorStr: string) => {
  // 去除空格
  colorStr = colorStr.trim();

  // 十六进制颜色
  let hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (hexRegex.test(colorStr)) {
    // 如果是3位十六进制，则补全为6位
    if (colorStr.length === 4) {
      let r = colorStr[1];
      let g = colorStr[2];
      let b = colorStr[3];
      colorStr = `#${r}${r}${g}${g}${b}${b}`;
    }
    // 转换为rgb格式
    return `rgb(${parseInt(colorStr.slice(1, 3), 16)}, ${parseInt(
      colorStr.slice(3, 5),
      16
    )}, ${parseInt(colorStr.slice(5, 7), 16)})`;
  }

  // rgba颜色
  let rgbaRegex =
    /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([01]|\.\d+)\)$/;
  let rgbaMatch = rgbaRegex.exec(colorStr);
  if (rgbaMatch) {
    // 只保留rgb值，忽略alpha透明度
    return `rgb(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]})`;
  }

  // rgb颜色
  let rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
  if (rgbRegex.test(colorStr)) {
    return colorStr;
  }

  // 如果都不是，返回空
  return "";
};
