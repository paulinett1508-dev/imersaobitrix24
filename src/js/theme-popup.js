/**
 * Theme Popup — abre modal ao clicar em um card de tema
 *
 * Cada .theme-card deve ter:
 *   data-tema-numero  ex: "03"
 *   data-tema-titulo  ex: "A Arquitetura do CRM que Vende Sozinho"
 *   data-tema-video   ex: "https://www.youtube.com/embed/VIDEO_ID" (opcional)
 *
 * O formulário dentro do modal envia SOURCE_DESCRIPTION = "tema-{numero}"
 * via a mesma integração Bitrix24 do form.js.
 */

const WEBHOOK_URL = import.meta.env.VITE_BITRIX24_WEBHOOK_URL || ''

// Domínios permitidos para embed de vídeo
const ALLOWED_VIDEO_ORIGINS = ['https://www.youtube.com', 'https://www.youtube-nocookie.com', 'https://player.vimeo.com']

function isSafeVideoUrl(url) {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return ALLOWED_VIDEO_ORIGINS.some(origin => parsed.origin === origin)
  } catch {
    return false
  }
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function buildVideoArea(videoArea, numero, titulo, videoUrl) {
  // Limpa conteúdo anterior
  while (videoArea.firstChild) videoArea.removeChild(videoArea.firstChild)

  if (videoUrl && isSafeVideoUrl(videoUrl)) {
    const iframe = document.createElement('iframe')
    iframe.src = videoUrl
    iframe.title = `Encontro ${numero} — ${titulo}`
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
    iframe.setAttribute('allowfullscreen', '')
    iframe.loading = 'lazy'
    videoArea.appendChild(iframe)
  } else {
    const placeholder = document.createElement('div')
    placeholder.className = 'tp-video-placeholder'

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('aria-hidden', 'true')
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.setAttribute('width', '48')
    svg.setAttribute('height', '48')
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('stroke', 'currentColor')
    svg.setAttribute('stroke-width', '1.5')
    svg.setAttribute('stroke-linecap', 'round')
    svg.setAttribute('stroke-linejoin', 'round')
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', '12'); circle.setAttribute('cy', '12'); circle.setAttribute('r', '10')
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    polygon.setAttribute('points', '10 8 16 12 10 16 10 8')
    svg.appendChild(circle); svg.appendChild(polygon)

    const p = document.createElement('p')
    p.textContent = 'Vídeo em breve'

    const span = document.createElement('span')
    span.textContent = 'Inscreva-se para ser notificado quando este conteúdo for publicado.'

    placeholder.appendChild(svg)
    placeholder.appendChild(p)
    placeholder.appendChild(span)
    videoArea.appendChild(placeholder)
  }
}

function openPopup(numero, titulo, videoUrl) {
  const overlay = document.getElementById('theme-popup-overlay')
  if (!overlay) return

  // Preenche título com texto seguro
  const tituloEl = overlay.querySelector('.tp-titulo')
  if (tituloEl) tituloEl.textContent = `Encontro ${numero} — ${titulo}`

  // Preenche área de vídeo via DOM seguro
  const videoArea = overlay.querySelector('.tp-video-area')
  if (videoArea) buildVideoArea(videoArea, numero, titulo, videoUrl)

  // Marca o tema no campo hidden do formulário
  const temaInput = overlay.querySelector('input[name="tema"]')
  if (temaInput) temaInput.value = `Encontro ${numero} — ${titulo}`

  // Reseta o formulário e feedback
  const form = overlay.querySelector('#form-tema')
  if (form) {
    form.reset()
    form.querySelectorAll('.is-error').forEach(el => el.classList.remove('is-error'))
    form.querySelectorAll('.field-error').forEach(el => (el.textContent = ''))
    const fb = form.querySelector('.form-feedback')
    if (fb) { fb.hidden = true; fb.className = 'form-feedback' }
    const btn = form.querySelector('[type="submit"]')
    if (btn) btn.disabled = false
    const btnText = form.querySelector('.btn-text')
    if (btnText) btnText.removeAttribute('hidden')
    const btnLoad = form.querySelector('.btn-loading')
    if (btnLoad) btnLoad.hidden = true
    // Re-seta o tema após form.reset()
    if (temaInput) temaInput.value = `Encontro ${numero} — ${titulo}`
  }

  overlay.removeAttribute('hidden')
  overlay.classList.add('is-open')
  document.body.style.overflow = 'hidden'

  setTimeout(() => {
    const firstInput = overlay.querySelector('input:not([type="hidden"])')
    if (firstInput) firstInput.focus()
  }, 60)
}

