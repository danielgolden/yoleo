/// <reference types="vite/client" />
interface WordList {
  name: string;
  words: string[];
  mostRecentWordIndex: number;
}

interface FormattingFunctions {
  lower: () => string;
  upper: () => string;
  sentence: () => string;
}

interface newwordListHeaderData {
  newName: string,
  wordListIndex: number
}

interface GameSettings {
  case: string
}

interface WordListReviewUnitWord {
  id: string; // Change this to a UUID
  text: string;
  reviewed: boolean;
  successful: boolean;
}

interface VueDraggableEvent {
  oldIndex: number;
  newIndex: number
}