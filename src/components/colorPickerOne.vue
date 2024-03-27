<template>
  <div class="color-select">
    <!-- 调色盘 -->
    <div
      class="saturation-value"
      ref="mainColorArea"
      @mousedown="mousedownColorPalette"
    >
      <div :style="`background-color: hsl(${hue}, 100%, 50%);`">
        <div class="point" :style="pointStyle"></div>
      </div>
      <div class="saturation-value-2"></div>
      <div class="saturation-value-3"></div>
    </div>
    <!-- 择色区与透明度 -->
    <div class="color-select-middle">
      <div class="color-slider">
        <!-- 颜色调 -->
        <div
          class="hue-slider slider-item"
          ref="hue_slider"
          @mousedown="mousedownHue"
        >
          <div class="slider" :style="hueSliderStyle"></div>
        </div>
        <!-- 透明度条 -->
        <div
          class="alpha-slider slider-item"
          ref="alphaTiao"
          @mousedown="mousedownAlpha"
        >
          <div class="slider" :style="alphaSliderStyle"></div>
          <div
            :style="`background: linear-gradient(to right, rgba(0,0,0,0), ${rgb});width: 100%;height: 100%`"
          ></div>
        </div>
      </div>
      <div class="color-diamond">
        <div
          :style="`background-color: ${rgba};width: 100%;height: 100%;box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);`"
        ></div>
      </div>
    </div>
    <!-- 颜色数据 -->
    <div class="color-value">
      <div class="hex">
        <label>
          <input :value="hex" @input="hexChange" spellcheck="false" />
        </label>
        <div
          style="
            display: flex;
            margin-left: 50%;
            transform: translateX(-50%);

            width: auto;
          "
        >
          <p>Hex</p>
          <button class="copyButton" @click="copyColor('hex')">复制</button>
        </div>
      </div>
      <div class="rgba-r">
        <label>
          <input :value="colors.r" @input="redChange" />
        </label>
        <p>R</p>
      </div>
      <div class="rgba-g">
        <label>
          <input :value="colors.g" @input="greenChange" />
        </label>
        <p>G</p>
      </div>
      <div class="rgba-b">
        <label>
          <input :value="colors.b" @input="blueChange" />
        </label>
        <p>B</p>
      </div>
      <div class="rgba-a">
        <label>
          <input :value="colors.a" @input="alphaChange" />
        </label>
        <p>A</p>
      </div>
      <div class="textArea">
        <button class="copyButton" @click="copyColor('rgba')">复制</button>
        <button class="copyButton" @click="closeDialog()">关闭</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, reactive } from "vue";
import { hsvToRGB } from "./hsvToRGB.ts";
import { rgbaToHex, hexToRGBA } from "./rgbaToHex.ts";
const colors = reactive({
  r: 255,
  g: 0,
  b: 0,
  a: 1,
});
const rgb = computed(() => {
  return `rgb(${colors.r}, ${colors.g}, ${colors.b})`;
});
const rgba = computed(() => {
  return `rgba(${colors.r}, ${colors.g}, ${colors.b}, ${colors.a})`;
});
const hex = computed(() => {
  return rgbaToHex(colors.r, colors.g, colors.b, colors.a);
});
const emits = defineEmits(["setColor2", "closeDialog"]);
// 调色盘
const mainColorArea = ref();
// 颜色条
const hue_slider = ref();
// 透明度条
const alphaTiao = ref();

// 选色圆圈位置
let pointStyle = ref("top: 25%;left: 80%;");

// 滑块位置
let hueSliderStyle = ref("left: 0;");

// 透明度滑块位置
let alphaSliderStyle = ref("left: calc(100% - 6px);");

// 色调
let hue = ref(0);

// 饱和度和亮度
let saturation = ref(1);

// 亮度
let value = ref(1);

// hex输入框值变化
const hexChange = (e: any) => {
  let v = e.target.value.trim();
  const shorthandRegex =
    /^#?([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])?$/;
  const fullRegex =
    /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})?$/;

  if (shorthandRegex.test(v)) {
    let [, r, g, b, a] = v.match(shorthandRegex).map((c: string) => c + c);
    let rgba = hexToRGBA(`#${r}${g}${b}${a || ""}`);
    colors.r = rgba.r;
    colors.g = rgba.g;
    colors.b = rgba.b;
    colors.a = rgba.a || 1;
  } else if (fullRegex.test(v)) {
    let [, r, g, b, a] = v.match(fullRegex);
    let rgba = hexToRGBA(`#${r}${g}${b}${a || "ff"}`);
    colors.r = rgba.r;
    colors.g = rgba.g;
    colors.b = rgba.b;
    colors.a = rgba.a || 1;
  } else {
    // 如果输入的值不满足任何HEX颜色形式，不进行任何操作
    return;
  }
};

