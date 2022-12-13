import { createApp } from 'vue'
import './style.css'
import Settings from './components/Settings.vue';
import NewWord from './components/NewWord.vue';
import WordListing from './components/WordListing.vue';
import App from './App.vue'

const app = createApp(App);
app.component('Settings', Settings);
app.component('NewWord', NewWord);
app.component('WordListing', WordListing);
const mountedApp = app.mount('#app');
