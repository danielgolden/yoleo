<script lang="ts">
import { defineComponent } from "vue";
import deleteIcon2 from '../assets/icon-delete-2.svg';

export default defineComponent({
  emits: ["newWordSelected", "deleteWord"],
  data() {
    return {
      deleteIcon2: deleteIcon2
    };
  },
  props: {
    isActiveWordListItem: {type: Boolean, required: true},
    wordListItemIndex: { type: Number, required: true },
    wordText: { type: String, required: true },
    wordListIsInEditMode: {type: Boolean, required: true}
  }
});
</script>

<template>
  <li
    :class="{
      'word-list-item': true,
      'active-word-list-item': isActiveWordListItem,
    }"
    @click="$emit('newWordSelected', wordListItemIndex)"
    :key="`${wordText}${wordListItemIndex}`"
  >
    <div class="word-list-item-and-indicator-container">
      <span class="word-state-indicator"></span>
      {{ wordText }}
    </div>
    <button
      v-if="wordListIsInEditMode"
      class="delete-word-button"
      @click.stop="$emit('deleteWord', wordListItemIndex)"
    >
      <img :src="deleteIcon2" alt="Delete icon">
    </button>
  </li>
</template>

<style scoped>
.word-list-item {
  height: 26px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 0 8px;
  border-radius: 4px;
  cursor: pointer;
  color: #646464;
  font-size: 14px;
}

.word-list-item:not(.active-word-list-item):hover {
  color: #5d5d5d;
}

.word-list-item:hover {
    background-color: #e7e7e7;
}

.word-list-item:not(.active-word-list-item):hover .word-state-indicator {
  background-color: rgba(0 0 0 / 12%);
}
.word-list-item-and-indicator-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.word-state-indicator {
  width: 5px;
  height: 5px;
  background-color: rgba(0 0 0 / 10%);
  border-radius: 50%;
}

.active-word-list-item .word-state-indicator {
  background-color: #216DDF;
}
.active-word-list-item {
  color: #216DDF;
  font-weight: 700;
  background-color: #e7e7e7;
}

.delete-word-button {
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  padding: 0;
}
</style>
