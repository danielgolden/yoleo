import { shallowMount, mount } from "@vue/test-utils";
import { store } from "../../store";
import { afterEach, test, assert, describe, expect, it } from "vitest";
import App from "../../App.vue";


test("Saves the doc dimensions to css variables", async () => {
  shallowMount(App);

  const widthVar = document.documentElement.style.getPropertyValue("--doc-width");
  const heightVar = document.documentElement.style.getPropertyValue("--doc-height");

  expect(widthVar).toBe(`${window.innerWidth}px`);
  expect(heightVar).toBe(`${window.innerHeight}px`);
});

