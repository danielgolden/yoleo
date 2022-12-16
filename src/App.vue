<script lang="ts">
import WordListing from "./components/WordListing.vue";
import NewWord from "./components/NewWord.vue";
import SuccessCelebration from "./components/SuccessCelebration.vue";
import PrimaryNavigation from "./components/PrimaryNavigation.vue";
import { defineComponent } from "vue";
import { remove } from "@vue/shared";

interface FormattingFunctions {
  lower: () => string;
  upper: () => string;
  sentence: () => string;
}

export default defineComponent({
  data() {
    return {
      wordLists: [
        {
          name: 'Default',
          words: ["Pa", "No", "Si", "Oso"],
          mostRecentWordIndex: 0,
        },
      ],
      currentWordListIndex: 0,
      currentWordIndex: 0,
      currentCharIndex: 0,
      wordCompleted: false,
      gameSettings: {
        case: "sentence", // upper, lower, sentence
        // order: 'chronologial', // random
        // wordLength
      },
      newWordBeingAdded: false,
    };
  },
  computed: {
    currentWordListWords() {
      return this.wordLists[this.currentWordListIndex].words;
    },
    currentWord() {
      return this.wordLists[this.currentWordListIndex].words[this.currentWordIndex];
    },
    currentChar() {
      return this.currentWord[this.currentCharIndex];
    },
    currentWordFormatted(): String {
      const formattingFunctions = {
        lower: () => this.currentWord.toLowerCase(),
        upper: () => this.currentWord.toUpperCase(),
        sentence: () => {
          return this.currentWord[0].toUpperCase() + this.currentWord.slice(1);
        },
      };

      return formattingFunctions[
        this.gameSettings.case as keyof FormattingFunctions
      ]();
    },
  },
  methods: {
    advanceCharacter() {
      // Move the word forward one character
      this.currentCharIndex++;

      if (this.currentCharIndex === this.currentWord.length) {
        this.wordCompleted = true;
      }
    },
    advanceWord() {
      // Move the word forward one character
      const lastWordInListIsActive = this.currentWordIndex === this.currentWordListWords.length - 1;
      if (lastWordInListIsActive) {
        this.currentWordIndex = 0;
      } else {
        this.currentWordIndex++;
      }

      this.currentCharIndex = 0;
      this.wordCompleted = false;
    },
    setLetterCasing(incomingSetting: string) {
      this.gameSettings.case = incomingSetting;
    },
    addNewWord(incomingWord: string) {
      this.currentWordListWords.push(incomingWord);
      this.currentWordIndex = this.currentWordListWords.length - 1;
      this.currentCharIndex = 0;
      this.saveGameData();
    },
    toggleNewWordComponent() {
      this.newWordBeingAdded = !this.newWordBeingAdded;
    },
    changeWordToSelection(incomingWordIndex: number) {
      this.currentWordIndex = incomingWordIndex;
      this.currentCharIndex = 0;
    },
    removeWord(wordIndex: number) {
      const indexOfWordToBeDeleted = wordIndex ?? this.currentWordIndex

      this.currentWordListWords.splice(indexOfWordToBeDeleted, 1);
      if (this.currentWordListWords.length === 0) {
        this.newWordBeingAdded = true;
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
      }
      this.saveGameData();
    },
    loadGameData() {
      const loadedData = localStorage.getItem("leer-data");
      const dataWasFound = loadedData !== null;

      // Expected data structure:
      // {
      //   wordLists: [
      //     {
      //       name: 'Default',
      //       words: ["Pa", "No", "Si", "Oso"],
      //       mostRecentWordIndex: 0,
      //     },
      //   ],
      //   gameSettings: {
      //     case: "sentence", // upper, lower, sentence
      //     // order: 'chronologial', // random
      //   }, 
      // } 

      if (dataWasFound) {
        const parsedData = JSON.parse(loadedData);

        this.wordLists = parsedData.wordLists;
        this.currentWordListWords = this.wordLists[0].words;
        this.gameSettings = parsedData.gameSettings;
        this.currentWordListIndex = parsedData.gameState.currentWordListIndex;
        this.currentWordIndex = parsedData.gameState.currentWordIndex;
      } else {
        this.wordLists = [
          {
            name: 'Default',
            words: ["Pa", "No", "Si", "Oso"],
            mostRecentWordIndex: 0,
          },
        ];
        this.saveGameData();
      }
    },
    saveGameData() {
      const gameData = {
        wordLists: this.wordLists,
        gameSettings: this.gameSettings,
        gameState: {
          currentWordListIndex: this.currentWordListIndex,
          currentWordIndex: this.currentWordIndex
        }
      }
      localStorage.setItem("leer-data", JSON.stringify(gameData));
    },
    getdocumentHeight() {
      const doc = document.documentElement
      doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
    }
  },
  mounted: function () {
    this.loadGameData();
    this.getdocumentHeight()

    if (this.currentWordListWords.length <= this.currentWordIndex) {
      this.currentWordIndex = 0;
    }

    window.addEventListener("keydown", (e) => {
      const letterIsCorrect =
        e.key.toLowerCase() ===
        this.currentWordListWords[this.currentWordIndex][this.currentCharIndex]?.toLowerCase();
      if (this.wordCompleted) this.advanceWord();
      if (letterIsCorrect) this.advanceCharacter();
    });

    window.addEventListener('resize', this.getdocumentHeight);

    setInterval(() => {
      this.saveGameData();
    }, 5000);
  },
});
</script>

<template>
  <PrimaryNavigation 
    :allStateData="$data" 
    @new-word-selected="(incomingWordIndex: number) => changeWordToSelection(incomingWordIndex)"
    @new-word-added="(incomingWord: string) => addNewWord(incomingWord)"
    @case-changed="(newValue: string) => setLetterCasing(newValue)"
    @delete-word="(wordIndex: number) => removeWord(wordIndex)"
  />
  <SuccessCelebration v-if="wordCompleted" />
  <h1 class="current-word" v-if="!newWordBeingAdded && currentWord?.length > 0">
    <span
      v-for="char in currentWord.length"
      v-bind:key="currentWord"
      :class="{
        'highlighted-char': char <= currentCharIndex,
        'word-character': true,
      }"
      >{{ currentWordFormatted[char - 1] }}</span
    >
  </h1>

  <NewWord
    @hide-new-word-view="toggleNewWordComponent()"
    v-if="newWordBeingAdded"
    @new-word-submitted="(incomingWord: string) => addNewWord(incomingWord)"
  />
  <WordListing
    @new-word-triggered="() => toggleNewWordComponent()"
    @word-removal-triggered="() => removeWord()"
    @new-word-selected="(incomingWordIndex: number) => changeWordToSelection(incomingWordIndex)"
    :words="currentWordListWords"
    :currentWordIndex="currentWordIndex"
  />
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
