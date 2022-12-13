<script>
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ["newWordTriggered"],
  data() {
    return {
      wordListActive: false
    }
  },
  props: {
    words: Array
  },
  mounted: function () {
    window.addEventListener('keydown', (e) => {
      const slashWasPressed = e.key === '/'
      if (slashWasPressed) this.wordListActive = !this.wordListActive;
    })
  },
})
</script>


<template>
  <div v-if="wordListActive" class="word-listing">
    <ul class="word-list">
      <li><button @click="$emit('newWordTriggered')">+</button></li>
      <li v-for="word in this.words" class="word-list-item">{{word}}</li>
    </ul>
  </div>
</template>

<style scoped>
.word-listing {
  padding: 8px 24px 2px;
  border-top: 1px solid rgba(0 0 0 / 10%);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.word-list {
  display: flex;
  gap: 16px;
  padding: 0;
  list-style-type: none;
}
</style>
