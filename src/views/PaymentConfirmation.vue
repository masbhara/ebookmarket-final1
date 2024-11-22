<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface OrderData {
  customer: {
    name: string;
    email: string;
    phone: string;
    discountCode?: string;
  };
  items: Array<{
    ebook: {
      id: number;
      title: string;
      price: number;
    };
    quantity: number;
  }>;
  subtotal: number;
  discount: number;
  uniqueAmount: number;
  total: number;
  orderDate: string;
}

const orderData = ref<OrderData | null>(null)
const copiedAccount = ref<string | null>(null)
const copiedTotal = ref(false)

const bankAccounts = [
  {
    bank: 'BCA',
    number: '1234567890',
    name: 'PT Ebook Store'
  },
  {
    bank: 'Mandiri',
    number: '0987654321',
    name: 'PT Ebook Store'
  }
]

const copyToClipboard = async (text: string, type: 'account' | 'total', bank?: string) => {
  try {
    await navigator.clipboard.writeText(text)
    if (type === 'account' && bank) {
      copiedAccount.value = bank
      setTimeout(() => {
        copiedAccount.value = null
      }, 2000)
    } else if (type === 'total') {
      copiedTotal.value = true
      setTimeout(() => {
        copiedTotal.value = false
      }, 2000)
    }
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

onMounted(() => {
  const savedOrder = sessionStorage.getItem('lastOrder')
  if (savedOrder) {
    orderData.value = JSON.parse(savedOrder)
  }
})

const handleWhatsApp = () => {
  if (!orderData.value) return

  const itemsList = orderData.value.items
    .map(item => `- ${item.ebook.title} (${item.quantity}x)`)
    .join('\n')

  const message = `Halo, saya ingin konfirmasi pembayaran untuk pembelian ebook:

*Data Pembeli:*
Nama: ${orderData.value.customer.name}
Email: ${orderData.value.customer.email}

*Detail Pesanan:*
${itemsList}

Subtotal: Rp ${orderData.value.subtotal.toLocaleString('id-ID')}
${orderData.value.discount > 0 ? `Diskon: Rp ${orderData.value.discount.toLocaleString('id-ID')}\n` : ''}
Kode Unik: Rp ${orderData.value.uniqueAmount.toLocaleString('id-ID')}
Total Pembayaran: Rp ${orderData.value.total.toLocaleString('id-ID')}

Link Ebook:
${orderData.value.items.map(item => `${window.location.origin}/ebook/${item.ebook.id}`).join('\n')}`

  const text = encodeURIComponent(message)
  window.open(`https://wa.me/6289660722322?text=${text}`, '_blank')
  router.push('/thank-you')
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Konfirmasi Pembayaran</h1>
      
      <div v-if="orderData" class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Detail Pesanan:</h2>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p><strong>Nama:</strong> {{ orderData.customer.name }}</p>
          <p><strong>Email:</strong> {{ orderData.customer.email }}</p>
          <div class="mt-4">
            <p class="font-semibold mb-2">Ebook yang dibeli:</p>
            <ul class="list-disc list-inside space-y-1">
              <li v-for="item in orderData.items" :key="item.ebook.id">
                {{ item.ebook.title }} ({{ item.quantity }}x)
              </li>
            </ul>
          </div>
          <div class="mt-4 space-y-1">
            <p><strong>Subtotal:</strong> Rp {{ orderData.subtotal.toLocaleString('id-ID') }}</p>
            <p v-if="orderData.discount > 0" class="text-green-600">
              <strong>Diskon:</strong> -Rp {{ orderData.discount.toLocaleString('id-ID') }}
            </p>
            <p class="text-gray-600">
              <strong>Kode Unik:</strong> +Rp {{ orderData.uniqueAmount.toLocaleString('id-ID') }}
            </p>
            <div class="flex justify-between items-center">
              <p class="text-lg font-bold">
                <strong>Total Pembayaran:</strong> Rp {{ orderData.total.toLocaleString('id-ID') }}
              </p>
              <button
                @click="copyToClipboard(orderData.total.toString(), 'total')"
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
              >
                {{ copiedTotal ? 'Tersalin!' : 'Salin' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-4">Transfer ke salah satu rekening berikut:</h2>
        <div class="space-y-4">
          <div v-for="account in bankAccounts" :key="account.bank" class="border p-4 rounded-lg">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-bold">{{ account.bank }}</p>
                <p class="text-lg">{{ account.number }}</p>
                <p class="text-gray-600">a.n. {{ account.name }}</p>
              </div>
              <button
                @click="copyToClipboard(account.number, 'account', account.bank)"
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {{ copiedAccount === account.bank ? 'Tersalin!' : 'Salin' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-6">
        <h2 class="text-lg font-semibold mb-2">Langkah Selanjutnya:</h2>
        <ol class="list-decimal list-inside space-y-2 text-gray-700">
          <li>Transfer sesuai dengan nominal yang telah ditentukan (termasuk kode unik)</li>
          <li>Simpan bukti transfer</li>
          <li>Klik tombol WhatsApp di bawah untuk menghubungi admin</li>
          <li>Kirimkan bukti transfer melalui WhatsApp</li>
          <li>Tunggu konfirmasi dari admin</li>
          <li>Ebook akan dikirim ke email yang telah dicantumkan</li>
        </ol>
      </div>
      
      <button
        @click="handleWhatsApp"
        class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2"
      >
        <span>Hubungi Admin via WhatsApp</span>
      </button>
    </div>
  </div>
</template>