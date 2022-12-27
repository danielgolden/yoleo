<script lang="ts">
import { defineComponent, PropType } from "vue";
import NavigationWordList from "./NavigationWordList.vue";
import draggable from 'vuedraggable'
import { store } from '../store';
import Settings from "./Settings.vue";

export default defineComponent({
  emits: ["newWordSelected", "newWordAdded", "case-changed", "delete-word", "create-new-word-list"],
  data() {
    return {
      primaryNavigationActive: true,
      omniInputValue: "",
      store,
      drag: false,
    };
  },
  methods: {
    submitNewWord() {
      if (this.omniInputValue !== '') {
        this.$emit("newWordAdded", this.omniInputValue);
        this.omniInputValue = "";
      }
    },
    handleNewWordListClick() {
      this.$emit('create-new-word-list');
    },
    handleDragEndEvent(e: VueDraggableEvent) {
      const activeItemIsBeingDragged = e.oldIndex === store.currentWordListIndex
      if (activeItemIsBeingDragged) store.currentWordListIndex = e.newIndex
      this.drag = false
    }
  },
  watch: {
    'store.mainMenuOpen'(newValue) {
      const omniInput = (this.$refs.omniInput as HTMLElement);
        if (newValue) {
          setTimeout(() => {
            omniInput.focus();
          }, 100)
        }

        if (!newValue) {
          this.omniInputValue = '';
          omniInput.blur();
        }
    }
  },
  components: {
    draggable,
  },
});
</script>

<template>
  <section v-if="primaryNavigationActive" :class="{'primary-navigation': true, 'open': store.mainMenuOpen}">
    <button class="menu-button" @click="store.mainMenuOpen = !store.mainMenuOpen">
      <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.75C0 0.55109 0.0790201 0.36032 0.21967 0.21967C0.36032 0.0790201 0.55109 0 0.75 0H13.25C13.4489 0 13.6397 0.0790201 13.7803 0.21967C13.921 0.36032 14 0.55109 14 0.75C14 0.94891 13.921 1.13968 13.7803 1.28033C13.6397 1.42098 13.4489 1.5 13.25 1.5H0.75C0.55109 1.5 0.36032 1.42098 0.21967 1.28033C0.0790201 1.13968 0 0.94891 0 0.75ZM0 5.75C0 5.55109 0.0790201 5.36032 0.21967 5.21967C0.36032 5.07902 0.55109 5 0.75 5H13.25C13.4489 5 13.6397 5.07902 13.7803 5.21967C13.921 5.36032 14 5.55109 14 5.75C14 5.94891 13.921 6.13968 13.7803 6.28033C13.6397 6.42098 13.4489 6.5 13.25 6.5H0.75C0.55109 6.5 0.36032 6.42098 0.21967 6.28033C0.0790201 6.13968 0 5.94891 0 5.75ZM0.75 10C0.55109 10 0.36032 10.079 0.21967 10.2197C0.0790201 10.3603 0 10.5511 0 10.75C0 10.9489 0.0790201 11.1397 0.21967 11.2803C0.36032 11.421 0.55109 11.5 0.75 11.5H13.25C13.4489 11.5 13.6397 11.421 13.7803 11.2803C13.921 11.1397 14 10.9489 14 10.75C14 10.5511 13.921 10.3603 13.7803 10.2197C13.6397 10.079 13.4489 10 13.25 10H0.75Z" fill="var(--color-icon-primary)"/>
      </svg>
    </button>
    <input
      v-model="omniInputValue"
      type="text"
      class="omni-input"
      placeholder="Add a new word..."
      @keydown.enter="submitNewWord()"
      ref="omniInput"
    />
    <hr>
    <nav class="word-lists" data-testid="wordLists">
      <draggable 
        v-model="store.wordLists" 
        @start="drag=true" 
        @end="handleDragEndEvent" 
        item-key="id">
        <template #item="{element, index}">
          <NavigationWordList
            :key="index"
            :wordList="element"
            :wordListIndex="index"
            :isCurrentWordList="index === store.currentWordListIndex"
            @new-word-selected="(incomingWordIndex: number) => $emit('newWordSelected', incomingWordIndex)"
            @delete-word="(wordIndex: number) => $emit('delete-word', wordIndex)"
            v-bind="$attrs"
          />
        </template>
      </draggable>
    </nav>
    <footer class="navigation-footer">
      <button class="new-group-button" @click="handleNewWordListClick">
        <svg class="new-group-button-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.75 0C5.94891 0 6.13968 0.0790201 6.28033 0.21967C6.42098 0.36032 6.5 0.55109 6.5 0.75V5H10.75C10.9489 5 11.1397 5.07902 11.2803 5.21967C11.421 5.36032 11.5 5.55109 11.5 5.75C11.5 5.94891 11.421 6.13968 11.2803 6.28033C11.1397 6.42098 10.9489 6.5 10.75 6.5H6.5V10.75C6.5 10.9489 6.42098 11.1397 6.28033 11.2803C6.13968 11.421 5.94891 11.5 5.75 11.5C5.55109 11.5 5.36032 11.421 5.21967 11.2803C5.07902 11.1397 5 10.9489 5 10.75V6.5H0.75C0.55109 6.5 0.36032 6.42098 0.21967 6.28033C0.0790201 6.13968 0 5.94891 0 5.75C0 5.55109 0.0790201 5.36032 0.21967 5.21967C0.36032 5.07902 0.55109 5 0.75 5H5V0.75C5 0.55109 5.07902 0.36032 5.21967 0.21967C5.36032 0.0790201 5.55109 0 5.75 0Z" fill="var(--color-icon-secondary)"/>
        </svg>
        New group
      </button>
      <Settings
        @case-changed="(newValue: string) => $emit('case-changed', newValue)"
        :currentSettings="store.gameSettings"
      />
    </footer>
  </section>
