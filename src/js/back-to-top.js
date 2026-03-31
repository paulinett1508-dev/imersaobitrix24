const btn = document.getElementById('back-to-top')
const sections = [...document.querySelectorAll('section[id]')]

if (btn && sections.length) {
  btn.hidden = false

  // Retorna o índice da seção cuja borda superior já passou pelo topo da viewport
  const getCurrentIdx = () => {
    const threshold = window.scrollY + 90 // compensa o header fixo (~64–80px)
    let idx = 0
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top + window.scrollY <= threshold) {
        idx = i
      }
    }
    return idx
  }

  const update = () => {
    const idx = getCurrentIdx()
    const visible = window.scrollY > window.innerHeight * 0.35

    btn.classList.toggle('is-visible', visible)

    // Atualiza aria-label de acordo com o contexto
    btn.setAttribute(
      'aria-label',
      idx === 0 ? 'Voltar ao topo' : `Ir para: ${sections[idx - 1].id.replace(/-/g, ' ')}`
    )
  }

  window.addEventListener('scroll', update, { passive: true })
  update()

  btn.addEventListener('click', () => {
    const idx = getCurrentIdx()
    if (idx > 0) {
      sections[idx - 1].scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })
}
