<template>
  <div class="page">
    <!--取色器样式-->
    <div
      ref="page"
      class="colorBox"
      @click="ChangeDialog"
      style="position: relative"
    >
      <div class="colorBox2" :style="{ backgroundColor: color }">
        <svg
          t="1710587166726"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2758"
        >
          <path :d="pathJiantou" :fill="colorRe(color)" class="svgpath"></path>
        </svg>
      </div>
    </div>
  </div>
  <!--取色器子组件-->
  <teleport to="body">
    <getColorOne
      v-show="diaLogShow"
      @setColor2="setColor2"
      @close-dialog="closeDialog"
      ref="colorOne"
      class="getColor"
      :style="{
        left: pos.x + 'px',
        top: pos.y + 'px',
      }"
  /></teleport>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import getColorOne from "./colorPickerOne.vue";
import { colorRe } from "./colorRe.ts";
const page = ref();
const diaLogShow = ref(false);
const color = ref("");
const emits = defineEmits(["setColor"]);
const pos = reactive({
  x: 0,
  y: 0,
});
// 箭头路径
const pathJiantou = ref(
  "M512 657.28l377.6-377.6a40.32 40.32 0 0 1 58.24 0 41.6 41.6 0 0 1 0 58.24l-406.4 406.4a40.32 40.32 0 0 1-58.24 0L76.16 337.92A40.32 40.32 0 0 1 64 308.48a39.04 39.04 0 0 1 12.16-28.8 41.6 41.6 0 0 1 58.24 0z"
);
// 点击取色器
const ChangeDialog = () => {
  if (diaLogShow.value) {
    diaLogShow.value = false;
  } else {
    diaLogShow.value = true;
  }
  //修改箭头
  pathJiantou.value = diaLogShow.value
    ? "M960.1 699.7l-72.8 72.8L512 397.1 136.7 772.5l-72.8-72.8L512 251.5z"
    : "M512 657.28l377.6-377.6a40.32 40.32 0 0 1 58.24 0 41.6 41.6 0 0 1 0 58.24l-406.4 406.4a40.32 40.32 0 0 1-58.24 0L76.16 337.92A40.32 40.32 0 0 1 64 308.48a39.04 39.04 0 0 1 12.16-28.8 41.6 41.6 0 0 1 58.24 0z";

  getPos();
};
const setColor2 = (payload: string) => {
  color.value = payload;
};
const getPos = () => {
  // 获取屏幕宽高
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  // 获取div元素
  const myDiv = page.value;
  // 获取div元素的位置
  const rect = myDiv.getBoundingClientRect();
  const { left, top } = rect;
  if (left < 60) {
    pos.x = 0;
  } else if (screenWidth - left < 400) {
    pos.x = screenWidth - 440;
  } else {
    pos.x = left;
  }
  if (screenHeight - top < 400) {
    pos.y = screenHeight - 400;
  } else {
    pos.y = top + 70;
  }
};
// 关闭取色器
const closeDialog = () => {
  diaLogShow.value = false;
};
watch(color, (newVal) => {
  emits("setColor", newVal);
});
</script>
<style scoped>
.page {
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #292727;
  border-radius: 5px;
}
.colorBox {
  color: rgba(1, 1, 1, 1);
  width: 80%;
  height: 80%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVRIiWM8fubkfwYygKWJOSM5+mCAhRLNoxaPWjxq8ajFoxbTyeL/DAfJ0Xjs3Cl7Siwmu4Yht1aDgZEYx6MWj1o8avGoxaMWD3qLya5X//4nqx6HAQC7RBGFzolqTAAAAABJRU5ErkJggg==");
  cursor: pointer;
  transition: all 0.3s;
}
.colorBox2 {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.icon {
  transition: all 0.3s;
}
.svgpath {
  transition: all 0.3s;
}
.page:hover {
  border: 2px solid #292727;
}
.getColor {
  position: absolute;
}
</style>
