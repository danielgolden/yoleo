import { v4 as uuidv4 } from "uuid";

export default class wordListReviewUnit {
  totalWordCount: number;
  reviewedPercentage: number;
  reviewedCount: number;
  unreviewedCount: number;
  failureCount: number;
  successfulCount: number;
  words: WordListReviewUnitWord[];

  constructor(wordList: string[]) {
    this.words = this.intializeReviewUnitWords(wordList);
    this.totalWordCount = this.words.length;
    this.reviewedCount = (() => this.getCount("reviewed", true))();
    this.unreviewedCount = this.totalWordCount - this.reviewedCount;
    this.reviewedPercentage = this.totalWordCount / this.reviewedCount;
    this.failureCount =
      (() => this.getCount("successful", false))() - this.unreviewedCount;
    this.successfulCount = (() => this.getCount("successful", true))();
  }

  getCount = (countType: string, value: boolean): number => {
    const wordsThatMeetTheCriteria = this.words.filter(
      (word: WordListReviewUnitWord) =>
        word[countType as keyof WordListReviewUnitWord] === value
    );
    return wordsThatMeetTheCriteria.length;
  };

  addNewWord = (text: string): void => {
    this.words.push({
      id: uuidv4(),
      text: text,
      reviewed: false,
      successful: false,
    });
  };

  intializeReviewUnitWords = (wordList: string[]): WordListReviewUnitWord[] => {
    const reviewUnitWordList = wordList.map((word) => {
      return {
        id: uuidv4(),
        text: word,
        reviewed: false,
        successful: false,
      };
    });

    return reviewUnitWordList;
  };
}
