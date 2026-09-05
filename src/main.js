// ==========================================
// 1. ECMAScript (ES6+ Modules) & Vue.js 3
// ==========================================
import { createApp } from 'vue'
import App from './App.vue'

// ==========================================
// 2. Vue Router
// ==========================================
import router from './router/index.js'

// ==========================================
// 3. Bootstrap 5 & Bootstrap Icons (بوتستراب)
// ==========================================
import 'bootstrap/dist/css/bootstrap.rtl.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// ==========================================
// 4. Custom CSS Styles
// ==========================================
import './style.css'

// Mount Vue Application
createApp(App).use(router).mount('#app')
