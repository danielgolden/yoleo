<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["updateActiveWord", 'newWordTriggered'],
  data() {
    return {
      wordListActive: false,
    };
  },
  props: {
    words: Array,
    currentWordIndex: Number
  },
  mounted: function () {
    window.addEventListener("keydown", (e) => {
      const slashWasPressed = e.key === "/";
      if (slashWasPressed) this.wordListActive = !this.wordListActive;
    });
  },
});
</script>

<template>
  <div v-if="wordListActive" class="word-listing">
    <ul class="word-list">
      <li><button @click="$emit('newWordTriggered')">+</button></li>
      <li 
        v-for="(word, index) in words" 
        :class="{'word-list-item': true, 'active-word-list-item': index === currentWordIndex}" 
        @click="$emit('updateActiveWord', index)"
      >{{ word }}</li>
    </ul>
  </div>
</template>

<style scoped>
button {
  margin-right: 12px;
  background-color: rgba(0 80 250 / 80%);
  font-weight: 500;
  font-size: 24px;
  width: 32px;
  height: 32px;
  border: none;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}
.word-listing {
  padding: 8px 24px 2px;
  border-top: 1px solid rgba(0 0 0 / 10%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow-x: auto;
  background-color: #fff;
}
.word-list {
  display: flex;
  gap: 8px;
  padding: 0;
  align-items: center;
  list-style-type: none;
}

.word-list-item {
  padding: 2px 8px 4px;
  border-radius: 4px;
  cursor: pointer;
  color: rgba(0 0 0 / 65%);
}
.active-word-list-item {
  background-color: rgba(0 0 0 / 10%);
  text-decoration: underline;
  color: #000;
  font-weight: 700;
}
</style>
