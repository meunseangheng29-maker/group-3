import { ref, computed } from 'vue'
import type { Drink } from '../data/Drink'

export interface CartItem {
  drink: Drink
  quantity: number
}

// ដាក់ cartItems នៅក្រៅ Function ដើម្បីឱ្យវាដើរតួជា Global State
const cartItems = ref<CartItem[]>([])

export function useCart() {

  // បន្ថែម Item ចូល Cart (បើមានហើយ វានឹងបូក quantity ថែម)
  function addToCart(drink: Drink) {
    if (!drink || drink.id === undefined) return

    const existingItem = cartItems.value.find(item => item.drink.id === drink.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({
        drink: { ...drink },
        quantity: 1
      })
    }
  }

  // បន្ថយចំនួន Item
  function decreaseQuantity(drinkId: number) {
    const item = cartItems.value.find(i => i.drink.id === drinkId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        removeFromCart(drinkId)
      }
    }
  }

  // លុប Item ចេញពី Cart
  function removeFromCart(drinkId: number) {
    const index = cartItems.value.findIndex(i => i.drink.id === drinkId)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
    }
  }

  // សម្អាត Cart
  function clearCart() {
    cartItems.value = []
  }

  // គណនាចំនួន Item សរុប
  const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  // គណនាតម្លៃសរុប
  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.drink.price * item.quantity), 0)
  })

  return {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart
  }
}