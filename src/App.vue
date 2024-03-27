<template>
  <div class="page" :style="{ backgroundColor: color }">
    <colorPickerIndex
      @set-color="setColor"
      style="width: 70px; height: 70px; flex: 1"
    />
  </div>
</template>
<script setup lang="ts">
import colorPickerIndex from "./components/colorPickerIndex.vue";
import { ref } from "vue";
const color = ref("#000000");
const setColor = (payload: string) => {
  color.value = payload;
};
</script>
<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #3e3030;
}
</style>
