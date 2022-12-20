import { render, screen } from '@testing-library/vue';
import { shallowMount, mount, } from "@vue/test-utils";
import { store } from "../../store";
import { beforeEach, afterEach, test, assert, describe, expect, it } from "vitest";
import App from "../../App.vue";
import Settings from "../Settings.vue";
import { ShallowReactive } from "vue";


test("Saves the doc dimensions to css variables", async () => {
  render(App);

  const widthVar = document.documentElement.style.getPropertyValue("--doc-width");
  const heightVar = document.documentElement.style.getPropertyValue("--doc-height");

  expect(widthVar).toBe(`${window.innerWidth}px`);
  expect(heightVar).toBe(`${window.innerHeight}px`);
});

// test("When a new word list is selected a new review unit is created for it", async () => {
//   // wrapper.vm.$data.store.currentWordListIndex++;
//   // const wordLists = wrapper.vm.$data.store.wordLists;
//   // const currentWordListIndex = wrapper.vm.$data.store.currentWordListIndex
//   // const currentWordList = wordLists[currentWordListIndex];
//   // const currentReviewUnitWord =
//   //   wrapper.vm.$data.store.currentWordListReviewUnit.words[
//   //     currentWordListIndex
//   //   ];
//   // const currentReviewUnitContainsNewWord = currentReviewUnitWord

//   // expect(currentWordList.words[0]).toEqual(currentReviewUnitWord.text);

//   const blue = render(App);
//   console.log(blue);
//   const el = await screen.findByText('Pa');
//   blue.
// })

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

