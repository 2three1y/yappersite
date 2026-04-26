import './style.css'

const FAQS = [
  {
    q: 'What is Yapper?',
    a: 'Yapper is a social media app created by MystyDev that allows users to freely express themselves while staying away from AI generated, political or brainrot content.',
  },
  {
    q: 'Is Yapper free to use?',
    a: 'Yes, Yapper is completely free to download and use.',
  },
  {
    q: 'What platforms is Yapper available on?',
    a: 'Right now Yapper is available only on Android.',
  },
  {
    q: 'Is Yapper on the Google Play Store?',
    a: 'No, Yapper is not available on the Google Play Store. You can download it from our website or through GitHub.',
  }
]

function renderFAQ() {
  const list = document.getElementById('faq-list')
  if (!list) return

  FAQS.forEach(({ q, a }, i) => {
    const item = document.createElement('div')
    item.className = 'faq-item reveal'
    item.style.transitionDelay = `${i * 65}ms`
    item.innerHTML = `
      <button class="faq-question" aria-expanded="false">
        <span>${q}</span>
        <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="faq-answer" role="region">${a}</div>
    `
    const btn = item.querySelector('.faq-question')
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open')
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open')
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false')
      })
      if (!isOpen) {
        item.classList.add('open')
        btn.setAttribute('aria-expanded', 'true')
      }
    })
    list.appendChild(item)
  })
}

function initHeader() {
  const header = document.getElementById('site-header')
  if (!header) return
  const update = () => header.classList.toggle('scrolled', window.scrollY > 10)
  window.addEventListener('scroll', update, { passive: true })
  update()
}

function initReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    }),
    { threshold: 0.1 },
  )
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
}

document.addEventListener('DOMContentLoaded', () => {
  renderFAQ()
  initHeader()
  initReveal()
})
