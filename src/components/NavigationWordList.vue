<script lang="ts">
import { defineComponent, PropType } from "vue";
import WordListItem from './WordListItem.vue';
import { store } from "../store";

export default defineComponent({
  emits: ["updateCurrentWordList", "newWordSelected", "updatewordListHeader", "deleteWord"],
  data() {
    return {
      hidden: false,
      active: false,
      editMode: false,
      store
    };
  },
  props: {
    wordList: {type: Object as PropType<WordList>, required: true},
    wordListIndex: Number,
    isCurrentWordList: Boolean,
  },
  methods: {
    handleEditModeButton() {
      this.editMode = !this.editMode;
    },
    handlewordListHeaderContainerClick() {
      if (!this.editMode) {
        this.hidden = this.isCurrentWordList && !this.hidden;
        this.$emit('updateCurrentWordList', this.wordListIndex);
      }
    },
    handlewordListHeaderChange(newName: string) {
      this.$emit('updatewordListHeader', { newName, wordListIndex: this.wordListIndex })
      if (this.wordList) this.wordList.name = newName;
    },
  },
  computed: {
    open() {
      return this.isCurrentWordList && !this.hidden;
    }
  },
  watch: {
    editMode(newValue, oldValue) {
      if (newValue) {
        this.hidden = false;
      }
    },
    isCurrentWordList(newValue) {
      if (!newValue) this.editMode = false;
    }
  }
});
</script>

<template>
  <div 
  :class="
    {
      'word-list-container': true,
      'active-word-list-container': isCurrentWordList,
    }"
    >
    <wordListHeader
      :isCurrentWordList="isCurrentWordList"
      :wordListContents="wordList"
      :open="open"
      :wordListIsInEditMode="editMode"
      :wordListIndex="wordListIndex"
      @word-list-header-click="handlewordListHeaderContainerClick"
      @word-list-header-input="(incomingValue: string) => handlewordListHeaderChange(incomingValue)"
      @edit-button-click="handleEditModeButton"
    />
    <ul v-if="open" class="word-list">
      <WordListItem 
        v-for="(word, index) in wordList.words"
        :isActiveWordListItem="index === store.currentWordIndex"
        :wordListItemIndex="index"
        :wordText="word"
        :wordListIsInEditMode="editMode"
        @new-word-selected="(wordListItemIndex: number) => $emit('newWordSelected', wordListItemIndex)"
        @delete-word="(wordListItemIndex: number) => $emit('deleteWord', wordListItemIndex)"
      />
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

.word-list {
  margin: 0;
  padding-inline: 6px;
  list-style-type: none;
}

</style>
