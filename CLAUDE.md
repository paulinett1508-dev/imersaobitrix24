# imersaobitrix24 — CLAUDE.md

## Stack
- **Framework:** HTML/CSS/JS vanilla
- **Bundler:** Vite v6
- **CSS:** Tailwind CSS v4 (CSS-first config via `@theme`)
- **Deploy:** Vercel — branch `main` → produção automática

## Repositório e Infraestrutura

| Recurso | Valor |
|---|---|
| GitHub | `paulinett1508-dev/imersaobitrix24` |
| Branch de produção | `main` |
| Vercel Project ID | `prj_Xwdd8DnyUfMi4mPbIEIdLbhfUS1c` |
| Vercel Team | `team_OnJtxRkyO6cDOxsd1E9nWHmO` (paulinett1508-9618s-projects) |
| URL atual (protótipo) | `imersaobitrix24-git-main-paulinett1508-9618s-projects.vercel.app` |
| URL de produção (alvo) | `imersaobitrix24.traevo.com.br` |

> Todo push para `main` aciona deploy automático no Vercel.

---

## Skills a consultar antes de implementar

### Frontend & UX (consultar antes de qualquer mudança visual)
```
HTML e CSS:          .agnostic-core/skills/frontend/html-css-audit.md
CSS Governance:      .agnostic-core/skills/frontend/css-governance.md
Acessibilidade:      .agnostic-core/skills/frontend/accessibility.md
UX Guidelines:       .agnostic-core/skills/frontend/ux-guidelines.md
SEO:                 .agnostic-core/skills/frontend/seo-checklist.md
Tailwind:            .agnostic-core/skills/frontend/tailwind-patterns.md
UX/UI Princípios:    .agnostic-core/skills/ux-ui/principios-de-interface.md
Menos é Mais:        .agnostic-core/skills/frontend/menos-e-mais.md
Responsividade:      .agnostic-core/skills/frontend/responsive-breakpoint-table.md
Quality Gates UX:    .agnostic-core/skills/ux-ui/ui-ux-quality-gates.md
Navegação:           .agnostic-core/skills/ux-ui/navegacao-sem-redundancia.md
Visual Baseline:     .agnostic-core/skills/design/visual-baseline.md
```

### Audit & Qualidade (consultar antes de fechar qualquer feature ou deploy)
```
Validação geral:     .agnostic-core/skills/audit/validation-checklist.md
Performance:         .agnostic-core/skills/audit/performance-audit.md
Pós-implementação:   .agnostic-core/skills/audit/post-implementation-conformity.md
Revisão de copy PT:  .agnostic-core/skills/audit/revisao-texto-ptbr.md
Detect hardcodes:    .agnostic-core/skills/audit/detect-hardcodes.md
Senior verification: .agnostic-core/skills/audit/senior-verification-protocol.md
```

### AI & Desenvolvimento
```
AI anti-patterns:    .agnostic-core/skills/ai/ai-problems-detection.md
Model routing:       .agnostic-core/skills/ai/model-routing.md
```

---

## Regras de Interface

### Sem emojis — sempre ícones SVG

**Regra:** Nunca usar emojis na interface. Usar exclusivamente ícones SVG inline.

**Por quê:**
- Emojis têm renderização inconsistente entre sistemas operacionais e browsers
- SVGs respeitam a identidade visual (cor, peso, tamanho controlados por CSS)
- Ícones funcionais precisam de `aria-label` — SVGs suportam acessibilidade nativa
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

Configurar no painel Vercel → Settings → Environment Variables.
Obrigatório para o formulário de inscrição funcionar em produção.

---

## Conteúdo pendente (substituir placeholders)

- [x] `src/assets/images/apresentadora/perfil_lais.svg` — foto da Laís Feitosa (concluído)
- [ ] `src/assets/images/depoimentos/` — fotos reais dos depoimentos
- [ ] `src/assets/images/og/og-image.jpg` — imagem Open Graph 1200×630px
- [ ] Seção Autoridade: bio real + estatísticas reais (empresas, anos, profissionais)
- [ ] Seção Depoimentos: nomes, cargos, empresas e fotos reais
- [ ] Rodapé — redes sociais: URLs do WhatsApp, Facebook e LinkedIn da Traevo
  - Instagram já configurado: `https://www.instagram.com/traevo.br`
  - WhatsApp, Facebook, LinkedIn: `href="#"` com tooltip "Aguardando informação"

---

## Checklist — Migração para Domínio Próprio

Quando o projeto sair do protótipo Vercel e ir para `imersaobitrix24.traevo.com.br`
(ou domínio equivalente), executar os passos abaixo **nessa ordem**:

### 1. Configurar domínio no Vercel
- Painel Vercel → Project `imersaobitrix24` → Settings → Domains
- Adicionar `imersaobitrix24.traevo.com.br`
- Criar registro CNAME no DNS da Traevo apontando para `cname.vercel-dns.com`
- Aguardar propagação (normalmente < 1h)

### 2. Atualizar URLs canônicas no `index.html`
Todos os metadados de SEO estão hardcoded com o domínio alvo. Confirmar que estão corretos:
```html
<link rel="canonical" href="https://imersaobitrix24.traevo.com.br/" />
<meta property="og:url" content="https://imersaobitrix24.traevo.com.br/" />
<meta property="og:image" content="https://imersaobitrix24.traevo.com.br/og-image.jpg" />
```
Se o domínio final for diferente, fazer busca+substituição global por `imersaobitrix24.traevo.com.br`.

