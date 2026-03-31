# imersaobitrix24 — CLAUDE.md

## Stack
- **Framework:** HTML/CSS/JS vanilla
- **Bundler:** Vite v6
- **CSS:** Tailwind CSS v4 (CSS-first config via `@theme`)
- **Deploy:** Vercel (branch `claude/bitrix24-landing-page-rCEWm`)

## Skills a consultar antes de implementar

```
HTML e CSS:       .agnostic-core/skills/frontend/html-css-audit.md
CSS Governance:   .agnostic-core/skills/frontend/css-governance.md
Acessibilidade:   .agnostic-core/skills/frontend/accessibility.md
UX Guidelines:    .agnostic-core/skills/frontend/ux-guidelines.md
SEO:              .agnostic-core/skills/frontend/seo-checklist.md
Tailwind:         .agnostic-core/skills/frontend/tailwind-patterns.md
UX/UI Princípios: .agnostic-core/skills/ux-ui/principios-de-interface.md
```

---

## Regras de Interface

### Sem emojis — sempre ícones SVG

**Regra:** Nunca usar emojis na interface. Usar exclusivamente ícones SVG inline.

**Por quê:**
- Emojis têm renderização inconsistente entre sistemas operacionais e browsers
- SVGs respeitam a identidade visual (cor, peso, tamanho controlados por CSS)
- Ícones funccionais precisam de `aria-label` — SVGs suportam acessibilidade nativa
- Alinhado com `.agnostic-core/skills/frontend/accessibility.md`:
  > `[CRITICA]` Componentes de UI (bordas de input, **ícones funcionais**, indicadores de estado): contraste mínimo 3:1 vs fundo adjacente
  > `[ALTA]` Botões com ícone apenas: `aria-label` obrigatório
  > `[ALTA]` Status de formulário não depende apenas de cor — usar **ícone** ou texto adicional
- Alinhado com `.agnostic-core/skills/frontend/ux-guidelines.md`:
  > `[ALTA]` Campo com erro tem estado visual claro (borda vermelha não é suficiente sem **ícone**/texto)

**Padrão adotado:** SVGs inline estilo Lucide (24×24 viewBox, stroke-based, `stroke-width="1.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`).

**Ícones decorativos:** `aria-hidden="true"` obrigatório.
**Ícones funcionais (botões sem texto):** `aria-label` obrigatório no elemento pai.

Exemplo correto:
```html
<!-- Decorativo -->
<div class="pain-icon" aria-hidden="true">
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
       viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
</div>

<!-- Funcional -->
<button aria-label="Fechar">
  <svg ...><line x1="18" y1="6" x2="6" y2="18"/>...</svg>
</button>
```

---

## Debug Mobile (obrigatório)

Eruda já injetado via plugin Vite (`vite.config.js`).

- **Dev:** carrega automaticamente
- **Produção:** acesse `?debug=true` na URL
- Aba **Report** → gera Markdown para colar no Claude Code

---

## Variáveis de ambiente

```
VITE_BITRIX24_WEBHOOK_URL=https://SEU_DOMINIO.bitrix24.com.br/rest/USER_ID/TOKEN/crm.lead.add.json
```
Configurar no painel Vercel quando o domínio estiver disponível.

---

## Conteúdo pendente (substituir placeholders)

- [ ] `src/assets/images/apresentadora/` — foto da apresentadora
- [ ] `src/assets/images/depoimentos/` — fotos dos depoimentos
- [ ] `src/assets/images/og/og-image.jpg` — imagem Open Graph 1200×630px
- [ ] Seção Autoridade: nome, bio, estatísticas reais
- [ ] Seção Depoimentos: nomes, cargos, empresas, fotos reais
