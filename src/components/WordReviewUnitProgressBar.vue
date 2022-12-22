<script lang="ts">
import { defineComponent, PropType } from "vue";
import { store } from "../store";

export default defineComponent({
  emits: ["closeMenu"],
  data() {
    return {
      destructiveItemHovered: false,
      store,
      reviewedPercentage: 0
    };
  },
  watch: {
    'store.currentWordListReviewUnit': {
      handler(newValue, oldValue) {
        const reviewedCount = store.currentWordListReviewUnit.getCount("reviewed", true);
        const totalWordCount = store.currentWordListReviewUnit.totalWordCount;
        this.reviewedPercentage = (reviewedCount / totalWordCount) * 100;
      },
      deep: true
    }
  }
});
</script>

<template>
  <div
    :class="{
      'progress-bar-container': true,
      'main-menu-open': store.mainMenuOpen,
      'no-progress': reviewedPercentage > 0,
    }"
  >

    <span role="progressbar" aria-valuenow="23" class="progress-bar">
      <svg width="500" height="4">
        <rect
          height="4"
          width="500"
          fill="var(--color-bg-indicator-inactive)"
          class="progress-bar-base"
          rx="2"
        />
        <rect
          height="4"
          fill="var(--color-bg-interactive-active)"
          class="progress-bar-fill"
          rx="2"
          :style="`width: ${reviewedPercentage}%`"
        />
      </svg>
      <div class="progress-points">
        <span :class="{'progress-point': true, 'progress-point-reached': true}"></span>
        <span :class="{'progress-point': true, 'progress-point-reached': reviewedPercentage >= 25}"></span>
        <span :class="{'progress-point': true, 'progress-point-reached': reviewedPercentage >= 50}"></span>
        <span :class="{'progress-point': true, 'progress-point-reached': reviewedPercentage >= 75}"></span>
        <span :class="{'progress-point': true, 'progress-point-reached': reviewedPercentage >= 100}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8.25197 3.06807C8.17614 3.02097 8.08864 2.99604 7.99937 2.99609C7.9101 2.99604 7.8226 3.02097 7.74677 3.06807C7.67094 3.11516 7.60981 3.18255 7.5703 3.26259L6.36977 5.69488L3.68565 6.08443C3.59724 6.09716 3.51416 6.1344 3.44583 6.19193C3.37751 6.24945 3.32666 6.32497 3.29905 6.40992C3.27144 6.49487 3.26818 6.58585 3.28963 6.67256C3.31108 6.75926 3.35639 6.83823 3.42042 6.9005L5.36371 8.79342L4.90466 11.4673C4.88969 11.5553 4.89958 11.6455 4.93323 11.7281C4.96688 11.8107 5.02294 11.8822 5.09509 11.9346C5.16724 11.9869 5.25259 12.0181 5.34151 12.0246C5.43043 12.031 5.51938 12.0124 5.59833 11.971L7.99937 10.7086L10.4004 11.971C10.4794 12.0125 10.5684 12.0311 10.6574 12.0246C10.7464 12.0182 10.8319 11.9869 10.904 11.9345C10.9762 11.882 11.0322 11.8104 11.0658 11.7277C11.0994 11.645 11.1092 11.5546 11.0941 11.4667L10.6357 8.79405L12.5777 6.9005C12.6415 6.8382 12.6866 6.75928 12.708 6.67267C12.7294 6.58606 12.726 6.4952 12.6984 6.41037C12.6708 6.32554 12.6201 6.25012 12.5519 6.19263C12.4836 6.13515 12.4008 6.09789 12.3125 6.08507L9.62834 5.69488L8.42845 3.26259C8.38893 3.18255 8.3278 3.11516 8.25197 3.06807Z" :fill="reviewedPercentage >= 100 ? '#FFAA29' : '#D9D9D9'"/>
          </svg>
        </span>
      </div>
    </span>
  </div>
</template>

<style scoped>

@keyframes point-pulse {
  0% {
    opacity: 40%;
    box-shadow: 0 0 0 0px var(--color-bg-indicator-active);
  }
  
  100% {
    opacity: 0;
    box-shadow: 0 0 0 12px var(--color-bg-indicator-active);
  }
}

@keyframes final-point-pulse {
  0% {
    opacity: 40%;
    box-shadow: 0 0 0 0px #FFAA29;
  }
  
  100% {
    opacity: 0;
    box-shadow: 0 0 0 16px #FFAA29;
  }
}

.progress-bar-container {
  --animation-duration: 800ms;
  position: absolute;
  width: 500px;
  height: 50px;
  top: 0;
  display: grid;
  place-items: center;
  transition: all var(--animation-duration) cubic-bezier(0.215, 0.61, 0.355, 1);
}

.main-menu-open {
  translate: 100px;
}

.progress-bar {
  position: relative;
}

.progress-bar-base {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.progress-points {
  width: 100%;
  position: absolute;
  top: 7.5px;
  display: flex;
  justify-content: space-between;
}

.progress-point {
  position: relative;
  display: block;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background-color: var(--color-bg-indicator-inactive);
  box-shadow: 0 0 0 2px var(--color-bg-surface-1);
  transition: all var(--animation-duration) cubic-bezier(0.215, 0.61, 0.355, 1);
}

.progress-point:before {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  box-shadow: 0 0 0 12px var(--color-bg-indicator-active);
  z-index: 10;
  border-radius: 100%;
  opacity: 0;
}

.progress-point:last-child {
  height: 16px;
  width: 16px;
  top: -2.5px;
  background-color: var(--color-bg-surface-1)
}

.progress-point-reached {
  background-color: var(--color-bg-indicator-active);
}

.progress-point-reached:not(:first-child):before {
  animation: point-pulse;
  animation-duration: 600ms;
  animation-timing-function: cubic-bezier(.25, .46, .45, .94);
}

.progress-point-reached:last-child:before {
  height: 16px;
  width: 16px;
  top: -0.5px;
  box-shadow: 0 0 0 16px #FFAA29;
  animation: final-point-pulse;
  animation-duration: 600ms;
  animation-timing-function: cubic-bezier(.25, .46, .45, .94);
}

.progress-bar-fill {
  transition: all var(--animation-duration) cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>
