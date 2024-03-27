import { toRGB } from "./toRGB";
export function colorRe(color: string) {
  let newcolor: string = toRGB(color);
  // 获取补色
  const getComplementColor = (rgbString: string | undefined) => {
    if (!rgbString) return;
    // 正则表达式用于匹配rgb格式中的数值
    const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
    const result = rgbString.match(rgbRegex);
    // 如果没有匹配到有效的rgb格式，则返回错误
    if (!result) {
      throw new Error("没有有效颜色");
    }
    // 提取红色、绿色和蓝色的数值
    const r = parseInt(result[1], 10);
    const g = parseInt(result[2], 10);
    const b = parseInt(result[3], 10);

    // 计算补色的RGB值
    const complementR = 255 - r;
    const complementG = 255 - g;
    const complementB = 255 - b;

    // 格式化补色为"rgb(R, G, B)"字符串
    const complementColor = `rgb(${complementR}, ${complementG}, ${complementB})`;
    return complementColor;
  };
  return getComplementColor(newcolor);
}
