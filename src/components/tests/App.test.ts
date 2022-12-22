import { render, screen, fireEvent, cleanup } from '@testing-library/vue';
import { shallowMount, mount, } from "@vue/test-utils";
import { store } from "../../store";
import { beforeEach, afterEach, test, assert, describe, expect, it } from "vitest";
import App from "../../App.vue";
import PrimaryNavigation from "../PrimaryNavigation.vue";
import Settings from "../Settings.vue";
import { ShallowReactive } from "vue";

beforeEach(() => {
  render(App);
});

afterEach(() => {
  cleanup();
})

test("Saves the doc dimensions to css variables", async () => {
  const widthVar = document.documentElement.style.getPropertyValue("--doc-width");
  const heightVar = document.documentElement.style.getPropertyValue("--doc-height");

  expect(widthVar).toBe(`${window.innerWidth}px`);
  expect(heightVar).toBe(`${window.innerHeight}px`);
});


describe("Menus", async () => {
  render(PrimaryNavigation);
  test("Don't allow two menus to be active at the same time", async () => {
    store.wordLists = [
      {
        name: "word group 1",
        words: ["Pa", "No", "Si", "Oso"],
        mostRecentWordIndex: 0,
      },
      {
        name: "word group 2",
        words: ["Pa", "No", "Si", "Oso"],
        mostRecentWordIndex: 0,
      },
    ];
  });
})