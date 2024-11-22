<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <nav class="bg-white border-b sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center">
              <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ebook Store
              </span>
            </router-link>
          </div>
          
          <div class="flex items-center space-x-4">
            <router-link 
              v-for="link in navLinks" 
              :key="link.path" 
              :to="link.path"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition 
          name="page" 
          mode="out-in"
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Footer from './components/Footer.vue'

const navLinks = ref([
  { name: 'Beranda', path: '/' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Panduan', path: '/payment-guide' },
  { name: 'Kontak', path: '/contact' }
])
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>