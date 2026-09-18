import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// =====================================================
// FONT AWESOME
// =====================================================

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faMugHot,
  faHouse,
  faBookOpen,
  faCartShopping,
  faToolbox,
  faTrashCan,
  faBoxOpen,
  faHashtag,
  faTrash,
  faUser,
  faPhone,
  faLocationDot,
  faCreditCard,
  faCalendarDays,
  faBasketShopping,
  faReceipt,
  faCashRegister,
  faTruckFast,
  faWallet,
  faQrcode,
  faMoneyBillWave,
  faCircleCheck,
  faMoneyBill1
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faMugHot,
  faHouse,
  faBookOpen,
  faCartShopping,
  faToolbox,
  faTrashCan,
  faBoxOpen,
  faHashtag,
  faTrash,
  faUser,
  faPhone,
  faLocationDot,
  faCreditCard,
  faCalendarDays,
  faBasketShopping,
  faReceipt,
  faCashRegister,
  faTruckFast,
  faWallet,
  faQrcode,
  faMoneyBillWave,
  faCircleCheck,
  faMoneyBill1
)

// =====================================================
// CREATE APP
// =====================================================

const app = createApp(App)

// Pinia
app.use(createPinia())

// Router
app.use(router)

// FontAwesome global component
app.component(
  'font-awesome-icon',
  FontAwesomeIcon
)

// Mount
app.mount('#app')