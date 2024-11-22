import { ref, onMounted } from 'vue'
import type { Ebook } from './useEbooks'

interface CartItem {
  ebook: Ebook;
  quantity: number;
}

export function useCart() {
  const cartItems = ref<CartItem[]>([])

  const loadCart = () => {
    const savedCart = sessionStorage.getItem('cart')
    if (savedCart) {
      cartItems.value = JSON.parse(savedCart)
    }
  }

  const saveCart = () => {
    sessionStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  const addToCart = (ebook: Ebook) => {
    const existingItem = cartItems.value.find(item => item.ebook.id === ebook.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({ ebook, quantity: 1 })
    }
    saveCart()
  }

  const removeFromCart = (ebookId: number) => {
    cartItems.value = cartItems.value.filter(item => item.ebook.id !== ebookId)
    saveCart()
  }

  const updateQuantity = (ebookId: number, quantity: number) => {
    const item = cartItems.value.find(item => item.ebook.id === ebookId)
    if (item) {
      item.quantity = quantity
      if (quantity <= 0) {
        removeFromCart(ebookId)
      } else {
        saveCart()
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
    sessionStorage.removeItem('cart')
  }

  const getTotal = () => {
    return cartItems.value.reduce((total, item) => {
      return total + (item.ebook.price * item.quantity)
    }, 0)
  }

  onMounted(() => {
    loadCart()
  })

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal
  }
}