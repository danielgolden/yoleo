<script>
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["newWordTriggered"],
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
        v-for="(word, index) in this.words" 
        :class="{'word-list-item': true, 'active-word-list-item': index === this.currentWordIndex}" 
        @click="$emit('updateActiveWord', index)"
      >{{ word }}</li>
    </ul>
  </div>
</template>

<style scoped>
button {
  margin-right: 12px;
}
.word-listing {
  padding: 8px 24px 2px;
  border-top: 1px solid rgba(0 0 0 / 10%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow-x: scroll;
}
.word-list {
  display: flex;
  gap: 8px;
  padding: 0;
  align-items: center;
  list-style-type: none;
}

.word-list-item {
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
}
.active-word-list-item {
  background-color: rgba(0 0 0 / 80%);
  color: #fff;
}
</style>
