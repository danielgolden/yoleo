import { reactive } from "vue";
import wordListReviewUnit from "./wordListReviewUnit";

export const store = reactive({
  wordLists: [
    {
      name: "Default",
      words: ["Pa", "No", "Si", "Oso"],
      mostRecentWordIndex: 0,
    },
  ],
  mainMenuOpen: false,
  currentWordIndex: 0,
  currentWordListIndex: 0,
  currentWordListReviewUnit: new wordListReviewUnit(["default", "bro"]),
  wordCompleted: false,
  gameSettings: {
    case: "sentence", // upper, lower, sentence
    audio: false, // upper, lower, sentence
    // order: 'chronologial', // random
    // wordLength
  },
  celebrationActive: false,
  activationResetDelay: 2000,
  newWordListRecentlyAdded: false,
  anEditModeIsActive: false
});
