/**
 * Countdown — próxima quarta-feira às 11h (horário de Brasília)
 * Atualiza a cada segundo. Reseta automaticamente após o evento.
 */

const PAD = (n) => String(n).padStart(2, '0')

function getNextWednesday11h() {
  const now = new Date()
  const nowBRT = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }))

  const target = new Date(nowBRT)
  target.setHours(11, 0, 0, 0)

  const day = target.getDay()
  const daysUntilWed = (3 - day + 7) % 7

  if (daysUntilWed === 0 && nowBRT >= target) {
    target.setDate(target.getDate() + 7)
  } else {
    target.setDate(target.getDate() + daysUntilWed)
  }

  const diff = target.getTime() - nowBRT.getTime()
  return new Date(now.getTime() + diff)
}

function updateCountdown() {
  const elDays    = document.getElementById('cd-days')
  const elHours   = document.getElementById('cd-hours')
  const elMinutes = document.getElementById('cd-minutes')
  const elSeconds = document.getElementById('cd-seconds')

  if (!elDays) return

  const target = getNextWednesday11h()
  const diff   = target - Date.now()

  if (diff <= 0) {
    elDays.textContent    = '00'
    elHours.textContent   = '00'
    elMinutes.textContent = '00'
    elSeconds.textContent = '00'
    return
  }

  const days    = Math.floor(diff / 86_400_000)
  const hours   = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1_000)

  elDays.textContent    = PAD(days)
  elHours.textContent   = PAD(hours)
  elMinutes.textContent = PAD(minutes)
  elSeconds.textContent = PAD(seconds)
}

updateCountdown()
setInterval(updateCountdown, 1000)

// Ano dinâmico no rodapé
const yearEl = document.getElementById('footer-year')
if (yearEl) yearEl.textContent = new Date().getFullYear()
