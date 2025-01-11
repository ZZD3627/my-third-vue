<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";

// 接收父组件传递的文本、语速、音调、语音信息
const props = defineProps({
  text: String,
  rate: {
    type: Number,
    default: 1,
  },
  pitch: {
    type: Number,
    default: 1,
  },
  selectedVoice: {
    type: Object as () => SpeechSynthesisVoice | null,
    default: null,
  },
});

// 初始化语音状态
const voices = ref<SpeechSynthesisVoice[]>([]);  // 存储所有可用的语音

// 获取可用的语音列表
const loadVoices = () => {
  if ("speechSynthesis" in window) {
    voices.value = speechSynthesis.getVoices();
  }
};

// 监听语音列表的变化
onMounted(() => {
  loadVoices();

  if ("speechSynthesis" in window) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }
});

// 播放语音的函数
const playSpeech = () => {
  if ("speechSynthesis" in window && props.text.trim() !== "") {
    const utterance = new SpeechSynthesisUtterance(props.text);
    utterance.rate = props.rate;
    utterance.pitch = props.pitch;
    utterance.voice = props.selectedVoice || voices.value[0];
    speechSynthesis.speak(utterance);
  }
};

// 当文本变化时自动播放语音
if (props.text) {
  playSpeech();
}
</script>

<template>
  <div v-if="props.text" class="speech-synthesizer">
    <!-- 播放语音按钮 -->
    <button @click="playSpeech">播放语音</button>
  </div>
</template>

<style scoped>
.speech-synthesizer {
  padding: 20px;
  text-align: center;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
}
</style>
