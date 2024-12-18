/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// 동적 vh 설정 함수
function setDynamicVH() {
  const vh = window.innerHeight * 0.01 // 1% 뷰포트 높이
  document.documentElement.style.setProperty(
    '--vh',
    `${vh}px`
  )
}

// 초기 설정 및 이벤트 리스너 추가
window.addEventListener(
  'resize',
  setDynamicVH
)
window.addEventListener(
  'orientationchange',
  setDynamicVH
)
setDynamicVH()

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
