<script lang="ts">
import { defineComponent } from "vue";
import NavigationWordList from "./NavigationWordList.vue";
import Settings from "./Settings.vue";

export default defineComponent({
  emits: ["newWordSelected", "newWordAdded", "case-changed", "delete-word"],
  data() {
    return {
      primaryNavigationActive: true,
      omniInputValue: "",
    };
  },
  props: {
    allStateData: Array,
  },
  mounted: function () {
    window.addEventListener("keydown", (e) => {
      const slashWasPressed = e.key === "`";
      if (slashWasPressed) this.wordListActive = !this.wordListActive;
    });
  },
  methods: {
    submitNewWord(newWord: string) {
      this.$emit("newWordAdded", this.omniInputValue);
      this.omniInputValue = "";
    },
  },
});
</script>

<template>
  <section v-if="primaryNavigationActive" class="primary-navigation">
    <input
      v-model="omniInputValue"
      type="search"
      class="omni-input"
      placeholder="Search or add a new word..."
      @keydown.enter="this.submitNewWord()"
    />
    <navigation class="word-lists">
      <NavigationWordList
        :allStateData="this.allStateData"
        @new-word-selected="(incomingWordIndex: number) => $emit('newWordSelected', incomingWordIndex)"
        @delete-word="(wordIndex) => $emit('delete-word', wordIndex)"
        v-on="this.$listeners"
      />
    </navigation>
    <footer class="navigation-footer">
      <button class="new-group-button">+ New group</button>
      <Settings
        @case-changed="(newValue) => $emit('case-changed', newValue)"
        :currentSettings="this.allStateData.gameSettings"
      />
    </footer>
  </section>
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
  background-color: rgba(0 0 0 / 8%);
  z-index: 10;
}

.omni-input {
  margin: 16px;
  margin-bottom: 0;
  border: none;
  box-shadow: 0 0 0 1px rgba(0 0 0 / 10%), inset 0 2px 0 rgba(0 0 0 / 2%);
  border-radius: 4px;
  padding: 10px 8px;
  font-size: 16px;
}

.word-lists {
  margin-inline: 16px;
  flex-grow: 1;
  overflow: scroll;
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

.new-group-button {
  border: none;
  padding: 14px 16px;
  background-color: transparent;
  font-size: 16px;
  color: rgba(0 0 0 / 65%);
}

.navigation-footer {
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
}
</style>
