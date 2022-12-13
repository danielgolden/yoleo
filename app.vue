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
        // wordLength
      }
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
    <span 
      v-for="char in currentWord.length" 
      v-bind:key="currentWord"
      :class="{
  'highlighted-char': char <= currentCharIndex,
  'word-character': true,
      }"
    >{{currentWordFormatted[char - 1]}}</span>
  </h1>
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
</style>
