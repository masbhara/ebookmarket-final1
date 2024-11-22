<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Panduan Pembayaran</h1>
    
    <div class="space-y-8">
      <!-- Transfer Bank -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Transfer Bank</h2>
        
        <div class="space-y-6">
          <!-- BCA -->
          <div>
            <h3 class="font-semibold text-lg mb-2">BCA</h3>
            <ol class="list-decimal list-inside space-y-2 text-gray-700">
              <li>Buka aplikasi BCA Mobile atau m-BCA</li>
              <li>Pilih menu "m-Transfer" atau "Transfer"</li>
              <li>Pilih "Transfer ke BCA"</li>
              <li>Masukkan nomor rekening: 1234567890</li>
              <li>Masukkan nominal sesuai dengan total pembayaran (termasuk kode unik)</li>
              <li>Periksa kembali detail transfer</li>
              <li>Masukkan PIN m-BCA</li>
              <li>Simpan bukti transfer</li>
            </ol>
          </div>
          
          <!-- Mandiri -->
          <div>
            <h3 class="font-semibold text-lg mb-2">Mandiri</h3>
            <ol class="list-decimal list-inside space-y-2 text-gray-700">
              <li>Buka aplikasi Livin' by Mandiri</li>
              <li>Pilih menu "Transfer"</li>
              <li>Pilih "Transfer ke Mandiri"</li>
              <li>Masukkan nomor rekening: 0987654321</li>
              <li>Masukkan nominal sesuai dengan total pembayaran (termasuk kode unik)</li>
              <li>Periksa kembali detail transfer</li>
              <li>Masukkan PIN Livin'</li>
              <li>Simpan bukti transfer</li>
            </ol>
          </div>
        </div>
      </div>
      
      <!-- Konfirmasi Pembayaran -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Konfirmasi Pembayaran</h2>
        
        <div class="space-y-4 text-gray-700">
          <p>Setelah melakukan pembayaran, ikuti langkah berikut:</p>
          
          <ol class="list-decimal list-inside space-y-2">
            <li>Klik tombol "Hubungi Admin via WhatsApp" pada halaman konfirmasi pembayaran</li>
            <li>Kirimkan bukti transfer yang telah Anda simpan</li>
            <li>Sertakan informasi:
              <ul class="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Nama pembeli</li>
                <li>Email</li>
                <li>Judul ebook yang dibeli</li>
              </ul>
            </li>
            <li>Tunggu konfirmasi dari admin (maksimal 1x24 jam)</li>
            <li>Ebook akan dikirim ke email yang telah didaftarkan</li>
          </ol>
        </div>
      </div>
      
      <!-- Catatan Penting -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Catatan Penting</h2>
        
        <ul class="list-disc list-inside space-y-2 text-gray-700">
          <li>Pastikan nominal transfer sesuai dengan total pembayaran termasuk kode unik</li>
          <li>Simpan bukti pembayaran sampai ebook diterima</li>
          <li>Pembayaran yang sudah dilakukan tidak dapat dibatalkan atau direfund</li>
          <li>Jika dalam 24 jam belum menerima ebook, silakan hubungi customer service kami</li>
        </ul>
      </div>
    </div>
  </div>
</template>