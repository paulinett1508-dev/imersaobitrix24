const btn = document.getElementById('back-to-top')

if (btn) {
  btn.hidden = false

  const toggle = () => {
    btn.classList.toggle('is-visible', window.scrollY > 300)
  }

  window.addEventListener('scroll', toggle, { passive: true })
  toggle()

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
