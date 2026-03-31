document.querySelectorAll('.social-link--placeholder').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()

    if (link.classList.contains('tip-active')) return

    link.classList.add('tip-active')
    setTimeout(() => link.classList.remove('tip-active'), 2500)
  })
})
