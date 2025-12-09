import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import ka from '../locales/ka.json'

export type MessageSchema = typeof en

const savedLocale = localStorage.getItem('locale') || 'ka'

const i18n = createI18n<[MessageSchema], 'en' | 'ka'>({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    ka
  }
})

export default i18n
