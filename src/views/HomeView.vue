<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

// 图片和路由映射
const images = [
  { src: "../static/cute.jpeg", route: "/cute", title: "可爱风" },
  { src: "../static/lovely.jpeg", route: "/lovely", title: "温柔风" },
  { src: "../static/sweet_girl.jpeg", route: "/sweet", title: "甜美女孩" },
  { src: "../static/tough_guy.jpeg", route: "/tough", title: "帅气男士" },
];

// 点击图片跳转
const goToPage = (route: string) => {
  router.push(route);
};
</script>

<template>

  <div>
    <h1 align="center">点击图片可以跳转到相应语音页面</h1>
    <br>
    <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
      <div v-for="(image, index) in images" :key="index" @click="goToPage(image.route)"
        style="cursor: pointer; text-align: center;">
        <img :src="image.src" :alt="image.title"
          style="width: 200px; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);" />
        <p style="margin-top: 8px; font-size: 14px; color: #555;">{{ image.title }}</p>
      </div>
    </div>
  </div>

</template>
