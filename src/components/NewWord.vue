<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      wordContents: "",
    };
  },
  props: {
    words: Array,
  },
  methods: {
    focusInput() {
      (this.$refs.newWordInput as HTMLInputElement).focus();
    },
  },
  mounted: function () {
    this.focusInput();

    window.addEventListener("keydown", (e) => {
      const escWasPressed = e.key === "Escape";
      if (escWasPressed) this.$emit('hideNewWordView');
    });
  },
});
</script>

<template>
  <input
    type="text"
    :value="wordContents"
    @input="(e) => wordContents = (e.target as HTMLInputElement).value"
    @keydown.enter="(e) => $emit('newWordSubmitted', (e.target as HTMLInputElement).value)"
    ref="newWordInput"
  />
</template>

<style scoped>
input {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10ch;
  padding: 24px 32px 18px;

  color: rgba(0 0 0 / 100%);
  font-weight: 600;
  font-size: 10vw;
  border: none;
  outline: none;
  background-color: rgba(0 0 0 / 5%);
  border-radius: 10px;
}
</style>
