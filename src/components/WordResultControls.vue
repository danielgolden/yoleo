<script lang="ts">
import { defineComponent } from "vue";
import { store } from '../store';
import Popover from './Popover.vue';

export default defineComponent({
  emits: ["wordOutcomeSuccess", "wordOutcomeFailure"],
  data() {
    return {
      activated: '',
      store
    };
  },
  computed: {
    currentWordListWords(): string[] {
      return this.store.wordLists[this.store.currentWordListIndex].words;
    },
    lastWordInListIsActive() {
      return this.store.currentWordIndex === this.currentWordListWords.length - 1;
    },
    currentReviewUnitWord() {
      return this.store.currentWordListReviewUnit.words[this.store.currentWordIndex]
    }
  },
  methods: {
    advanceWord() {
      // Move the word forward one character
      if (this.lastWordInListIsActive) {
        this.store.currentWordIndex = 0;
      } else {
        this.store.currentWordIndex++;
      }

      this.store.wordCompleted = false;
    },
    handleButtonClick(success: boolean): void {
      this.activated = success ? 'success' : 'failure';
      this.currentReviewUnitWord.reviewed = true;

      if (success) {
        this.currentReviewUnitWord.successful = true
        store.wordCompleted = true;
        
        setTimeout(() => {
          store.wordCompleted = false;
        }, this.store.activationResetDelay);
      } else {
        this.currentReviewUnitWord.successful = false;
      }

      setTimeout(() => {
        this.activated = '';
        this.advanceWord();
      }, this.store.activationResetDelay);
    }
  }
});
</script>

<template>
  <button 
    :class="{
      'word-outcome-button': true,
      'failure-outcome-button': true,
      'failure-outcome-button-activated': activated === 'failure',
      'main-menu-open': store.mainMenuOpen
    }"
    @click="handleButtonClick(false)"
  >
    <svg class="failure-icon-static icon-static button-icon" v-if="activated !== 'failure'" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.72594 1.12235C3.00702 0.403431 1.84142 0.403431 1.1225 1.12235C0.403583 1.84127 0.403583 3.00687 1.1225 3.72579L8.39635 10.9996L1.1225 18.2735C0.403583 18.9924 0.403583 20.158 1.1225 20.8769C1.84142 21.5958 3.00702 21.5958 3.72594 20.8769L10.9998 13.6031L18.2736 20.8769C18.9926 21.5958 20.1582 21.5958 20.8771 20.8769C21.596 20.158 21.596 18.9924 20.8771 18.2735L13.6032 10.9996L20.8771 3.72579C21.596 3.00687 21.596 1.84127 20.8771 1.12235C20.1582 0.403431 18.9926 0.403431 18.2736 1.12235L10.9998 8.3962L3.72594 1.12235Z" fill="#A4A8AD"/>
    </svg>
    
    <svg class="failure-icon-activated icon-activated" v-if="activated === 'failure'" width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.7259 17.1224C19.007 16.4034 17.8414 16.4034 17.1225 17.1224C16.4036 17.8413 16.4036 19.0069 17.1225 19.7258L24.3964 26.9996L17.1225 34.2735C16.4036 34.9924 16.4036 36.158 17.1225 36.8769C17.8414 37.5958 19.007 37.5958 19.7259 36.8769L26.9998 29.6031L34.2736 36.8769C34.9926 37.5958 36.1582 37.5958 36.8771 36.8769C37.596 36.158 37.596 34.9924 36.8771 34.2735L29.6032 26.9996L36.8771 19.7258C37.596 19.0069 37.596 17.8413 36.8771 17.1224C36.1582 16.4034 34.9926 16.4034 34.2736 17.1224L26.9998 24.3962L19.7259 17.1224Z" fill="#9A1C1C"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M27 0C12.0883 0 0 12.0883 0 27C0 41.9117 12.0883 54 27 54C41.9117 54 54 41.9117 54 27C54 12.0883 41.9117 0 27 0ZM3.68182 27C3.68182 14.1217 14.1217 3.68182 27 3.68182C39.8783 3.68182 50.3182 14.1217 50.3182 27C50.3182 39.8783 39.8783 50.3182 27 50.3182C14.1217 50.3182 3.68182 39.8783 3.68182 27Z" fill="#9A1C1C"/>
    </svg>
  </button>
  
  <button 
    :class="{
      'word-outcome-button': true,
      'success-outcome-button': true,
      'success-outcome-button-activated': activated === 'success'
    }"
    @click="handleButtonClick(true)"
  >
    <svg class="success-icon-static icon-static button-icon" v-if="activated !== 'success'" width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26.9608 3.32444C27.6797 2.60552 27.6797 1.43993 26.9608 0.721005C26.2419 0.00208634 25.0763 0.00208634 24.3574 0.721005L9.70455 15.3738L3.64263 9.31191C2.92371 8.593 1.75811 8.593 1.03919 9.31191C0.32027 10.0308 0.32027 11.1964 1.03919 11.9154L8.40282 19.279C9.12175 19.9979 10.2873 19.9979 11.0063 19.279L26.9608 3.32444Z" fill="#A4A8AD"/>
    </svg>

    <svg class="success-icon-activated icon-activated" v-if="activated === 'success'" width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M39.9608 20.3244C40.6797 19.6055 40.6797 18.4399 39.9608 17.721C39.2419 17.0021 38.0763 17.0021 37.3574 17.721L22.7045 32.3738L16.6426 26.3119C15.9237 25.593 14.7581 25.593 14.0392 26.3119C13.3203 27.0308 13.3203 28.1964 14.0392 28.9154L21.4028 36.279C22.1217 36.9979 23.2873 36.9979 24.0063 36.279L39.9608 20.3244Z" fill="#2A6744"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M27 0C12.0883 0 0 12.0883 0 27C0 41.9117 12.0883 54 27 54C41.9117 54 54 41.9117 54 27C54 12.0883 41.9117 0 27 0ZM3.68182 27C3.68182 14.1217 14.1217 3.68182 27 3.68182C39.8783 3.68182 50.3182 14.1217 50.3182 27C50.3182 39.8783 39.8783 50.3182 27 50.3182C14.1217 50.3182 3.68182 39.8783 3.68182 27Z" fill="#2A6744"/>
    </svg>
  </button>
</template>

<style scoped>
.word-outcome-button {
  --transition-timing: 300ms;

  display: grid;
  place-items: center;
  width: 123px;
  height: 190px;
  position: absolute;
  top: 50%;
  margin-top: -95px;
  background-color: #F7F7F7;
  border: none;
  transition: all var(--transition-timing) cubic-bezier(.215, .61, .355, 1);
}

.button-icon {
  transition: all var(--transition-timing) cubic-bezier(.215, .61, .355, 1);
}

@media (hover: hover) {
  .success-outcome-button:hover {
     background-color: #ECFFEB;
  }
  
  .failure-outcome-button:hover {
     background-color: #FFF4F4;
  }

  .word-outcome-button:hover .success-icon-static path {
    fill: #2A6744;
  }
  .word-outcome-button:hover .failure-icon-static path {
    fill: #9A1C1C;
  }

}

.word-outcome-button:hover .icon-static {
  scale: 1.2;
}

.word-outcome-button:active .icon-static {
  scale: 1;
}

.failure-outcome-button-activated {
  background-color: #FFF4F4;
}

.success-outcome-button-activated {
  background-color: #ECFFEB;
}

.failure-outcome-button {
  left: 0;
  border-radius: 0 25px 25px 0;
}

.success-outcome-button {
  right: 0;
  border-radius: 25px 0 0 25px;
}

.main-menu-open {
  translate: 306px;
}
</style>
