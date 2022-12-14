<script lang="ts">
import { defineComponent } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";
import celebrationSound from '../assets/celebration-sound.mp3';

export default defineComponent({
  data() {
    return {
      windowSize: {
        width: 1000,
        height: 1000
      }
    };
  },
  mounted: function () {
    this.windowSize.width = window.innerWidth - 100;
    this.windowSize.height = window.innerHeight;

    const audio = new Audio(celebrationSound);
    audio.play();
  },
});
</script>

<template>
  <ConfettiExplosion :stageWidth="windowSize.width" :stageHeight="windowSize.height" />
</template>

<style scoped>
.confetti-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
