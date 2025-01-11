<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SpeechSynthesis from '../components/SpeechSynthesis.vue'; // 导入语音合成组件

let audioChunks: Blob[] = [];
let mediaRecorder: MediaRecorder | null = null;
const pureColor = ref('#FF66B2');  // 默认纯色

const recording = ref(false);  // 录音状态
const isSending = ref(false);   // 发送音频状态
const transcript = ref('');     // 显示的识别结果
const robotReply = ref('');     // 显示机器人的回复
const userId = ref(''); // 用户ID
const responseText = ref(''); // 接口返回的文本内容

// 语音播报函数
const playSpeech = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 1;
  utterance.rate = 1;
  window.speechSynthesis.speak(utterance);
};


// 页面加载时播报欢迎语
onMounted(() => {
  const timestamp = new Date().getTime();  // 获取当前时间戳
  playSpeech("猛男正在与你聊天！");
  userId.value = `default_user_${timestamp}`;
});

// 启动或停止录音
const toggleRecording = () => {
  if (recording.value) {
    mediaRecorder?.stop();  // 停止录音
  } else {
    startRecording();  // 开始录音
  }
};

// 开始录音
const startRecording = () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      audioChunks = [];  // 清空音频数据

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);  // 收集音频数据
      };

      mediaRecorder.onstop = () => {
        recording.value = false;
        isSending.value = true;
        sendAudio();  // 自动调用后台接口
      };

      recording.value = true;
    })
    .catch((error) => {
      console.error('获取麦克风权限失败', error);
    });
};


// 发送音频数据到后端
const sendAudio = () => {
  const formData = new FormData();
  const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
  isSending.value = false; // 恢复按钮状态

  formData.append('user_id', userId.value); // 添加用户 ID
  formData.append('audio', audioBlob, 'recording.wav'); // 添加音频文件
  formData.append('scene', 'tough_guy')

  fetch('http://127.0.0.1:5000/dialogue', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('上传失败');
      }
      return response.json();
    })
    .then(data => {
      // 解析后端返回的数据

      transcript.value = `识别结果: ${data.transcript}`;
      robotReply.value = `机器人回复: ${data.reply}`;
      responseText.value = data.reply;  // 设置返回的机器人回复文本

      playSpeech(data.reply)
    })
    .catch((error) => {
      console.error('请求失败:', error);
      transcript.value = '请求失败，请检查后端服务！';
    });
};
</script>

<template>
  <div>
    <h1 :style="{ color: pureColor }">
      <Chrome v-model="pureColor" />
      猛男正在与你聊天
    </h1>


    <!-- 用户输入ID -->
    <input :style="{ color: pureColor }" v-model="userId" type="text" placeholder="请输入用户 ID" />

    <!-- 录音按钮 -->
    <button :style="{ color: pureColor }" @click="toggleRecording">
      {{ recording ? '停止录音' : '开始录音' }}
    </button>

    <!-- 显示识别结果 -->
    <div v-if="transcript">
      <p>{{ transcript }}</p>
    </div>

    <!-- 显示机器人的回复 -->
    <div v-if="robotReply">
      <p>{{ robotReply }}</p>
    </div>

    <!-- 语音合成播放 -->
    <SpeechSynthesis :text="responseText" :rate="1" :pitch="1" :selectedVoice="null" />
  </div>
</template>

<style scoped>
/* 添加页面样式 */
button {
  padding: 10px 15px;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
}

input {
  padding: 8px;
  font-size: 16px;
  margin: 10px;
  width: 100%;
  max-width: 300px;
}
</style>
