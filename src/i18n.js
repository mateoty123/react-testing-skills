import i18n from 'i18next'
import { months } from 'moment'

import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      Adding: 'Adding',
      Deleting: 'Deleting',
      Updating: 'Updating',
      Resizing: 'Resizing',
      Dragging: 'Dragging',
      'Enable Options': 'Enable Options',
      today: 'Today',
      months: ['Janiory', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
    },
  },
  pl: {
    translation: {
      Adding: 'Dodawanie',
      Deleting: 'Usuwanie',
      Updating: 'Aktualizowanie',
      Resizing: 'Zmiana rozmiaru',
      Dragging: 'Przeciąganie',
      'Enable Options': 'Aktywne opcje',
      today: 'Dzisiaj',
      months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Listopad", "Grudzień"]
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
