<script lang="ts">
import { defineComponent } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";

export default defineComponent({
  data() {
    return {
      windowSize: {
        width: 1000,
        height: 1000
      },
      confettiActive: false
    };
  },
  props: {
    celebrationAudio: { type: HTMLAudioElement, required: true }
  },
  mounted: function () {
    this.celebrationAudio.play();
    this.windowSize.width = window.innerWidth - 100;
    this.windowSize.height = window.innerHeight;

    setTimeout(() => {
      this.confettiActive = true;
    }, 100)
  },
});
</script>

<template>
  <ConfettiExplosion v-if="confettiActive" :stageWidth="windowSize.width" :stageHeight="windowSize.height" />
</template>

<style scoped>
.confetti-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
