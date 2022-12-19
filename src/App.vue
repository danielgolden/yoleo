<script lang="ts">
import SuccessCelebration from "./components/SuccessCelebration.vue";
import PrimaryNavigation from "./components/PrimaryNavigation.vue";
import wordListReviewUnit from "./wordListReviewUnit";
import { store } from "./store";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      gameSettings: {
        case: "sentence", // upper, lower, sentence
        // order: 'chronologial', // random
        // wordLength
      },
      wordListReviewUnitIsActive: false,
      store,
    };
  },
  computed: {
    currentWordListWords(): string[] {
      return this.store.wordLists[this.store.currentWordListIndex].words;
    },
    currentWord() {
      return this.store.wordLists[this.store.currentWordListIndex].words[
        this.store.currentWordIndex
      ];
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
        this.store.gameSettings.case as keyof FormattingFunctions
      ]();
    },
    lastWordInListIsActive() {
      return this.store.currentWordIndex === this.currentWordListWords.length - 1;
    },
  },
  methods: {
    advanceWord() {
      // Move the word forward one character
      if (this.lastWordInListIsActive) {
        this.store.currentWordIndex = 0;
      } else {
        this.store.currentWordIndex++;
      }

      this.store.wordCompleted = false;
    },
    regressWord() {
      // Move the word forward one character
      if (this.store.currentWordIndex !== 0) {
        this.store.currentWordIndex--;
      }

      this.store.wordCompleted = false;
    },
    setLetterCasing(incomingSetting: string) {
      this.store.gameSettings.case = incomingSetting;
    },
    addNewWord(incomingWord: string) {
      this.currentWordListWords.push(incomingWord);
      this.store.currentWordIndex = this.currentWordListWords.length - 1;
      this.saveGameData();
    },
    changeWordToSelection(incomingWordIndex: number) {
      this.store.currentWordIndex = incomingWordIndex;
    },
    removeWord(wordIndex?: number) {
      const indexOfWordToBeDeleted = wordIndex ?? this.store.currentWordIndex;

      this.currentWordListWords.splice(indexOfWordToBeDeleted, 1);
      if (this.currentWordListWords.length === 0) {
        this.store.currentWordIndex = 0;
      }
      this.saveGameData();
    },
    loadGameData() {
      const loadedData = localStorage.getItem("leer-data");
      const dataWasFound = loadedData !== null;

      if (dataWasFound) {
        const parsedData = JSON.parse(loadedData);

        this.store.wordLists = parsedData.wordLists;
        this.store.gameSettings = parsedData.gameSettings;
        this.store.currentWordListIndex = parsedData.gameState.currentWordListIndex;
        this.store.currentWordIndex = parsedData.gameState.currentWordIndex;
      } else {
        this.store.wordLists = [
          {
            name: "Default",
            words: ["Pa", "No", "Si", "Oso"],
            mostRecentWordIndex: 0,
          },
        ];
        this.saveGameData();
      }
    },
    saveGameData() {
      const gameData = {
        wordLists: this.store.wordLists,
        gameSettings: this.store.gameSettings,
        gameState: {
          currentWordListIndex: this.store.currentWordListIndex,
          currentWordIndex: this.store.currentWordIndex,
        },
      };
      localStorage.setItem("leer-data", JSON.stringify(gameData));
    },
    setDocumentDimensions() {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
      doc.style.setProperty("--doc-width", `${window.innerWidth}px`);
    },
    createNewWordList() {
      const emptyWordList = {
        name: "New group",
        words: ["Example"],
        mostRecentWordIndex: 0,
      };

      this.store.wordLists.push(emptyWordList);
    },
    updateCurrentWordListIndex(incomingWordListIndex: number) {
      this.store.currentWordListIndex = incomingWordListIndex;
    },
    updatewordListHeader(newData: newwordListHeaderData) {
      const { newName, wordListIndex } = newData;
      this.store.wordLists[wordListIndex].name = newName;
    },
    newWordListReviewUnit() {
      this.store.currentWordListReviewUnit = new wordListReviewUnit(
        this.currentWordListWords
      );
    },
    currentReviewUnitWord() {
      return this.store.currentWordListReviewUnit.words[this.store.currentWordIndex]
    },
    wordFailed() {
      return !this.currentReviewUnitWord().successful && this.currentReviewUnitWord().reviewed
    }
  },
  mounted: function () {
    this.loadGameData();
    this.setDocumentDimensions();
    this.newWordListReviewUnit();

    if (this.currentWordListWords.length <= this.store.currentWordIndex) {
      this.store.currentWordIndex = 0;
    }

    window.addEventListener("keydown", (e) => {
      if (e.code == "Enter" && e.metaKey) {
        this.store.wordCompleted = true;
      }

      if (e.code === "ArrowRight" || e.code === "ArrowDown") {
        this.advanceWord();
      } else if (e.code === "ArrowLeft" || e.code === "ArrowUp") {
        this.regressWord();
      }
    });

    window.addEventListener("resize", this.setDocumentDimensions);

    setInterval(() => {
      this.saveGameData();
    }, 5000);
  },
  watch: {
    'store.currentWordListIndex'() {
      this.saveGameData();
    },
    'store.currentWordIndex'() {
      this.store.wordCompleted = false;
    },
    'store.wordCompleted'(newValue) {
      if (newValue) {
        this.store.celebrationActive = true;        
      } else {
        setTimeout(() => {
          this.store.celebrationActive = false;        
        }, 1000)
      }
    }
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
    @create-new-word-list="createNewWordList"
    @update-current-word-list="(incomingWordListIndex: number) => updateCurrentWordListIndex(incomingWordListIndex)"
    @update-word-list-name="(newData: newwordListHeaderData) => updatewordListHeader(newData)"
  />
  <SuccessCelebration
    v-if="store.celebrationActive"
  />
  <WordResultControls />
  <h1
    :class="{
      'current-word': true,
      'current-word-completed': store.wordCompleted,
      'current-word-failed': wordFailed(),
      'current-word-with-main-menu-open': store.mainMenuOpen,
    }"
    v-if="currentWord?.length > 0"
  >
    {{currentWordFormatted}}
  </h1>
</template>

<style scoped>
.current-word {
  position: relative;
  max-width: calc(100% - 250px);
  font-size: 15vw;
  text-align: center;
  margin: 0 auto;
  z-index: 1;
  transition: all 400ms cubic-bezier(.215, .61, .355, 1);
}

.highlighted-char,
.current-word-completed {
  color: #1dad08;
}

.success-notice {
  position: absolute;
}

.current-word-with-main-menu-open {
  translate: 100px;
}

.current-word-failed {
  color: rgba(0 0 0 / 65%);
}
</style>
