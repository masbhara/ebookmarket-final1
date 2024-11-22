<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEbooks } from '../composables/useEbooks'
import { useCart } from '../composables/useCart'
import EbookDisclaimer from '../components/EbookDisclaimer.vue'

const router = useRouter()
const route = useRoute()
const { getEbookById } = useEbooks()
const { addToCart } = useCart()

const selectedImage = ref<string | null>(null)
const isZoomed = ref(false)

const ebook = computed(() => {
  const id = parseInt(route.params.id as string)
  return getEbookById(id)
})

const handleAddToCart = () => {
  if (ebook.value) {
    addToCart(ebook.value)
    router.push('/order')
  }
}

const openImageModal = (image: string) => {
  selectedImage.value = image
  isZoomed.value = true
}

const closeImageModal = () => {
  selectedImage.value = null
  isZoomed.value = false
}

const contactAdmin = () => {
  const message = encodeURIComponent(`Halo, saya tertarik dengan ebook "${ebook.value?.title}". Boleh tanya-tanya dulu?`)
  window.open(`https://wa.me/6289660722322?text=${message}`, '_blank')
}
</script>

<template>
  <div v-if="ebook" class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-8 text-sm">
        <button @click="router.push('/')" class="text-gray-500 hover:text-blue-600">Home</button>
        <span class="mx-2 text-gray-400">/</span>
        <span class="text-gray-900">{{ ebook.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Left Column - Images -->
        <div class="space-y-8">
          <!-- Main Image -->
          <div class="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div class="aspect-[3/4] overflow-hidden rounded-xl">
              <img 
                :src="ebook.coverImage" 
                :alt="ebook.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                @click="openImageModal(ebook.coverImage)"
              >
            </div>
          </div>

          <!-- Preview Gallery -->
          <div class="bg-white p-6 rounded-2xl shadow-sm">
            <h2 class="text-xl font-semibold mb-4">Preview Isi Ebook</h2>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="(screenshot, index) in ebook.screenshots"
                :key="index"
                class="aspect-video overflow-hidden rounded-lg cursor-pointer group relative"
                @click="openImageModal(screenshot)"
              >
                <img
                  :src="screenshot"
                  :alt="'Preview ' + (index + 1)"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                >
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Details -->
        <div class="space-y-6">
          <div class="bg-white p-8 rounded-2xl shadow-sm">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
              {{ ebook.category }}
            </span>
            
            <h1 class="text-3xl font-bold text-gray-900 mt-4 mb-2">{{ ebook.title }}</h1>
            <p class="text-xl text-gray-600 mb-4">oleh {{ ebook.author }}</p>
            
            <div class="flex items-center justify-between py-4 border-t border-b">
              <p class="text-3xl font-bold text-blue-600">
                Rp {{ ebook.price.toLocaleString('id-ID') }}
              </p>
              <div class="flex gap-3">
                <button
                  @click="contactAdmin"
                  class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Tanya Admin
                </button>
                <button 
                  @click="handleAddToCart"
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white p-8 rounded-2xl shadow-sm">
            <h2 class="text-xl font-semibold mb-4">Deskripsi</h2>
            <p class="text-gray-700 leading-relaxed">{{ ebook.description }}</p>
          </div>

          <!-- Specifications -->
          <div class="bg-white p-8 rounded-2xl shadow-sm">
            <h2 class="text-xl font-semibold mb-6">Spesifikasi</h2>
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-2">
                <p class="text-gray-500">Jumlah Halaman</p>
                <p class="text-lg font-semibold">{{ ebook.pages }}</p>
              </div>
              <div class="space-y-2">
                <p class="text-gray-500">Bahasa</p>
                <p class="text-lg font-semibold">{{ ebook.language }}</p>
              </div>
              <div class="space-y-2">
                <p class="text-gray-500">Format</p>
                <p class="text-lg font-semibold">{{ ebook.format }}</p>
              </div>
            </div>
          </div>

          <!-- Disclaimer -->
          <EbookDisclaimer />
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div
      v-if="selectedImage"
      class="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      @click="closeImageModal"
    >
      <button 
        class="absolute top-4 right-4 text-white hover:text-gray-300"
        @click="closeImageModal"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img
        :src="selectedImage"
        :alt="ebook.title"
        class="max-w-full max-h-[90vh] object-contain"
        :class="{ 'cursor-zoom-in': !isZoomed, 'cursor-zoom-out': isZoomed }"
        @click.stop="isZoomed = !isZoomed"
        :style="{ transform: isZoomed ? 'scale(1.5)' : 'scale(1)', transition: 'transform 0.3s ease' }"
      >
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
    <p class="text-gray-600 text-lg">Ebook tidak ditemukan.</p>
  </div>
</template>