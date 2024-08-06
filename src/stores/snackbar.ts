// stores/snackbar.js
import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    isActive: false,
    content: '',
    timeout: 2000,
    instance: null as number | null
  }),
  actions: {
    showSnackbar(message: string, duration = 2000) {
      // 기존 타이머를 정리
      if (this.instance) {
        clearTimeout(this.instance);
        this.instance = null;
      }

      // 메시지와 활성 상태 업데이트
      this.content = message;
      this.isActive = true;
      this.timeout = duration;

      // 새로운 타이머 설정
      this.instance = setTimeout(() => {
        this.isActive = false;
        this.instance = null;  // 타이머 사용 완료 후 null로 초기화
      }, duration);
    }
  }
})