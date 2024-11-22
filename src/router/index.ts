import { createRouter, createWebHistory } from 'vue-router'
import EbookShowcase from '../views/EbookShowcase.vue'
import EbookDetail from '../views/EbookDetail.vue'
import OrderForm from '../views/OrderForm.vue'
import PaymentConfirmation from '../views/PaymentConfirmation.vue'
import FAQ from '../views/FAQ.vue'
import PaymentGuide from '../views/PaymentGuide.vue'
import Contact from '../views/Contact.vue'
import Terms from '../views/Terms.vue'
import Privacy from '../views/Privacy.vue'
import Refund from '../views/Refund.vue'
import ThankYou from '../views/ThankYou.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'EbookShowcase',
      component: EbookShowcase
    },
    {
      path: '/ebook/:id',
      name: 'EbookDetail',
      component: EbookDetail
    },
    {
      path: '/order',
      name: 'OrderForm',
      component: OrderForm
    },
    {
      path: '/payment-confirmation',
      name: 'PaymentConfirmation',
      component: PaymentConfirmation
    },
    {
      path: '/thank-you',
      name: 'ThankYou',
      component: ThankYou
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ
    },
    {
      path: '/payment-guide',
      name: 'PaymentGuide',
      component: PaymentGuide
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy
    },
    {
      path: '/refund',
      name: 'Refund',
      component: Refund
    }
  ]
})

export default router