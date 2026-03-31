/**
 * Animações de scroll — fade-up via Intersection Observer
 * Respeita prefers-reduced-motion (o CSS já desativa a transição,
 * mas aqui também evitamos adicionar a classe se não for necessário).
 */

function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const elements = document.querySelectorAll('.fade-up')

  if (prefersReduced) {
    // Torna tudo visível sem animação
    elements.forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )

  elements.forEach((el) => observer.observe(el))
}

// FAQ accordion
function initFAQ() {
  const questions = document.querySelectorAll('.faq-question')

  questions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true'
      const answerId = btn.getAttribute('aria-controls')
      const answer   = document.getElementById(answerId)

      if (!answer) return

      btn.setAttribute('aria-expanded', String(!expanded))
      answer.hidden = expanded
    })
  })
}

// Header scroll: aumenta opacidade ao rolar
function initHeaderScroll() {
  const header = document.getElementById('site-header')
  if (!header) return

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.style.backgroundColor = 'var(--color-traevo-black)'
    } else {
      header.style.backgroundColor = ''
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
}

initScrollAnimations()
initFAQ()
initHeaderScroll()
