/**
 * Exit Intent Popup
 * Dispara quando o cursor sai pela parte superior da janela (desktop)
 * ou após 30s sem interação (mobile).
 */

const STORAGE_KEY = 'imersao_popup_shown'
const DELAY_MOBILE_MS = 30_000

let triggered = false

function openPopup() {
  if (triggered) return
  if (sessionStorage.getItem(STORAGE_KEY)) return

  triggered = true
  sessionStorage.setItem(STORAGE_KEY, '1')

  const overlay = document.getElementById('exit-popup')
  if (!overlay) return

  overlay.hidden = false
  overlay.setAttribute('aria-hidden', 'false')

  // Força reflow para animação funcionar
  overlay.getBoundingClientRect()
  overlay.classList.add('is-open')

  // Bloqueia scroll do fundo
  document.body.style.overflow = 'hidden'

  // Foca no primeiro campo
  const firstInput = overlay.querySelector('input')
  setTimeout(() => firstInput?.focus(), 100)
}

function closePopup() {
  const overlay = document.getElementById('exit-popup')
  if (!overlay) return

  overlay.classList.remove('is-open')
  document.body.style.overflow = ''

  overlay.addEventListener('transitionend', () => {
    overlay.hidden = true
    overlay.setAttribute('aria-hidden', 'true')
  }, { once: true })
}

function initExitPopup() {
  // Botões de fechar
  document.getElementById('popup-close')?.addEventListener('click', closePopup)
  document.getElementById('popup-dismiss')?.addEventListener('click', closePopup)

  // Fechar clicando no overlay (fora da caixa)
  document.getElementById('exit-popup')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closePopup()
  })

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup()
  })

  // Desktop: exit intent
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0) openPopup()
  })

  // Mobile: timeout de 30s
  const isMobile = () => window.matchMedia('(hover: none)').matches
  if (isMobile()) {
    setTimeout(openPopup, DELAY_MOBILE_MS)
  }
}

initExitPopup()
