// Data structure for saving word group progress
// const wordListReviewUnit = {
//   totalWordCount: this.words.length,
//   reviewedPercentage: this.totalWordCount / this.reviewedCount,
//   reviewedCount: (() => this.getCount("reviewed", true))(),
//   missedCount: (() => this.getCount("successful", false))(),
//   successfulCount: (() => this.getCount("successful", true))(),
//   getCount: (countType: 'string', value: boolean) => {
//     this.words.filter((word) => (word[countType] = value));
//   },
//   words: [
//     {
//       id: 'a random UUID',
//       text: "ojo",
//       reviewed: false,
//       successful: false,
//     },
//   ],
// };

interface WordListReviewUnitWord {
  id: string; // Change this to a UUID
  text: string;
  reviewed: boolean;
  successful: boolean;
}

// As a class
class wordListReviewUnit  {
  totalWordCount: number;
  reviewedPercentage: number;
  reviewedCount: number;
  missedCount: number;
  successfulCount: number;
  getCount: (countType: string, value: boolean) => number;
  words: WordListReviewUnitWord[];

  constructor(wordList: WordListReviewUnitWord[]) {
    this.totalWordCount = this.words.length;
    this.reviewedPercentage = this.totalWordCount / this.reviewedCount;
    this.reviewedCount = (() => this.getCount("reviewed", true))();
    this.missedCount = (() => this.getCount("successful", false))();
    this.successfulCount = (() => this.getCount("successful", true))();
    this.getCount = (countType: string, value: boolean): number => {
      const wordsThatMeetTheCriteria = this.words.filter((word) => (word[countType] = value));
      return wordsThatMeetTheCriteria.length;
    };
    this.words = wordList;
  }
};