function closePopup() {
  const overlay = document.getElementById('theme-popup-overlay')
  if (!overlay) return

  overlay.classList.remove('is-open')
  document.body.style.overflow = ''

  // Para o vídeo limpando o container após a transição
  setTimeout(() => {
    overlay.setAttribute('hidden', '')
    const videoArea = overlay.querySelector('.tp-video-area')
    if (videoArea) while (videoArea.firstChild) videoArea.removeChild(videoArea.firstChild)
  }, 300)

  // Retorna o foco ao card que abriu o modal
  if (overlay._lastTrigger) {
    overlay._lastTrigger.focus()
    overlay._lastTrigger = null
  }
}

// ─── submit do formulário de tema ────────────────────────────────────────────

function validateInput(input) {
  const error = input.closest('.form-field')?.querySelector('.field-error')
  let msg = ''
  if (input.required && !input.value.trim()) msg = 'Este campo é obrigatório.'
  else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    msg = 'Informe um e-mail válido.'
  }
  input.classList.toggle('is-error', !!msg)
  if (error) error.textContent = msg
  return !msg
}

async function submitTemaForm(form) {
  const inputs   = form.querySelectorAll('input:not([type="hidden"])')
  const btnText  = form.querySelector('.btn-text')
  const btnLoad  = form.querySelector('.btn-loading')
  const feedback = form.querySelector('.form-feedback')
  const btn      = form.querySelector('[type="submit"]')
  const tema     = form.querySelector('input[name="tema"]')?.value || ''

  let valid = true
  inputs.forEach(input => { if (!validateInput(input)) valid = false })
  if (!valid) return

  btn.disabled = true
  btnText?.toggleAttribute('hidden', true)
  btnLoad?.removeAttribute('hidden')
  if (feedback) { feedback.hidden = true; feedback.className = 'form-feedback' }

  const data = Object.fromEntries(new FormData(form))

  try {
    if (!WEBHOOK_URL) throw new Error('WEBHOOK_URL não configurada.')

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          NAME:  data.name  || '',
          EMAIL: data.email || '',
          PHONE: data.phone || '',
          SOURCE_DESCRIPTION: `Imersão Bitrix24 — ${tema}`,
        },
      }),
    })

    if (feedback) {
      feedback.hidden = false
      feedback.classList.add('is-success')
      feedback.textContent = 'Inscrição confirmada! Você receberá o link por e-mail.'
    }
    form.reset()
    inputs.forEach(i => i.classList.remove('is-error'))
    const temaInput = form.querySelector('input[name="tema"]')
    if (temaInput) temaInput.value = tema

  } catch {
    if (feedback) {
      feedback.hidden = false
      feedback.classList.add('is-error')
      feedback.textContent = 'Ops! Ocorreu um erro. Tente novamente.'
    }
  } finally {
    btn.disabled = false
    btnText?.removeAttribute('hidden')
    btnLoad?.toggleAttribute('hidden', true)
  }
}

// ─── init ─────────────────────────────────────────────────────────────────────

function initThemePopup() {
  const overlay = document.getElementById('theme-popup-overlay')
  if (!overlay) return

  // Clique nos cards de tema
  document.querySelectorAll('.theme-card').forEach(card => {
    card.setAttribute('tabindex', '0')
    card.setAttribute('role', 'button')

    card.addEventListener('click', () => {
      const numero = card.dataset.temaNumero || ''
      const titulo = card.dataset.temaTitulo || ''
      const video  = card.dataset.temaVideo  || ''
      overlay._lastTrigger = card
      openPopup(numero, titulo, video)
    })

    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        card.click()
      }
    })
  })

  // Fecha ao clicar no fundo do overlay
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePopup()
  })

  // Botão fechar
  overlay.querySelector('.tp-close')?.addEventListener('click', closePopup)

  // ESC fecha
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closePopup()
  })

  // Submit do formulário
  const form = document.getElementById('form-tema')
  if (form) {
    form.querySelectorAll('input:not([type="hidden"])').forEach(input => {
      input.addEventListener('blur', () => validateInput(input))
      input.addEventListener('input', () => {
        if (input.classList.contains('is-error')) validateInput(input)
      })
    })
    form.addEventListener('submit', e => {
      e.preventDefault()
      submitTemaForm(form)
    })
  }
}

initThemePopup()
