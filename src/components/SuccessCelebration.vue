<script lang="ts">
import { defineComponent } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";
import celebrationSound from "../assets/celebration-sound.mp3";
import { store } from "../store";

export default defineComponent({
  data() {
    return {
      windowSize: {
        width: 1000,
        height: 1000
      },
      confettiActive: false,
      celebrationAudio: new Audio(celebrationSound),
    };
  },
  methods: {
    playCelebrationAudio() {
      this.celebrationAudio.play();
    }
  },
  mounted: function () {
    this.celebrationAudio.preload;
    this.windowSize.width = window.innerWidth - 100;
    this.windowSize.height = window.innerHeight;

    setTimeout(() => {
      this.confettiActive = true;
    }, 100)
  },
  watch: {
    confettiActive(newValue, oldValue) {
      if (newValue && store.gameSettings.audio) this.playCelebrationAudio();
    }
  }
});
</script>

<template>
  <div class="confetti-explosion-container">
    <ConfettiExplosion v-if="confettiActive" :stageWidth="windowSize.width" :stageHeight="windowSize.height" />
  </div>
</template>

<style>
  .confetti-explosion-container {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }

  .confetti-container {
    translate: 0 -100px;
  }
</style>
