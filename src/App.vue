<script lang="ts">
import SuccessCelebration from "./components/SuccessCelebration.vue";
import PrimaryNavigation from "./components/PrimaryNavigation.vue";
import celebrationSound from './assets/celebration-sound.mp3';
import { defineComponent } from "vue";

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
      celebrationAudio: new Audio(celebrationSound)
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
    lastWordInListIsActive() {
      return this.currentWordIndex === this.currentWordListWords.length - 1
    }
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
      if (this.lastWordInListIsActive) {
        this.currentWordIndex = 0;
      } else {
        this.currentWordIndex++;
      }

      this.currentCharIndex = 0;
      this.wordCompleted = false;
    },
    regressWord() {
      // Move the word forward one character
      if (this.currentWordIndex !== 0) {
        this.currentWordIndex--;
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
    changeWordToSelection(incomingWordIndex: number) {
      this.currentWordIndex = incomingWordIndex;
      this.currentCharIndex = 0;
    },
    removeWord(wordIndex?: number) {
      const indexOfWordToBeDeleted = wordIndex ?? this.currentWordIndex

      this.currentWordListWords.splice(indexOfWordToBeDeleted, 1);
      if (this.currentWordListWords.length === 0) {
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
      }
      this.saveGameData();
    },
    loadGameData() {
      const loadedData = localStorage.getItem("leer-data");
      const dataWasFound = loadedData !== null;

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
    },
    createNewWordList() {
      const emptyWordList = {
        name: 'New group',
        words: ["Example"],
        mostRecentWordIndex: 0,
      }

      this.wordLists.push(emptyWordList);
    },
    updateCurrentWordListIndex(incomingWordListIndex: number) {
      this.currentWordListIndex = incomingWordListIndex;
    },
    updatewordListHeader(newData: newwordListHeaderData) {
      const { newName, wordListIndex } = newData;
      this.wordLists[wordListIndex].name = newName
    }
  },
  mounted: function () {
    this.loadGameData();
    this.getdocumentHeight();
    this.celebrationAudio.preload

    if (this.currentWordListWords.length <= this.currentWordIndex) {
      this.currentWordIndex = 0;
    }

    window.addEventListener("keydown", (e) => {
      // Listen for correct keystrokes
      // const letterIsCorrect =
      //   e.key.toLowerCase() ===
      //   this.currentWordListWords[this.currentWordIndex][this.currentCharIndex]?.toLowerCase();
      // if (this.wordCompleted) this.advanceWord();
      // if (letterIsCorrect) this.advanceCharacter();

      if (e.code == 'Enter' && e.metaKey) {
        this.wordCompleted = true;
      }

      if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
        this.advanceWord()
      } else if (e.code === "ArrowLeft" || e.code === 'ArrowUp') {
        this.regressWord();
      }
    });

    window.addEventListener('resize', this.getdocumentHeight);

    setInterval(() => {
      this.saveGameData();
    }, 5000);
  },
  watch: {
    wordLists: {
      handler() {
        this.saveGameData();
      },
      deep: true
    },
    currentWordIndex() {
      this.wordCompleted = false;
    }
  }
});
</script>

<template>
  <PrimaryNavigation 
    :allStateData="$data" 

    @new-word-selected="(incomingWordIndex: number) => changeWordToSelection(incomingWordIndex)"
    @new-word-added="(incomingWord: string) => addNewWord(incomingWord)"
    @case-changed="(newValue: string) => setLetterCasing(newValue)"
    @delete-word="(wordIndex: number) => removeWord(wordIndex)"
    @create-new-word-list="createNewWordList"
    @update-current-word-list="(incomingWordListIndex: number) => updateCurrentWordListIndex(incomingWordListIndex)"
    @update-word-list-name="(newData: newwordListHeaderData) => updatewordListHeader(newData)"
  />
  <SuccessCelebration v-if="wordCompleted" :celebrationAudio="celebrationAudio" />
  <h1 :class="{'current-word': true, 'current-word-completed': wordCompleted}" v-if="currentWord?.length > 0">
    <span
      v-for="char in currentWord.length"
      :key="char"
      :class="{
        'highlighted-char': char <= currentCharIndex,
        'word-character': true,
      }"
      >{{ currentWordFormatted[char - 1] }}</span
    >
  </h1>
</template>

<style scoped>
.current-word {
  position: relative;
  font-size: 15vw;
  z-index: 1;
}
.highlighted-char, .current-word-completed {
  color: #1dad08;
}

.success-notice {
  position: absolute;
}
</style>
