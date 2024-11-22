<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <div class="mb-6">
        <svg class="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Terima Kasih!</h1>
      
      <div class="text-gray-600 space-y-4 mb-8">
        <p>Pesanan Anda telah kami terima.</p>
        <p>Admin kami akan segera memproses pembayaran Anda setelah menerima konfirmasi melalui WhatsApp.</p>
        <p>Ebook akan dikirim ke email Anda dalam waktu 1x24 jam setelah pembayaran diverifikasi.</p>
      </div>

      <button
        @click="goToHome"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Kembali ke Beranda
      </button>
    </div>
  </div>
</template>