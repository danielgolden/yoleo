<script lang="ts">
import { defineComponent, PropType } from "vue";
import Menu from "./Menu.vue";
import Icon from "./Icon.vue";
import { store } from "../store";

export default defineComponent({
  data() {
    return {
      contextMenuActive: false,
      menuItems: [
        {
          label: "Edit",
          icon: "edit",
          onClick: () => this.$emit("editButtonClick"),
          destructive: false,
        },
        ...(store.wordLists.length > 1
          ? [
              {
                label: "Delete",
                icon: "delete",
                onClick: this.deleteGroup,
                destructive: true,
              },
            ]
          : []),
      ],
      store,
      wordListName: this.wordListContents.name,
    };
  },
  emits: ["wordListHeaderClick", "wordListHeaderInput", "editButtonClick"],
  props: {
    isCurrentWordList: { type: Boolean, required: true },
    wordListContents: { type: Object as PropType<WordList>, required: true },
    wordListIsInEditMode: { type: Boolean, required: true },
    open: { type: Boolean, required: true },
    wordListIndex: { type: Number, required: true },
  },
  methods: {
    handleMenuTrigger() {
      this.contextMenuActive = true;
    },
    closeMenu() {
      this.contextMenuActive = false;
    },
    deleteGroup() {
      const confirmDelete = confirm(
        `Delete the "${
          this.store.wordLists[this.wordListIndex].name
        }" word group?`
      );

      if (confirmDelete) {
        this.store.wordLists.splice(this.wordListIndex, 1);
        this.store.currentWordListReviewUnit.words.splice(
          this.wordListIndex,
          1
        );
        this.store.currentWordListIndex = 0;
        this.store.currentWordIndex = 0;
      }
    },
  },
  updated: function () {
    if (this.store.newWordListRecentlyAdded && this.wordListIsInEditMode) {
      (this.$refs.headerNameInput as HTMLInputElement).focus();
    }
  },
});
</script>

<template>
  <div
    :class="{
      'word-list-name-container': true,
      'active-word-list-name-container': isCurrentWordList,
      'is-in-edit-mode': wordListIsInEditMode,
    }"
    @click="$emit('wordListHeaderClick')"
    @contextmenu.prevent="handleMenuTrigger"
  >
    <Menu
      v-if="contextMenuActive"
      classes="word-list-header-menu"
      :items="menuItems"
      v-click-away="closeMenu"
      @close-menu="closeMenu"
    />
    <h3
      :class="{
        'active-word-list-name': isCurrentWordList,
        'word-list-name': true,
      }"
    >
      <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="word-list-name-header-icon"
      >
        <path
          v-if="open"
          d="M0.512563 0.51256C0.840752 0.18437 1.28587 0 1.75 0H5.25C5.8 0 6.32 0.26 6.65 0.7L7.55 1.9C7.57329 1.93105 7.60348 1.95625 7.6382 1.97361C7.67291 1.99096 7.71119 2 7.75 2H13C13.5523 2 14 2.44772 14 3V3.5H2.75C2.33579 3.5 2 3.83579 2 4.25C2 4.66421 2.33579 5 2.75 5H14.7284C15.327 5 15.7915 5.52235 15.7215 6.11684L15 12.25C15 12.7141 14.8156 13.1592 14.4874 13.4874C14.1592 13.8156 13.7141 14 13.25 14H1.75C0.784 14 0 13.216 0 12.25V1.75C0 1.28587 0.184374 0.84075 0.512563 0.51256Z"
          fill="var(--color-icon-interactive-inverted)"
        />
        <path
          v-if="!open"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.75 0C1.28587 0 0.840752 0.18437 0.512563 0.51256C0.184374 0.84075 0 1.28587 0 1.75V12.25C0 13.216 0.784 14 1.75 14H14.25C14.7141 14 15.1592 13.8156 15.4874 13.4874C15.8156 13.1592 16 12.7141 16 12.25V3.75C16 3.28587 15.8156 2.84075 15.4874 2.51256C15.1592 2.18437 14.7141 2 14.25 2H7.75C7.71119 2 7.67291 1.99096 7.6382 1.97361C7.60348 1.95625 7.57329 1.93105 7.55 1.9L6.65 0.7C6.32 0.26 5.8 0 5.25 0H1.75Z"
          :fill="
            isCurrentWordList
              ? 'var(--color-icon-interactive-inverted)'
              : 'var(--color-icon-tertiary)'
          "
        />
      </svg>
      <input
        type="text"
        v-show="wordListIsInEditMode"
        v-model="wordListName"
        class="header-name-edit-input"
        @input="$emit('wordListHeaderInput', wordListName)"
        @keydown.enter="$emit('editButtonClick')"
        ref="headerNameInput"
      />
      <span
        :class="{
          'word-list-name-text': true,
          'word-list-name-text-editable': wordListIsInEditMode,
        }"
      >
        {{ wordListContents && wordListContents.name }}
      </span>
    </h3>
    <button
      v-if="isCurrentWordList || wordListIsInEditMode"
      @click.stop="$emit('editButtonClick')"
      class="edit-button"
    >
      <Icon
        v-if="!wordListIsInEditMode"
        name="edit"
        color="var(--color-icon-interactive-inverted)"
      />
      <Icon
        v-if="wordListIsInEditMode"
        name="check"
        :color="
          isCurrentWordList
            ? 'var(--color-icon-interactive-inverted)'
            : 'var(--color-icon-primary)'
        "
      />
    </button>
  </div>
</template>

<style scoped>
.word-list-name-container {
  display: flex;
  height: 33px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.word-list-name-container:not(.active-word-list-name-container):hover,
.is-in-edit-mode:not(.active-word-list-name-container) {
  background-color: var(--color-bg-interactive-hover);
}

.word-list-name {
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 600;
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  color: var(--color-text-primary);
}

.active-word-list-name-container {
  background-color: var(--color-bg-interactive-active);
}

.active-word-list-name-container .word-list-name {
  color: var(--color-text-interactive-inverted);
  font-weight: 600;
}

.edit-button {
  position: relative;
  left: 2px;
  bottom: 0.5px;
  display: grid;
  place-items: center;
  border: none;
  background-color: transparent;
}

.is-in-edit-mode .edit-button {
  opacity: 0.8;
}

.is-in-edit-mode .edit-button:hover {
  opacity: 1;
}

.word-list-header-menu {
  position: absolute;
  top: 40px;
  right: 0;
}

.header-name-edit-input {
  position: absolute;
  top: 6px;
  left: 32px;
  font-weight: 500;
  padding: 2px 4px;
  font-size: 14px;
  border: none;
  color: var(--color-text-primary);
  border-radius: 2.5px;
}

.active-word-list-name-container .header-name-edit-input {
  font-weight: 600;
  color: var(--color-text-interactive-inverted);
  background-color: var(--color-bg-input-interactive-enabled);
}

@media (max-width: 1400px) {
  .word-list-name-container {
    height: 40px;
  }

  .word-list-name {
    gap: 10px;
    font-size: 16px;
  }

  .header-name-edit-input {
    max-width: 71%;
    font-size: 16px;
    top: 9px;
    padding: 2px 6px;
  }
}
</style>
