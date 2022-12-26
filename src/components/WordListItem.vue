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
    @click="!wordListIsInEditMode && $emit('newWordSelected', wordListItemIndex)"
    :key="`${wordText}${wordListItemIndex}`"
  >
    <div class="word-list-item-and-indicator-container">
      <span class="word-state-indicator"></span>
      {{ wordText }}
    </div>
    <div class="word-edit-controls">
      <button
        v-if="wordListIsInEditMode"
        class="delete-word-button"
        @click.stop="$emit('deleteWord', wordListItemIndex)"
      >
        <img :src="deleteIcon2" alt="Delete icon">
      </button>
      <span class="drag-handle" v-if="wordListIsInEditMode">
        <Icon name="dragHandle" color="var(--color-icon-tertiary)" />
      </span>
    </div>
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
  color: var(--color-text-secondary);
  font-size: 14px;
}

.word-list-item:not(.active-word-list-item):hover {
  color: var(--color-text-primary);
}

.word-list-item:hover {
  background-color: var(--color-bg-interactive-hover);
}

.word-list-item:not(.active-word-list-item):hover .word-state-indicator {
  background-color: var(--color-bg-indicator-inactive-hover);
}
.word-list-item-and-indicator-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.word-state-indicator {
  width: 5px;
  height: 5px;
  background-color: var(--color-bg-indicator-inactive);
  border-radius: 50%;
}

.active-word-list-item .word-state-indicator {
  background-color: var(--color-bg-indicator-active);
}
.active-word-list-item {
  color: var(--color-text-interactive);
  font-weight: 700;
  /* background-color: var(--color-bg-interactive-hover); */
}

.delete-word-button {
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  padding: 0;
}

.word-edit-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.drag-handle {
  padding: 4px;
  display: grid;
  place-items: center;
  cursor: grab;
}

.drag-handle:active {
  padding: 4px;
  display: grid;
  place-items: center;
  cursor: grabbing;
}
</style>
