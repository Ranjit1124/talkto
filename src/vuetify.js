import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles' 
import '@mdi/font/css/materialdesignicons.css'
import { VCalendar } from 'vuetify/labs/VCalendar'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
  
// '#1867C0'
const Theme1={
  dark:false,
  colors: {
    background: '#FFFFFF',
    primary:"#1867C0",
    side:'#183FD5',
    divider:"#FFFFFF"
  }
}
const Theme2={
  dark:true,
  colors:{
    background: '#080000',
    primary:"#05f772",
    side:'#1a352f',
    divider:"#121212"


  }
}
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'Theme1',
    themes: {
      Theme1,Theme2
    },
  },
  components:{
    ...components,
    VCalendar,
    VTimePicker
  },
  directives,
    icons: {
      defaultSet: 'mdi',
    },
})

export default vuetify