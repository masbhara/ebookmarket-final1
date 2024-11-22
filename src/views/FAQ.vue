<script setup lang="ts">
import { ref } from 'vue'

const faqs = ref([
  {
    question: 'Bagaimana cara membeli ebook?',
    answer: 'Pilih ebook yang ingin dibeli, klik tombol "Tambah ke Keranjang", isi form pembelian, lakukan pembayaran sesuai instruksi, dan ebook akan dikirim ke email Anda setelah pembayaran dikonfirmasi.'
  },
  {
    question: 'Berapa lama proses pengiriman ebook?',
    answer: 'Ebook akan dikirim ke email Anda dalam waktu maksimal 1x24 jam setelah pembayaran dikonfirmasi. Biasanya proses ini lebih cepat pada jam kerja (09.00-17.00 WIB).'
  },
  {
    question: 'Apakah ebook bisa dibaca offline?',
    answer: 'Ya, ebook dapat diunduh dan dibaca secara offline menggunakan aplikasi pembaca PDF atau EPUB yang sesuai dengan format ebook yang dibeli.'
  },
  {
    question: 'Bagaimana jika saya lupa password atau tidak bisa mengakses ebook?',
    answer: 'Silakan hubungi tim support kami melalui WhatsApp atau email dengan menyertakan bukti pembelian dan email yang digunakan saat pembelian.'
  },
  {
    question: 'Apakah ada garansi untuk ebook yang dibeli?',
    answer: 'Ya, kami memberikan garansi 7 hari untuk masalah teknis seperti file corrupt atau tidak bisa diakses. Silakan hubungi tim support kami jika mengalami masalah.'
  },
  {
    question: 'Apakah ebook bisa di-refund?',
    answer: 'Karena sifat digital dari produk kami, ebook yang sudah dibeli tidak dapat di-refund kecuali terdapat masalah teknis yang tidak dapat diselesaikan oleh tim support kami.'
  },
  {
    question: 'Di perangkat apa saja ebook bisa dibaca?',
    answer: 'Ebook dapat dibaca di berbagai perangkat seperti smartphone, tablet, laptop, atau e-reader yang mendukung format PDF dan EPUB.'
  },
  {
    question: 'Apakah ada diskon untuk pembelian lebih dari satu ebook?',
    answer: 'Ya, kami secara berkala mengadakan promo dan diskon. Pantau terus website kami atau ikuti sosial media kami untuk mendapatkan informasi promo terbaru.'
  }
])

const openQuestions = ref<number[]>([])

const toggleQuestion = (index: number) => {
  const position = openQuestions.value.indexOf(index)
  if (position === -1) {
    openQuestions.value.push(index)
  } else {
    openQuestions.value.splice(position, 1)
  }
}

const isOpen = (index: number) => openQuestions.value.includes(index)
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
    
    <div class="space-y-4">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="bg-white rounded-lg shadow overflow-hidden"
      >
        <button
          @click="toggleQuestion(index)"
          class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
        >
          <span class="font-semibold text-gray-900">{{ faq.question }}</span>
          <svg
            class="w-5 h-5 transform transition-transform"
            :class="{ 'rotate-180': isOpen(index) }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        
        <div
          v-show="isOpen(index)"
          class="px-6 py-4 bg-gray-50 border-t"
        >
          <p class="text-gray-700">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>