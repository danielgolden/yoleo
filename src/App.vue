<script lang="ts">
import Settings from './components/Settings.vue';
import WordListing from './components/WordListing.vue';
import NewWord from './components/NewWord.vue';
import SuccessCelebration from './components/SuccessCelebration.vue';
import { defineComponent } from 'vue';

interface FormattingFunctions {
  lower: () => string;
  upper: () => string;
  sentence: () => string;
}

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
      newWordBeingAdded: false
    }
  },
  computed: {
    currentWord() {
      return this.words[this.currentWordIndex]
    },
    currentChar() {
      return this.currentWord[this.currentCharIndex]
    },
    currentWordFormatted(): String {
      const formattingFunctions = {
        lower: () => this.currentWord.toLowerCase(),
        upper: () => this.currentWord.toUpperCase(),
        sentence: () => {
          return this.currentWord[0].toUpperCase() + this.currentWord.slice(1);
        }
      }

      return formattingFunctions[this.gameSettings.case as keyof FormattingFunctions]()
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
    setLetterCasing(incomingSetting: string) {
      this.gameSettings.case = incomingSetting
    },
    addNewWord(incomingWord: string) {
      this.words.push(incomingWord);
      this.currentWordIndex = this.words.length - 1;
      this.currentCharIndex = 0;
      this.toggleNewWordComponent();
    },
    toggleNewWordComponent() {
      this.newWordBeingAdded = !this.newWordBeingAdded
    }
  },
  mounted: function () {
    window.addEventListener('keydown', (e) => {
      const letterIsCorrect = e.key === this.words[this.currentWordIndex][this.currentCharIndex]
      if (this.wordCompleted) this.advanceWord();
      if (letterIsCorrect) this.advanceCharacter();
    });
  }
})
</script>


<template>
  <SuccessCelebration v-if="wordCompleted" />
  <h1 class="current-word" v-if="!newWordBeingAdded">
    <span v-for="char in currentWord.length" v-bind:key="currentWord" :class="{
      'highlighted-char': char <= currentCharIndex,
      'word-character': true,
    }">{{ currentWordFormatted[char - 1] }}</span>
  </h1>

  <NewWord @hide-new-word-view="toggleNewWordComponent()" v-if="newWordBeingAdded" @new-word-submitted="(incomingWord: string) => addNewWord(incomingWord)"/>
  <WordListing 
    @new-word-triggered="() => toggleNewWordComponent()" 
    @update-active-word="(incomingWordIndex: number) => currentWordIndex = incomingWordIndex" 
    :words="words"
    :currentWordIndex="currentWordIndex"
  />
  <Settings @case-changed="(newValue: string) => setLetterCasing(newValue)" :currentSettings="gameSettings" />
</template>

<style scoped>

.current-word {
  position: relative;
  font-size: 15vw;
  z-index: 1;
}

.highlighted-char {
  color: #1dad08;
}

.success-notice {
  position: absolute;
}
</style>
