<script lang="ts">
import SuccessCelebration from "./components/SuccessCelebration.vue";
import PrimaryNavigation from "./components/PrimaryNavigation.vue";
import wordListReviewUnit from "./wordListReviewUnit";

import { store } from "./store";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
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
    currentReviewUnitWord() {
      return this.store.currentWordListReviewUnit.words[this.store.currentWordIndex]
    },
    wordFailed() {
      const currentWordIndex = this.store.currentWordIndex;
      const currentReviewUnitWords = this.store.currentWordListReviewUnit.words;
      const currentReviewUnitWord = currentReviewUnitWords[currentWordIndex];

      return !currentReviewUnitWord.successful && this.currentReviewUnitWord.reviewed
    }
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

      this.store.currentWordListReviewUnit.addNewWord(incomingWord);
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
      this.store.newWordListRecentlyAdded = true;

      // So that we can focus the input of the header when it's added
      setTimeout(() => {
        this.store.newWordListRecentlyAdded = false;
      }, 2000);
    },
    updateCurrentWordListIndex(incomingWordListIndex: number) {
      this.store.currentWordListIndex = incomingWordListIndex;
      this.store.currentWordIndex = 0;
      this.newWordListReviewUnit();
    },
    updatewordListHeader(newData: newwordListHeaderData) {
      const { newName, wordListIndex } = newData;
      this.store.wordLists[wordListIndex].name = newName;
    },
    newWordListReviewUnit() {
      this.store.currentWordListReviewUnit = new wordListReviewUnit(
        this.currentWordListWords
      );
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
      if (!this.store.anEditModeIsActive) {
        if (e.code === "ArrowRight" || e.code === "ArrowDown") {
          this.advanceWord();
        } else if (e.code === "ArrowLeft" || e.code === "ArrowUp") {
          this.regressWord();
        }
      }

      const slashWasPressed = e.key === "/";
      if (slashWasPressed) this.store.mainMenuOpen = !this.store.mainMenuOpen;
    });

    window.addEventListener("resize", this.setDocumentDimensions);
  },
  watch: {
    'store.currentWordListIndex'() {
      this.saveGameData();
      this.newWordListReviewUnit();
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
    },
    'store.wordLists': {
      handler() {
        this.saveGameData();
      },
      deep: true
    },
    'store.currentWordListReviewUnit': {
      handler() {
        this.saveGameData();
      },
      deep: true
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
  <WordReviewUnitProgressBar />
  <WordResultControls />
  <h1
    :class="{
      'current-word': true,
      'current-word-completed': store.wordCompleted,
      'current-word-failed': wordFailed,
      'current-word-with-main-menu-open': store.mainMenuOpen,
    }"
    data-testid="currentWord"
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
  transition: all 300ms cubic-bezier(.215, .61, .355, 1);
}

.highlighted-char,
.current-word-completed {
  color: var(--color-text-attention-success);
}

.success-notice {
  position: absolute;
}

.current-word-with-main-menu-open {
  translate: 100px;
}

.current-word-failed {
  opacity: .65;
}
</style>
