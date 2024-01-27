import { createI18n } from 'vue-i18n'
import enLocale from '@/i18n/en.json'
import zhLocale from '@/i18n/zh.json'
const messages = {
    en: enLocale,
    'zh-cn': zhLocale,
};

const i18n = createI18n({
  legacy:false,
  locale: localStorage.getItem('language') || 'en', // 默认语言
  messages
})

export default i18n