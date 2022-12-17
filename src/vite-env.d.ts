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

interface AllStateData {
  wordLists: WordList[];
  currentWordListIndex: number;
  currentWordIndex: number;
  currentCharIndex: number;
  wordCompleted: boolean;
  gameSettings: GameSettings;
}
