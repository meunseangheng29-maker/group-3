import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// ១. Import FontAwesome Core និង Component
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// ២. Import Icon ទាំងអស់ដែលអ្នកបានប្រើប្រាស់ក្នុង Project
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

// ៣. បញ្ចូល Icon ទាំងអស់នោះចូលទៅក្នុង library
library.add(
  faMugHot, faHouse, faBookOpen, faCartShopping, faToolbox, 
  faTrashCan, faBoxOpen, faHashtag, faTrash, faUser, 
  faPhone, faLocationDot, faCreditCard, faCalendarDays, 
  faBasketShopping, faReceipt, faCashRegister, faTruckFast,
  faWallet, faQrcode, faMoneyBillWave, faCircleCheck, faMoneyBill1
)

const app = createApp(App)

// ៤. ចុះឈ្មោះ FontAwesomeIcon ជា Global Component
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.mount('#app')