//RGBA输入框值变化
const redChange = (e: any) => {
  let v = e.target.value;
  if (v !== "") {
    v > 255 && (colors.r = 255);
    v < 0 && (colors.r = 0);
    v >= 0 && v <= 255 && (colors.r = parseInt(v));
  }
};

const greenChange = (e: any) => {
  let v = e.target.value;
  if (v !== "") {
    v > 255 && (colors.g = 255);
    v < 0 && (colors.g = 0);
    v >= 0 && v <= 255 && (colors.g = parseInt(v));
  }
};

const blueChange = (e: any) => {
  let v = e.target.value;
  if (v !== "") {
    v > 255 && (colors.b = 255);
    v < 0 && (colors.b = 0);
    v >= 0 && v <= 255 && (colors.b = parseInt(v));
  }
};

const alphaChange = (e: any) => {
  let v = e.target.value;
  if (v !== "") {
    v = parseFloat(v);
    colors.a = v;
    v > 1 && (colors.a = 1);
    v < 0 && (colors.a = 0);
    v >= 0 && v <= 1 && (colors.a = v);
  }
};

// 计算选中点的颜色值
function handleChangeColorPalette(e: any) {
  let w = mainColorArea.value.clientWidth;
  let h = mainColorArea.value.clientHeight;
  let x = e.pageX - mainColorArea.value.getBoundingClientRect().left;
  let y = e.pageY - mainColorArea.value.getBoundingClientRect().top;
  x = x < w && x > 0 ? x : x > w ? w : 0;
  y = y < h && y > 0 ? y : y > h ? h : 0;
  // 计算饱和度和亮度
  saturation.value = Math.floor((x / w) * 100 + 0.5) / 100;
  value.value = Math.floor((1 - y / h) * 100 + 0.5) / 100;
  // hsv转化为rgb
  let { r, g, b } = hsvToRGB(hue.value, saturation.value, value.value);
  colors.r = r;
  colors.g = g;
  colors.b = b;
  // 移动背景板圆圈
  pointStyle.value = `top: ${y}px;left: ${x}px;`;
}
//点击调色盘
function mousedownColorPalette(e: any) {
  // 鼠标按下计算饱和度和亮度并添加事件
  handleChangeColorPalette(e);
  // 添加整个页面的鼠标事件
  window.addEventListener("mousemove", handleChangeColorPalette);
  window.addEventListener("mouseup", mouseupColorPalette);
}
//移出调色盘监听
function mouseupColorPalette() {
  // 鼠标松开后移除事件;
  window.removeEventListener("mousemove", handleChangeColorPalette);
  window.removeEventListener("mouseup", mouseupColorPalette);
}

// 修改颜色条色调
const handleChangeHue = (e: any) => {
  let w = hue_slider.value.clientWidth;
  let x = e.pageX - mainColorArea.value.getBoundingClientRect().left;
  x = x < w && x > 0 ? x : x > w ? w : 0;
  // 计算色调
  hue.value = Math.floor((x / w) * 360 + 0.5);
  // hsv转化为rgb
  let { r, g, b } = hsvToRGB(hue.value, saturation.value, value.value);
  colors.r = r;
  colors.g = g;
  colors.b = b;
  // 移动滑块
  hueSliderStyle.value = `left: ${x >= w - 6 ? w - 6 : x}px;`;
};

//点击颜色条
const mousedownHue = (e: any) => {
  handleChangeHue(e);
  window.addEventListener("mousemove", handleChangeHue);
  window.addEventListener("mouseup", mouseupHue);
};

//取消颜色条监听
const mouseupHue = () => {
  window.removeEventListener("mousemove", handleChangeHue);
  window.removeEventListener("mouseup", mouseupHue);
};

// 透明度
const handleChangeAlpha = (e: any) => {
  let w = alphaTiao.value.clientWidth;
  let x = e.pageX - mainColorArea.value.getBoundingClientRect().left;
  x = x < w && x > 0 ? x : x > w ? w : 0;
  // 计算透明度
  colors.a = Math.floor((x / w) * 100 + 0.5) / 100;
  // 移动滑块
  alphaSliderStyle.value = `left: ${x >= w - 6 ? w - 6 : x}px;`;
};
// 点击透明度条
const mousedownAlpha = (e: any) => {
  handleChangeAlpha(e);
  window.addEventListener("mousemove", handleChangeAlpha);
  window.addEventListener("mouseup", mouseupAlpha);
};
//取消透明度条监听
const mouseupAlpha = () => {
  window.removeEventListener("mousemove", handleChangeAlpha);
  window.removeEventListener("mouseup", mouseupAlpha);
};

