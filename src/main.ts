import { createApp } from 'vue'
import './style.css'
import Settings from './components/Settings.vue';
import NewWord from './components/NewWord.vue';
import SuccessCelebration from "./components/SuccessCelebration.vue";
import PrimaryNavigation from "./components/PrimaryNavigation.vue";
import NavigationWordList from "./components/NavigationWordList.vue";
import ConfettiExplosion from "vue-confetti-explosion";
import Octicon, { markGithub } from "octicons-vue";
import App from './App.vue'

const app = createApp(App);
app.component('Settings', Settings);
app.component('NewWord', NewWord);
app.component("ConfettiExplosion", ConfettiExplosion);
app.component("octicons-vue", Octicon);
app.component("SuccessCelebration", SuccessCelebration);
app.component("PrimaryNavigation", PrimaryNavigation);
app.component("NavigationWordList", NavigationWordList);
const mountedApp = app.mount('#app');
