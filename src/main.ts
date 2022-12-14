import { createApp } from 'vue'
import './style.css'
import Settings from './components/Settings.vue';
import NewWord from './components/NewWord.vue';
import WordListing from './components/WordListing.vue';
import ConfettiExplosion from "vue-confetti-explosion";
import App from './App.vue'

const app = createApp(App);
app.component('Settings', Settings);
app.component('NewWord', NewWord);
app.component('WordListing', WordListing);
app.component("ConfettiExplosion", ConfettiExplosion);
const mountedApp = app.mount('#app');
