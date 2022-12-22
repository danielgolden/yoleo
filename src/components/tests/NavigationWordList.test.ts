import { render, screen, fireEvent } from "@testing-library/vue";
import {
  beforeEach,
  afterEach,
  test,
  assert,
  describe,
  expect,
  it,
} from "vitest";
import { store } from '../../store';
import App from "../../App.vue";

describe('NavigationWordList', async () => {
  test("When edit mode is active, disable arrow key shortcuts navigation", async () => {
    store.anEditModeIsActive = true;
    render(App);
    const initialWordText = (await screen.findByTestId('currentWord')).innerText;

    fireEvent.keyDown(document.body, { key: "Right", code: "ArrowRight" });
    fireEvent.keyDown(document.body, { key: "Down", code: "ArrowDown" });
    
    const newWordText = (await screen.findByTestId("currentWord")).innerText;
    expect(initialWordText).toEqual(newWordText);
  });
});


// test("When a new word is added, it's also added to the review group", () => {
//   const testWord = 'myTestWord'
//   wrapper.vm.addNewWord(testWord);

//   const wordLists = wrapper.vm.$data.store.wordLists;
//   const currentWordListIndex = wrapper.vm.$data.store.currentWordListIndex
//   const currentWordList = wordLists[currentWordListIndex];
//   const currentReviewUnitWord =
//     wrapper.vm.$data.store.currentWordListReviewUnit.words[
//       currentWordListIndex
//     ];
//   const currentReviewUnitContainsNewWord = currentReviewUnitWord

//   const currentWordListContainsNewWord = currentWordList.words.some(
//     (word) => word === testWord
//   );
//   expect(currentWordListContainsNewWord).toBe(true);
//   expect(currentWordListContainsNewWord).toBe(true);
// })

// describe('Delete word group functionality', () => {
//   test("Warns user before deleteing word group", async () => {
//     const currentWordGroup = wrapper.vm.$data.store.currentWordListReviewUnit;
//     wrapper.vm.$data.store.mainMenuOpen = true;
//     await wrapper.trigger('keydown.meta.delete');

//     expect(currentWordGroup).toEqual(
//       wrapper.vm.$data.store.currentWordListReviewUnit
//     );
//     expect(window.confirm).toHaveBeenCalled();
//   });

//   // test('Deltes the current word group', () => {

//   // });

//   // test("Saves game data after deleting word group", () => { });
//   // test('Only deletes group when main menu is open', () => {

//   // });
// })
