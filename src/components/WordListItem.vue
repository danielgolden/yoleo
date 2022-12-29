<script lang="ts">
import { defineComponent } from "vue";
import deleteIcon2 from "../assets/icon-delete-2.svg";

export default defineComponent({
  emits: ["newWordSelected", "deleteWord"],
  data() {
    return {
      deleteIcon2: deleteIcon2,
    };
  },
  props: {
    isActiveWordListItem: { type: Boolean, required: true },
    wordListItemIndex: { type: Number, required: true },
    wordText: { type: String, required: true },
    wordListIsInEditMode: { type: Boolean, required: true },
  },
});
</script>

<template>
  <li
    :class="{
      'word-list-item': true,
      'active-word-list-item': isActiveWordListItem,
      'word-list-is-in-edit-mode': wordListIsInEditMode,
    }"
    @click="
      !wordListIsInEditMode && $emit('newWordSelected', wordListItemIndex)
    "
    :key="`${wordText}${wordListItemIndex}`"
  >
    <div class="word-list-item-and-indicator-container">
      <button
        v-if="wordListIsInEditMode"
        class="delete-word-button"
        @click.stop="$emit('deleteWord', wordListItemIndex)"
      >
        <img :src="deleteIcon2" alt="Delete icon" />
      </button>
      <span v-if="!wordListIsInEditMode" class="word-state-indicator"></span>
      {{ wordText }}
    </div>
    <div class="word-edit-controls">
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

.word-list-is-in-edit-mode {
  padding-right: 0;
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

.word-list-is-in-edit-mode .word-list-item-and-indicator-container {
  gap: 10px;
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
  height: 100%;
  padding: 4px 12px 4px 8px;
  display: grid;
  place-items: center;
  cursor: grab;
}

.drag-handle:active {
  display: grid;
  place-items: center;
  cursor: grabbing;
}

@media (max-width: 1400px) {
  .word-list-item {
    height: 40px;
    padding: 0 10px;
    border-radius: 0;
    box-shadow: 0 11px 0 -10px var(--color-border-tertiary);
    font-size: 16px;
  }

  .word-list-is-in-edit-mode {
    padding-right: 2px;
  }

  .drag-handle {
    padding-inline: 12px;
  }

  .word-list-item:last-child {
    box-shadow: none;
  }

  .word-list-item:has(+ .word-list-item:hover) {
    box-shadow: none;
  }

  .word-list-item:hover {
    border-radius: 4px;
    box-shadow: none;
  }

  .sortable-chosen .drag-handle,
  .sortable-ghost .drag-handle {
    padding-inline: 12px;
  }

  .word-list-is-in-edit-mode .word-list-item-and-indicator-container {
    gap: 12px;
  }
}
</style>
