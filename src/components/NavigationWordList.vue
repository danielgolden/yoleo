<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["newWordSelected"],
  data() {
    return {
      open: true,
      active: false
    };
  },
  props: {
    allStateData: Array,
  },
});
</script>

<template>
  <div
    v-for="(wordList, wordListindex) in this.allStateData.wordLists"
    class="word-list-container"
  >
    <div
      :class="{
        'word-list-name-container': true,
        'active-word-list-name-container':
          this.allStateData.currentWordListIndex === wordListindex,
      }"
      @click="open = !open"
    >
      <h3
        :class="{
          'active-word-list-name':
            this.allStateData.currentWordListIndex === wordListindex,
          'word-list-name': true,
        }"
      >
        {{ wordList.name }}
      </h3>
      <button>Edit</button>
    </div>
    <ul v-if="open" class="word-list">
      <li
        v-for="(word, index) in wordList.words"
        :class="{
          'word-list-item': true,
          'active-word-list-item': index === this.allStateData.currentWordIndex,
        }"
        @click="$emit('newWordSelected', index)"
      >
        {{ word }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.primary-navigation {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 300px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 16px;
  background-color: rgba(0 0 0 / 8%);
}

.omni-input {
  border: none;
  box-shadow: 0 0 0 1px rgba(0 0 0 / 10%), inset 0 2px 0 rgba(0 0 0 / 2%);
  border-radius: 4px;
  padding: 10px 8px;
  width: 100%;
  font-size: 16px;
}

.word-list-item {
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  color: rgba(0 0 0 / 65%);
}
.active-word-list-item {
  color: blue;
  font-weight: 700;
}

.word-list-name-container {
  display: flex;
  justify-content: space-between;
}

.word-list-name {
  margin: 0;
  font-weight: 600;
  font-size: 16px;
}

.active-word-list-name-container {
  padding: 6px 8px;
  background-color: rgba(0 0 0 / 8%);
  color: #000;
  font-weight: 600;
  border-radius: 4px;
}

.word-list {
  margin: 0;
  padding-inline: 8px;
  padding: 0;
  list-style-type: none;
}
</style>
