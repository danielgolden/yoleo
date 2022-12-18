import { createApp } from 'vue'
import './style.css'
import Settings from './components/Settings.vue';
import SuccessCelebration from "./components/SuccessCelebration.vue";
import PrimaryNavigation from "./components/PrimaryNavigation.vue";
import NavigationWordList from "./components/NavigationWordList.vue";
import WordListItem from "./components/WordListItem.vue";
import WordListHeader from "./components/WordListHeader.vue";
import WordResultControls from "./components/WordResultControls.vue";
import ConfettiExplosion from "vue-confetti-explosion";
import App from './App.vue'

const app = createApp(App);
app.component('Settings', Settings);
app.component("ConfettiExplosion", ConfettiExplosion);
app.component("WordListItem", WordListItem);
app.component("WordResultControls", WordResultControls);
app.component("WordListHeader", WordListHeader);
app.component("SuccessCelebration", SuccessCelebration);
app.component("PrimaryNavigation", PrimaryNavigation);
app.component("NavigationWordList", NavigationWordList);
const mountedApp = app.mount('#app');
