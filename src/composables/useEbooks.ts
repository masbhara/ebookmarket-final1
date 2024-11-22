import { ref } from 'vue'

export interface Ebook {
  id: number
  title: string
  author: string
  price: number
  description: string
  pages: number
  language: string
  format: string
  coverImage: string
  category: string
  screenshots: string[]
}

export function useEbooks() {
  const ebooks = ref<Ebook[]>([
    {
      id: 1,
      title: 'Panduan Lengkap Belajar Programming',
      author: 'John Doe',
      price: 149000,
      description: 'Buku ini akan membantu Anda memahami dasar-dasar programming dari nol hingga mahir. Cocok untuk pemula yang ingin memulai karir di dunia programming.',
      pages: 350,
      language: 'Indonesia',
      format: 'PDF, EPUB',
      coverImage: 'https://picsum.photos/400/600?random=1',
      category: 'Programming',
      screenshots: [
        'https://picsum.photos/800/600?random=11',
        'https://picsum.photos/800/600?random=12',
        'https://picsum.photos/800/600?random=13',
        'https://picsum.photos/800/600?random=14'
      ]
    },
    {
      id: 2,
      title: 'Digital Marketing untuk Pemula',
      author: 'Jane Smith',
      price: 99000,
      description: 'Pelajari strategi digital marketing terbaru untuk mengembangkan bisnis Anda di era digital.',
      pages: 250,
      language: 'Indonesia',
      format: 'PDF',
      coverImage: 'https://picsum.photos/400/600?random=2',
      category: 'Marketing',
      screenshots: [
        'https://picsum.photos/800/600?random=21',
        'https://picsum.photos/800/600?random=22',
        'https://picsum.photos/800/600?random=23',
        'https://picsum.photos/800/600?random=24'
      ]
    },
    {
      id: 3,
      title: 'Finansial Planning untuk Milenial',
      author: 'Robert Wilson',
      price: 129000,
      description: 'Panduan lengkap mengelola keuangan untuk generasi milenial. Mulai dari investasi hingga pensiun.',
      pages: 280,
      language: 'Indonesia',
      format: 'PDF, EPUB',
      coverImage: 'https://picsum.photos/400/600?random=3',
      category: 'Finance',
      screenshots: [
        'https://picsum.photos/800/600?random=31',
        'https://picsum.photos/800/600?random=32',
        'https://picsum.photos/800/600?random=33',
        'https://picsum.photos/800/600?random=34'
      ]
    },
    {
      id: 4,
      title: 'UI/UX Design Masterclass',
      author: 'Sarah Johnson',
      price: 179000,
      description: 'Kuasai prinsip dan praktik desain UI/UX modern untuk menciptakan produk digital yang luar biasa.',
      pages: 400,
      language: 'Indonesia',
      format: 'PDF, EPUB',
      coverImage: 'https://picsum.photos/400/600?random=4',
      category: 'Design',
      screenshots: [
        'https://picsum.photos/800/600?random=41',
        'https://picsum.photos/800/600?random=42',
        'https://picsum.photos/800/600?random=43',
        'https://picsum.photos/800/600?random=44'
      ]
    }
  ])

  const getEbookById = (id: number) => {
    return ebooks.value.find(ebook => ebook.id === id)
  }

  return {
    ebooks,
    getEbookById
  }
}