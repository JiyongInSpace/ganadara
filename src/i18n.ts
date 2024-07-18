// src/i18n.js
import { createI18n } from 'vue-i18n';
import en from '@/locales/en.yaml';
import ko from '@/locales/ko.yaml'


const i18n = createI18n({
  locale: 'en', // 기본 언어 설정
  fallbackLocale: 'en', // 기본 언어에 해당하는 번역이 없을 경우 대체 언어
  messages: {
    en,
    ko
  }, // 번역 메시지
});

export default i18n;