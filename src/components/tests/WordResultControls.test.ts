import { shallowMount } from "@vue/test-utils";
import WordResultControls from "../WordResultControls.vue";
import { store } from "../../store";
import { afterEach, test, assert, describe, expect, it } from "vitest";
import wordListReviewUnit from "../../wordListReviewUnit";

const wrapper = shallowMount(WordResultControls, {
  props: {
    activationResetDelay: 2000,
  },
});

test("Renders two button elements", () => {
  expect(wrapper.findAll("button").length).toEqual(2);
});

describe('Button click behavior', () => {
  const failureButton = wrapper.find('.failure-outcome-button');
  const successButton = wrapper.find('.success-outcome-button');

  test("Changes activated state to 'failure' when failure button is clicked", async () => {
    await failureButton.trigger("click");
  
    expect(wrapper.vm.$data.activated).toEqual('failure');
  });
  
  test("Changes activated state to 'successful' when success button is clicked", async () => {
    await successButton.trigger("click");
    
    expect(wrapper.vm.$data.activated).toEqual('success');
  });
  
  test("Updates word list review unit state 'reviewed' when button is clicked", async () => {
    const currentWordIndex = wrapper.vm.$data.store.currentWordIndex
    const currentWordListReviewUnit = wrapper.vm.$data.store.currentWordListReviewUnit
        const currentReviewUnitWord =
      currentWordListReviewUnit.words[currentWordIndex];
      
    await successButton.trigger("click");
    expect(currentReviewUnitWord.successful).toBe(true);

    await failureButton.trigger("click");
    expect(currentReviewUnitWord.successful).toBe(false);

    expect(currentReviewUnitWord.reviewed).toBe(true);
  });
});

