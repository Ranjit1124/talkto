import { createI18n } from 'vue-i18n'
import en from './en.json'
import fr from './fr.json'
import ta from './ta.json'
import de from './de.json'

const i18n = createI18n({
    locale: 'en',
  messages: {
    en,
    fr,
    ta,
    de
  }
})

export default i18n