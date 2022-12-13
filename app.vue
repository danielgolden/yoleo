<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  data() {
    return {
      words: ['gato', 'oso', 'buho', 'vaso', 'mando', 'dedo', 'hilo', 'jugo', 'agua', 'hijo', 'sapo', 'ojo', 'emilia', 'James', 'mama', 'papa', 'abuela'],
      currentWordIndex: 0,
      currentCharIndex: 0,
      wordCompleted: false,
      gameSettings: {
        case: 'sentence', // upper, lower, sentence
        // order: 'chronologial', // random
        // wordLength
      },
      gameSettingsVisible: false
    }
  },
  computed: {
    currentWord() {
      return this.words[this.currentWordIndex]
    },
    currentChar() {
      return this.currentWord[this.currentCharIndex]
    },
    currentWordFormatted() {
      const formattingFunctions = {
        lower: () => this.currentWord.toLowerCase(),
        upper: () => this.currentWord.toUpperCase(),
        sentence: () => {
          return this.currentWord[0].toUpperCase() + this.currentWord.slice(1);
        }
      }

      return formattingFunctions[this.gameSettings.case]()
    }
  },
  methods: {
    advanceCharacter() {
      // Move the word forward one character
      this.currentCharIndex++

      if (this.currentCharIndex === this.currentWord.length) {
        this.wordCompleted = true;
      }
    },
    advanceWord() {
      // Move the word forward one character

      if (this.currentWordIndex === this.words.length - 1) {
        this.currentWordIndex = 0;
      } else {
        this.currentWordIndex++;
      }

      this.currentCharIndex = 0;
      this.wordCompleted = false;
    },
    setLetterCasing(incomingSetting) {
      this.gameSettings.case = incomingSetting
    }
  },
  mounted: function () {
    window.addEventListener('keydown', (e) => {
      if (this.wordCompleted) this.advanceWord();

      if (e.key === this.words[this.currentWordIndex][this.currentCharIndex]) {
        console.log('correct!')
        this.advanceCharacter();
      }
    })
  },
  watch: {
    currentCharIndex(newValue) {
      console.log(`the new currentCharIndex: ${newValue}`);
    }
  }
})
</script>


<template>
  <h1 class="current-word">
    <span v-for="char in currentWord.length" v-bind:key="currentWord" :class="{
      'highlighted-char': char <= currentCharIndex,
      'word-character': true,
    }">{{ currentWordFormatted[char - 1] }}</span>
  </h1>

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
      <li :class="{ 'active': gameSettings.case === 'lower', 'game-setting-listing': true }"
        @click="setLetterCasing('lower')">aa</li>
      <li :class="{ 'active': gameSettings.case === 'sentence', 'game-setting-listing': true }"
        @click="setLetterCasing('sentence')">Aa</li>
      <li :class="{ 'active': gameSettings.case === 'upper', 'game-setting-listing': true }"
        @click="setLetterCasing('upper')">AA</li>
    </ul>
  </div>
</template>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  display: grid;
  place-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.current-word {
  font-size: 15vw;
}

.highlighted-char {
  color: green;
}

.success-notice {
  position: absolute;
}

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