### 3. Configurar variável de ambiente no Vercel
- Painel Vercel → Project → Settings → Environment Variables
- Adicionar: `VITE_BITRIX24_WEBHOOK_URL` = URL do webhook CRM Bitrix24
- Após adicionar, fazer redeploy (push vazio ou trigger manual)
- Testar o formulário de inscrição em produção

### 4. Adicionar imagem Open Graph
- Criar `og-image.jpg` (1200×630px) com identidade visual da Traevo/Imersão
- Colocar em `public/og-image.jpg` (raiz do `dist/` após build)
- Verificar em: `https://developers.facebook.com/tools/debug/` e `https://cards-dev.twitter.com/validator`

### 5. Substituir conteúdo placeholder
Ver seção **Conteúdo pendente** acima. Prioridade:
1. Bio e estatísticas reais da Laís Feitosa (seção Autoridade)
2. Depoimentos reais com fotos
3. URLs das redes sociais (WhatsApp, Facebook, LinkedIn)

### 6. Testar formulário end-to-end
- Preencher e submeter o formulário no domínio de produção
- Confirmar que o lead aparece no CRM Bitrix24
- Verificar mensagem de sucesso/erro na tela

### 7. Remover ou restringir Eruda em produção (opcional)
Atualmente o Eruda só carrega com `?debug=true` — comportamento seguro.
Se quiser desabilitar completamente em produção, editar `vite.config.js`:
```js
// Remover ou condicionar o plugin eruda:
eruda({ condition: false })
```

### 8. Validar SEO final
- Google Search Console: adicionar propriedade do domínio
- Submeter sitemap (não existe ainda — criar `public/sitemap.xml` se necessário)
- Verificar robots.txt (atualmente `index, follow` — correto para produção)

---

## Arquitetura dos arquivos CSS/JS

```
src/
├── main.css          # tokens de design (@theme), reset, componentes globais
├── sections.css      # estilos de cada seção (header, hero, problema, solução...)
├── main.js           # entry point — importa módulos JS
└── js/
    ├── form.js           # submit do formulário → Bitrix24 webhook
    ├── back-to-top.js    # botão flutuante de navegação por seção
    ├── social-placeholder.js  # tooltip "Aguardando informação" nos links sem URL
    └── nav.js            # menu hamburger mobile (aria-expanded)
```

### Tokens de cor (navy-black palette)
Definidos em `src/main.css` via `@theme`:

| Token | Valor | Uso |
|---|---|---|
| `--color-traevo-black` | `#060b18` | Fundo principal |
| `--color-traevo-dark` | `#0d1525` | Fundo header/cards |
| `--color-traevo-dark-2` | `#141e30` | Cards elevados |
| `--color-traevo-dark-3` | `#1e2c43` | Bordas, separadores |
| `--color-traevo-yellow` | `#f5c518` | Accent principal |
| `--color-traevo-gray` | `#6b7a96` | Texto secundário |
| `--color-traevo-gray-2` | `#9aaac4` | Texto terciário |
| `--color-traevo-white` | `#ffffff` | Texto principal |

---

## Git Workflow

- **Commit cedo e frequentemente** — após cada mudança significativa (feature, fix, refactor, estilo).
- **Push automático** — um hook PostToolUse em `.claude/settings.json` executa `git push` após cada commit.
- **Mensagens descritivas** — formato convencional: `tipo(escopo): descrição` (ex: `feat(form): add phone validation`).
- **Nunca force push** — proibido `git push --force` ou `git push -f`.
- **Trabalhe em feature branches** — nunca commitar direto na `main`. Usar branch e abrir PR.

## Uso de Subagents

- Use subagents para exploração de CSS/HTML, análise de SEO e validação de acessibilidade em paralelo
- Offload inspeção de tokens Tailwind, levantamento de seções e análise de performance para subagents
- Para ajustes em múltiplas seções da landing: um subagent por seção para execução paralela
- Referenciar `ai-problems-detection.md` antes de criar novas abstrações CSS
- Referenciar `model-routing.md` para escolher o modelo certo por tipo de tarefa (ex: Haiku para styling pontual, Sonnet/Opus para arquitetura)

## Verificação antes de Concluir

- Nunca marque tarefa como concluída sem confirmar que o deploy Vercel subiu corretamente
- Checagem obrigatória: HTML válido, nenhuma cor hardcoded, responsividade mobile testada (390px)
- Pergunta padrão: *"Um designer sênior aprovaria esse layout?"*
- Antes de fechar feature visual: `validation-checklist.md` + `ui-ux-quality-gates.md` + `senior-verification-protocol.md`
- Antes de deploy em produção: `performance-audit.md` + `post-implementation-conformity.md` + `detect-hardcodes.md`
- Após qualquer alteração de copy em PT-BR: `revisao-texto-ptbr.md`

## Elegância (features não-triviais)

- Para mudanças que tocam 3+ seções da landing: pause e avalie se há padrão CSS reutilizável
- Se um bloco Tailwind está ficando verboso: extrair para token CSS ou classe utilitária
- **Exceção:** ajustes de texto, cor ou espaçamento pontuais — não criar abstração para 1 uso
