<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const router = useRouter()
const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart } = useCart()

const form = ref({
  name: '',
  email: '',
  phone: '',
  discountCode: ''
})

const discountCodes = {
  'HEMAT50': 0.5,  // 50% off
  'HEMAT25': 0.25, // 25% off
  'HEMAT10': 0.1   // 10% off
}

const subtotal = computed(() => getTotal())
const discount = computed(() => {
  const discountRate = discountCodes[form.value.discountCode as keyof typeof discountCodes] || 0
  return subtotal.value * discountRate
})

// Generate a random number between 100-999 for unique transfer amount
const uniqueAmount = ref(Math.floor(Math.random() * 900) + 100)
const total = computed(() => subtotal.value - discount.value + uniqueAmount.value)

const discountStatus = ref('')

const applyDiscount = () => {
  if (discountCodes[form.value.discountCode as keyof typeof discountCodes]) {
    discountStatus.value = 'valid'
  } else {
    discountStatus.value = 'invalid'
    setTimeout(() => {
      discountStatus.value = ''
    }, 3000)
  }
}

const handleSubmit = () => {
  const orderData = {
    customer: { ...form.value },
    items: cartItems.value,
    subtotal: subtotal.value,
    discount: discount.value,
    uniqueAmount: uniqueAmount.value,
    total: total.value,
    orderDate: new Date().toISOString()
  }
  sessionStorage.setItem('lastOrder', JSON.stringify(orderData))
  clearCart()
  router.push('/payment-confirmation')
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

    <!-- Cart Items -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Keranjang Belanja</h2>
      
      <div v-if="cartItems.length > 0">
        <div class="space-y-4">
          <div v-for="item in cartItems" :key="item.ebook.id" class="flex items-center gap-4 p-4 border rounded-lg">
            <img :src="item.ebook.coverImage" :alt="item.ebook.title" class="w-20 h-28 object-cover rounded">
            <div class="flex-1">
              <h3 class="font-semibold">{{ item.ebook.title }}</h3>
              <p class="text-gray-600">{{ item.ebook.author }}</p>
              <p class="text-green-600 font-semibold">Rp {{ item.ebook.price.toLocaleString('id-ID') }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button 
                @click="updateQuantity(item.ebook.id, item.quantity - 1)"
                class="px-2 py-1 border rounded"
              >-</button>
              <span class="w-8 text-center">{{ item.quantity }}</span>
              <button 
                @click="updateQuantity(item.ebook.id, item.quantity + 1)"
                class="px-2 py-1 border rounded"
              >+</button>
            </div>
            <button 
              @click="removeFromCart(item.ebook.id)"
              class="text-red-600 hover:text-red-800"
            >
              Hapus
            </button>
          </div>
        </div>
        
        <!-- Discount Section -->
        <div class="mt-6 border-t pt-4">
          <div class="flex gap-4 items-start mb-4">
            <div class="flex-1">
              <input
                v-model="form.discountCode"
                type="text"
                placeholder="Masukkan kode diskon"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
              <p v-if="discountStatus === 'invalid'" class="text-red-500 text-sm mt-1">
                Kode diskon tidak valid
              </p>
            </div>
            <button
              @click="applyDiscount"
              class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Terapkan
            </button>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Subtotal:</span>
              <span>Rp {{ subtotal.toLocaleString('id-ID') }}</span>
            </div>
            <div v-if="discount > 0" class="flex justify-between text-green-600">
              <span>Diskon:</span>
              <span>-Rp {{ discount.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Kode Unik:</span>
              <span>+Rp {{ uniqueAmount.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>Rp {{ total.toLocaleString('id-ID') }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-8 text-gray-600">
        Keranjang belanja kosong
      </div>
    </div>

    <!-- Order Form -->
    <form v-if="cartItems.length > 0" @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Data Pembeli</h2>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Nama Lengkap
        </label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
        <p class="mt-1 text-sm text-gray-500">Ebook akan dikirim ke alamat email ini</p>
      </div>
      
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
          Nomor WhatsApp
        </label>
        <input
          v-model="form.phone"
          type="tel"
          id="phone"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
      </div>
      
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Lanjut ke Pembayaran
      </button>
    </form>
  </div>
</template>