</template>

<style scoped>
.menu-button {
  display: grid;
  place-items: center;
  padding: 8px;
  position: absolute;
  top: 24px;
  right: -54px;
  border: none;
  background-color: transparent;
  border-radius: 6px;
  transition: all 50ms ease-out;
}

.menu-button:hover {
  background-color: var(--color-bg-button-hover);
}
.primary-navigation {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 300px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: var(--color-bg-surface-2);
  z-index: 10;
  transform: translateX(-300px);
  transition: transform 300ms cubic-bezier(.215, .61, .355, 1);
}

.open {
  transform: translateX(0);
}

.omni-input {
  margin: 16px;
  margin-bottom: 0;
  border: none;
  padding: 13px 8px 11px 32px;
  font-size: 14px;
  box-shadow: 0px 3px 5px var(--color-box-shadow), 0px 1px 2px var(--color-box-shadow);
  border-radius: 6px;
  background-image: url('../assets/icon-plus.svg');
  background-color: var(--color-bg-input-enabled);
  background-repeat: no-repeat;
  background-position: 13px 14px;
}

.omni-input:focus {
  box-shadow: 
    0px 3px 5px var(--color-box-shadow), 
    0px 1px 2px var(--color-box-shadow),
    0 0 0 2px var(--color-bg-input-border-enabled);
  outline: none;
}

@media (prefers-color-scheme: dark) {
  .omni-input {
    box-shadow: none;
  }

  .omni-input:focus {
    box-shadow: 
      0px 3px 5px transparent, 
      0px 1px 2px transparent,
      0 0 0 2px var(--color-bg-input-border-enabled);
    outline: none;
  }
}

hr {
  margin-block: 0;
  height: 1px;
  border: none;
  background-color: var(--color-border-primary);
  width: calc(100% - 51px);
}

.word-lists {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-inline: 16px;
  flex-grow: 1;
  overflow: scroll;
}

.word-list-item {
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--color-text-secondary);
}
.active-word-list-item {
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

.word-list {
  margin: 0;
  padding-inline: 8px;
  padding: 0;
  list-style-type: none;
}

.new-group-button {
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  background-color: transparent;
  font-size: 14px;
  color: var(--color-text-button);
  background-color: var(--color-bg-button);
  transition: all 50ms ease-out;
}

.new-group-button:hover {
  background-color: var(--color-bg-button-hover);
  color: var(--color-text-button-hover);
}

.new-group-button:hover .new-group-button-icon path {
  fill: var(--color-icon-primary);
}

.navigation-footer {
  width: 100%;
  z-index: 1;
  display: flex;
  padding: 8px 8px;
  justify-content: space-between;
  align-items: center;
}
</style>
