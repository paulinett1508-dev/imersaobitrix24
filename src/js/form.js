/**
 * Formulários de inscrição — integração Bitrix24 webhook
 * Usado pelo hero, CTA final e popup de saída.
 *
 * CONFIGURAÇÃO: defina a variável WEBHOOK_URL com a URL do seu webhook Bitrix24.
 */

const WEBHOOK_URL = import.meta.env.VITE_BITRIX24_WEBHOOK_URL || ''

function validateField(input) {
  const error = input.closest('.form-field')?.querySelector('.field-error')
  let message = ''

  if (input.required && !input.value.trim()) {
    message = 'Este campo é obrigatório.'
  } else if (input.type === 'email' && input.value) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      message = 'Informe um e-mail válido.'
    }
  }

  input.classList.toggle('is-error', !!message)
  if (error) error.textContent = message
  return !message
}

async function submitForm(form) {
  const inputs   = form.querySelectorAll('input')
  const btnText  = form.querySelector('.btn-text')
  const btnLoad  = form.querySelector('.btn-loading')
  const feedback = form.querySelector('.form-feedback')
  const btn      = form.querySelector('[type="submit"]')

  // Valida todos os campos
  let valid = true
  inputs.forEach((input) => { if (!validateField(input)) valid = false })
  if (!valid) return

  // Estado de loading
  btn.disabled  = true
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
          SOURCE_DESCRIPTION: `Imersão Bitrix24 — origem: ${form.dataset.form}`,
        },
      }),
    })

    // Sucesso
    if (feedback) {
      feedback.hidden = false
      feedback.classList.add('is-success')
      feedback.textContent = 'Inscrição confirmada! Você receberá o link por e-mail.'
    }
    form.reset()
    inputs.forEach((i) => i.classList.remove('is-error'))

  } catch {
    if (feedback) {
      feedback.hidden = false
      feedback.classList.add('is-error')
      feedback.textContent = 'Ops! Ocorreu um erro. Tente novamente ou entre em contato via WhatsApp.'
    }
  } finally {
    btn.disabled = false
    btnText?.removeAttribute('hidden')
    btnLoad?.toggleAttribute('hidden', true)
  }
}

function initForms() {
  const forms = document.querySelectorAll('form[data-form]')
  forms.forEach((form) => {
    // Validação inline ao sair do campo
    form.querySelectorAll('input').forEach((input) => {
      input.addEventListener('blur', () => validateField(input))
      input.addEventListener('input', () => {
        if (input.classList.contains('is-error')) validateField(input)
      })
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      submitForm(form)
    })
  })
}

initForms()
