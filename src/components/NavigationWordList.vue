<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["newWordSelected", "deleteWord", "updateCurrentWordList", "updateWordListName"],
  data() {
    return {
      hidden: false,
      active: false,
      editMode: false,
    };
  },
  props: {
    wordList: Object,
    wordListIndex: Number,
    currentWordListIndex: Number,
    currentWordIndex: Number,
    isCurrentWordList: Boolean,
  },
  methods: {
    handleEditModeButton() {
      this.editMode = !this.editMode;
    },
    handleWordListNameContainerClick() {
      if (!this.editMode) {
        this.hidden = !this.hidden;
        this.$emit('updateCurrentWordList', this.wordListIndex);
      }
    },
    handleWordListNameChange(newName) {
      this.$emit('updateWordListName', { newName, wordListIndex: this.wordListIndex })
      this.wordList.name = newName;
    },
  },
  computed: {
    open() {
      return this.isCurrentWordList && !this.hidden;
    }
  }
});
</script>

<template>
  <div :class="{ 'word-list-container': true, 'active-word-list-container':
          isCurrentWordList,}">
    <div
      :class="{
        'word-list-name-container': true,
        'active-word-list-name-container':
          isCurrentWordList,
      }"
      @click="handleWordListNameContainerClick"
    >
      <h3
        :class="{
          'active-word-list-name':
            isCurrentWordList,
          'word-list-name': true,
        }"
        :contenteditable="editMode"
        @input="(e) => handleWordListNameChange((e.target as HTMLInputElement).innerText)"
        @keydown.enter="(e) => (e.target as HTMLInputElement).blur()"
      >
        <svg  width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="word-list-name-header-icon">
          <path v-if="open" d="M0.512563 0.51256C0.840752 0.18437 1.28587 0 1.75 0H5.25C5.8 0 6.32 0.26 6.65 0.7L7.55 1.9C7.57329 1.93105 7.60348 1.95625 7.6382 1.97361C7.67291 1.99096 7.71119 2 7.75 2H13C13.5523 2 14 2.44772 14 3V3.5H2.75C2.33579 3.5 2 3.83579 2 4.25C2 4.66421 2.33579 5 2.75 5H14.7284C15.327 5 15.7915 5.52235 15.7215 6.11684L15 12.25C15 12.7141 14.8156 13.1592 14.4874 13.4874C14.1592 13.8156 13.7141 14 13.25 14H1.75C0.784 14 0 13.216 0 12.25V1.75C0 1.28587 0.184374 0.84075 0.512563 0.51256Z" fill="#9FC7F8"/>
          <path v-if="!open" fill-rule="evenodd" clip-rule="evenodd" d="M1.75 0C1.28587 0 0.840752 0.18437 0.512563 0.51256C0.184374 0.84075 0 1.28587 0 1.75V12.25C0 13.216 0.784 14 1.75 14H14.25C14.7141 14 15.1592 13.8156 15.4874 13.4874C15.8156 13.1592 16 12.7141 16 12.25V3.75C16 3.28587 15.8156 2.84075 15.4874 2.51256C15.1592 2.18437 14.7141 2 14.25 2H7.75C7.71119 2 7.67291 1.99096 7.6382 1.97361C7.60348 1.95625 7.57329 1.93105 7.55 1.9L6.65 0.7C6.32 0.26 5.8 0 5.25 0H1.75Z" :fill="isCurrentWordList ? '#9FC7F8' : '#BDC1C5'"/>
        </svg>

        {{ this.wordList.name }}
      </h3>
      <button
        v-if="isCurrentWordList"
        @click.stop="handleEditModeButton"
        class="edit-button"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0126 1.42678C10.696 0.743359 11.804 0.743361 12.4874 1.42678L13.5732 2.51257C14.2566 3.19598 14.2566 4.30402 13.5732 4.98744L4.96355 13.5971C4.75325 13.8074 4.49283 13.9606 4.20687 14.0423L0.956032 14.9711C0.694132 15.046 0.412262 14.9729 0.219662 14.7803C0.027062 14.5877 -0.0459811 14.3059 0.0288419 14.044L0.957662 10.7931C1.03936 10.5072 1.19259 10.2467 1.40289 10.0364L10.0126 1.42678ZM11.4268 2.48744C11.3291 2.38981 11.1708 2.38981 11.0732 2.48744L9.8106 3.75L11.25 5.18934L12.5126 3.92678C12.6102 3.82915 12.6102 3.67086 12.5126 3.57323L11.4268 2.48744ZM10.1893 6.25L8.74999 4.81066L2.46355 11.0971C2.43351 11.1271 2.41162 11.1643 2.39994 11.2052L1.842 13.158L3.79479 12.6C3.83564 12.5884 3.87284 12.5665 3.90289 12.5364L10.1893 6.25Z" fill="#9FC7F8"/>
        </svg>

      </button>
    </div>
    <ul v-if="open" class="word-list">
      <li
        v-for="(word, index) in this.wordList.words"
        :class="{
          'word-list-item': true,
          'active-word-list-item': index === this.currentWordIndex,
        }"
        @click="$emit('newWordSelected', index)"
      >
        <div class="word-list-item-and-indicator-container">
          <span class="word-state-indicator"></span>
          {{ word }}
        </div>
        <button
          v-if="this.editMode"
          class="delete-word-button"
          @click.stop="$emit('deleteWord', index)"
        >
          -
        </button>
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
  display: flex;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  color: #646464;
  font-size: 14px;
}

.word-list-item-and-indicator-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.word-state-indicator {
  width: 5px;
  height: 5px;
  background-color: #D9D9D9;
  border-radius: 50%;
}

.active-word-list-item .word-state-indicator {
  background-color: #216DDF;
}
.active-word-list-item {
  color: #216DDF;
  font-weight: 700;
}

.word-list-name-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.word-list-name {
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 600;
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  color: #575757;
}

.word-list-name-container {
  padding: 6px 12px;
  height: 33px;
  cursor: pointer;
}
.active-word-list-name-container {
  padding: 6px 12px;
  background-color: #216DDF;
  border-radius: 6px;
}

.active-word-list-name-container .word-list-name {
  color: #fff;
  font-weight: 600;
}

.word-list {
  margin: 0;
  padding-inline: 6px;
  list-style-type: none;
}

.delete-word-button {
  border-radius: 50%;
  border: none;
  background-color: red;
  width: 19px;
  height: 19px;
  color: #fff;
  font-weight: 700;
}

.edit-button {
  position: relative;
  left: 2px;
  bottom: .5px;
  display: grid;
  place-items: center;
  border: none;
  background-color: transparent;
}
</style>
