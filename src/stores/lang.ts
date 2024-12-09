import { defineStore } from 'pinia'
import i18n from '@/i18n'

export const useLangStore = defineStore('lang', {
  state: () => ({
    currentLang: localStorage.getItem('language') || 'ko', // 초기 언어 설정
  }),
  actions: {
    setLang(lang: any) {
      this.currentLang = lang
      i18n.global.locale = lang // i18n 전역 언어 설정
      localStorage.setItem('language', lang) // 선택된 언어를 로컬 스토리지에 저장
    },
  },
})