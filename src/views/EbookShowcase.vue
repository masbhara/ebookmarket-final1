<template>
  <div>
    <!-- Hero Section -->
    <div class="relative min-h-[500px] overflow-hidden">
      <!-- Background Image with Overlay -->
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style="background-image: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80')"
      ></div>
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/95 to-indigo-600/95"></div>

      <!-- Content -->
      <div class="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold sm:text-5xl lg:text-6xl tracking-tight text-white">
            Temukan Ebook Terbaik
          </h1>
          <p class="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
            Koleksi lengkap ebook berkualitas untuk mengembangkan pengetahuan dan skill Anda
          </p>
          
          <!-- Search Bar -->
          <div class="mt-10 max-w-xl mx-auto">
            <div class="flex shadow-lg rounded-lg overflow-hidden backdrop-blur-sm bg-white/10">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari judul atau penulis..."
                class="flex-1 px-6 py-4 bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none"
              >
              <select
                v-model="selectedCategory"
                class="px-4 py-4 bg-white/90 border-l border-gray-200 text-gray-700 focus:outline-none"
              >
                <option value="">Semua Kategori</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- Category Pills -->
      <div class="flex flex-wrap gap-2 mb-12">
        <button
          @click="selectedCategory = ''"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105',
            !selectedCategory ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50 border'
          ]"
        >
          Semua
        </button>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105',
            selectedCategory === category ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50 border'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Ebooks Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="ebook in filteredEbooks"
          :key="ebook.id"
          class="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
          @click="navigateToDetail(ebook.id)"
        >
          <div class="aspect-[3/4] overflow-hidden">
            <img 
              :src="ebook.coverImage" 
              :alt="ebook.title" 
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div class="p-6">
            <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 mb-3">
              {{ ebook.category }}
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {{ ebook.title }}
            </h3>
            <p class="text-gray-600 mb-3">{{ ebook.author }}</p>
            <div class="flex items-center justify-between">
              <p class="text-xl font-bold text-blue-600">
                Rp {{ ebook.price.toLocaleString('id-ID') }}
              </p>
              <button class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredEbooks.length === 0" class="text-center py-16">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak ada hasil</h3>
        <p class="text-gray-600">Maaf, tidak ada ebook yang sesuai dengan pencarian Anda.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEbooks } from '../composables/useEbooks'

const router = useRouter()
const { ebooks } = useEbooks()
const searchQuery = ref('')
const selectedCategory = ref('')

const categories = computed(() => {
  const uniqueCategories = new Set(ebooks.value.map(ebook => ebook.category))
  return Array.from(uniqueCategories)
})

const filteredEbooks = computed(() => {
  return ebooks.value.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         ebook.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || ebook.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const navigateToDetail = (id: number) => {
  router.push(`/ebook/${id}`)
}
</script>