//复制颜色
const copyColor = async (mode: string) => {
  try {
    if (mode === "hex") {
      await navigator.clipboard.writeText(`${hex.value}`);
    } else {
      await navigator.clipboard.writeText(`${rgba.value}`);
    }
  } catch (err) {
    console.error("无法复制: ", err);
  }
};

// 关闭颜色选择
const closeDialog = () => {
  emits("closeDialog");
};

watch(
  () => colors.a,
  () => {
    // 移动透明度滑块
    alphaSliderStyle.value = `left: ${
      colors.a >= 1 ? "calc(100% - 6px)" : colors.a * 100 + "%"
    };`;
  }
);

watch(rgba, (newVal) => {
  emits("setColor2", newVal);
});
</script>
<style scoped>
.color-select {
  position: relative;
  user-select: none;
  width: 400px;
  height: auto;
  background: #fff;
  padding: 10px;
  overflow: auto;
  border-radius: 5px;

  /*border: 1px solid #ccc;*/
  /*border-radius: 10px;*/
}

/* 饱和度和亮度 */
.saturation-value {
  cursor: pointer;
  width: 100%;
  height: 200px;
  position: relative;
  margin-bottom: 10px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}

.saturation-value > div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 圆圈 */
.point {
  box-sizing: border-box;
  width: 6px;
  height: 6px;
  background-color: transparent;
  border: 2px solid #ccc;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 9;
}

.saturation-value-2 {
  background: linear-gradient(to right, white, #ffffff00);
}

.saturation-value-3 {
  background: linear-gradient(to top, black, #ffffff00);
}

/* 色调 透明度 */
.color-select-middle {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
}

.slider-item + .slider-item {
  margin-top: 6px;
}

/* 色调滑块条 */
.hue-slider {
  position: relative;
  height: 10px;
  background: linear-gradient(
    90deg,
    red 0,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    red
  );
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  width: 100%;
}

/* 透明度滑块条 */
.alpha-slider {
  position: relative;
  height: 10px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVRIiWM8fubkfwYygKWJOSM5+mCAhRLNoxaPWjxq8ajFoxbTyeL/DAfJ0Xjs3Cl7Siwmu4Yht1aDgZEYx6MWj1o8avGoxaMWD3qLya5X//4nqx6HAQC7RBGFzolqTAAAAABJRU5ErkJggg==");
  background-size: 10px 10px;
  width: 100%;
}

/* 滑块 */
.slider {
  position: absolute;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  width: 6px;
  height: 100%;
  background-color: #fff;
}

.color-slider {
  flex: auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

/* 颜色方块 */
.color-diamond {
  position: relative;
  margin-left: 5px;
  width: 26px;
  height: 26px;
  border-radius: 3px;
  overflow: hidden;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVRIiWM8fubkfwYygKWJOSM5+mCAhRLNoxaPWjxq8ajFoxbTyeL/DAfJ0Xjs3Cl7Siwmu4Yht1aDgZEYx6MWj1o8avGoxaMWD3qLya5X//4nqx6HAQC7RBGFzolqTAAAAABJRU5ErkJggg==");
  background-size: 10px 10px;
}

/* 颜色的值 hex rgba */
.color-value {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .textArea {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}

.color-value div {
  padding: 0 3px;
  text-align: center;
}

.color-value input {
  font-size: 12px;
  box-sizing: border-box;
  width: 34px;
  height: 24px;
  padding: 0;
  margin: 0;
  outline: none;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
}

.color-value p {
  font-size: 12px;
  margin: 3px 0 0;
}

.color-value .rgba-a {
  padding-right: 0;
}

.color-value .hex {
  flex: 1;
  padding-left: 0;
}

.color-value .hex input {
  width: 100%;
  height: 24px;
}

/* 预设颜色  */
.predefine {
  width: 100%;
  padding: 0;
  margin: 10px 0 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.predefine-item {
  width: 20px;
  height: 20px;
  margin-bottom: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.predefine-item + .predefine-item {
  margin-left: 6px;
}
.predefine-item:nth-child(12n) {
  margin-left: 0;
}
.color-actions {
  font-size: 12px;
  text-align: right;
}
.color-actions span {
  padding: 5px 12px;
  line-height: 12px;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid transparent;
}
.color-actions .cancel:hover {
  background-color: #f5f7fa;
}
.color-actions .confirm {
  border-color: #dcdfe6;
  border-radius: 4px;
  margin-left: 10px;
}
.color-actions .confirm:hover {
  color: #1677ff;
  border-color: #1677ff;
}

.copyButton {
  white-space: nowrap;
  font-size: 12px;
  padding: 5px 12px;
  line-height: 12px;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-color: #dcdfe6;
  border-radius: 4px;
  margin-left: 10px;

  cursor: pointer;
}
.copyButton:hover {
  color: #1677ff;
  border-color: #1677ff;
}
</style>
