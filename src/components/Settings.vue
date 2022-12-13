<script lang="ts">
import { defineComponent } from 'vue';

interface gameSettings {
  case: string;
}

export default defineComponent({
  emits: ["caseChanged"],
  data() {
    return {
      gameSettingsVisible: false
    }
  },
  props: {
    currentSettings: Object
  }
})
</script>


<template>
  <button class="game-settings-trigger" @click="() => gameSettingsVisible = !gameSettingsVisible">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
      </path>
    </svg>
  </button>

  <div :class="{ 'game-settings': true, 'active': gameSettingsVisible }">
    <h3 class="game-settings-heading">Letter case</h3>
    <ul>
      <li :class="{ 'active': (currentSettings as gameSettings).case === 'lower', 'game-setting-listing': true }"
        @click="$emit('caseChanged', 'lower')">aa</li>
      <li :class="{ 'active': (currentSettings as gameSettings).case === 'sentence', 'game-setting-listing': true }"
        @click="$emit('caseChanged', 'sentence')">Aa</li>
      <li :class="{ 'active': (currentSettings as gameSettings).case === 'upper', 'game-setting-listing': true }"
        @click="$emit('caseChanged', 'upper')">AA</li>
    </ul>
  </div>
</template>

<style scoped>
.game-settings-trigger {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.game-settings-trigger svg {
  stroke: rgb(0 0 0 / 50%);
}

.game-settings {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  bottom: 60px;
  right: 20px;
  background-color: #fff;
  border: 1px solid rgba(0 0 0 / 10%);
  border-radius: 4px;
  padding: 20px;
}

.game-settings.active {
  opacity: 1;
  pointer-events: all;
}

.game-settings-heading {
  margin: 0;
}

.game-settings ul {
  display: flex;
  gap: 16px;
  padding: 0;
  margin-bottom: 0;
  list-style-type: none;
}

.game-setting-listing {
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
}

.game-setting-listing.active {
  background-color: rgba(0 0 0 / 80%);
  color: #fff;
}
</style>
