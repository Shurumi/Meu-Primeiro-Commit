# 📈 FinCalc — Calculadora de Juros Compostos

> **Projeto Acadêmico** — Desenvolvimento Colaborativo com Git/GitHub  
> Disciplina: Desenvolvimento de Software | Tema: Atualização Financeira

---

## 📋 Sobre o Projeto

O **FinCalc** é uma calculadora web de **juros compostos** desenvolvida como projeto colaborativo para fins acadêmicos. A aplicação é 100% frontend (HTML, CSS e JavaScript puro), sem necessidade de servidor ou backend, e pode ser executada diretamente no navegador.

### Funcionalidades

- ✅ Cálculo de juros compostos com fórmula **M = C × (1 + i)ⁿ**
- ✅ Suporte a **aportes mensais** adicionais (fórmula estendida)
- ✅ Conversão automática de **taxa anual → mensal**
- ✅ **Gráfico interativo** da evolução do capital ao longo do tempo
- ✅ **Tabela detalhada** com evolução mês a mês
- ✅ **Exportação em CSV** para análise em planilhas
- ✅ Interface **responsiva** e compatível com dispositivos móveis
- ✅ Cálculo ao pressionar Enter nos campos

---

## 🚀 Como Executar

1. Clone ou baixe o repositório
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. **Nenhuma instalação ou servidor necessário!**

```bash
git clone https://github.com/Shurumi/Meu-Primeiro-Commit.git
cd Meu-Primeiro-Commit
# Abra o arquivo index.html no navegador
```

---

## 🧮 Fórmulas Utilizadas

### Juros Compostos Simples
$$M = C \times (1 + i)^n$$

| Variável | Descrição |
|----------|-----------|
| **M** | Montante final |
| **C** | Capital inicial |
| **i** | Taxa de juros por período |
| **n** | Número de períodos |

### Com Aportes Mensais (PMT)
$$M = C \times (1 + i)^n + PMT \times \frac{(1 + i)^n - 1}{i}$$

### Conversão de Taxa Anual para Mensal
$$i_{mensal} = (1 + i_{anual})^{1/12} - 1$$

---

## 🗂 Estrutura do Projeto

```
Meu-Primeiro-Commit/
├── index.html   # Estrutura e marcação HTML
├── style.css    # Estilos visuais (CSS puro)
├── script.js    # Lógica de cálculo (JavaScript puro)
└── README.md    # Esta documentação
```

---

## 📦 Versões / Releases

### v1.0.0 — Versão Funcional
> Primeira versão funcional do projeto. Foco na **lógica de cálculo** e na estrutura base da aplicação, sem ênfase em estética.

**O que inclui:**
- Cálculo correto de juros compostos
- Suporte a aportes mensais
- Conversão de taxa anual/mensal
- Exibição dos resultados principais
- Tabela de evolução básica

---

### v2.0.0 — Versão com Estética Elaborada *(em desenvolvimento)*
> Segunda versão com foco em **design premium e experiência do usuário**.

**Melhorias planejadas:**
- Interface dark mode com glassmorphism
- Animações de entrada e micro-interações
- Gráfico interativo com Chart.js
- Cards flutuantes animados no Hero
- Navegação com scroll suave
- Exportação para CSV
- Responsividade mobile completa
- Tipografia moderna (Google Fonts - Inter)
- Gradientes e efeitos visuais avançados

---

## 👥 Integrantes do Grupo

| Nome | GitHub |
|------|--------|
| Danilo | [@Shurumi](https://github.com/Shurumi) |
| Integrante 2 | @usuario2 |
| Integrante 3 | @usuario3 |
| Integrante 4 | @usuario4 |

---

## 🌿 Fluxo de Trabalho Git

Este projeto segue as boas práticas de:

- **[Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)** — branch `main` (produção) + branch `develop` (desenvolvimento)
- **[Semantic Versioning](https://semver.org/lang/pt-BR/)** — versionamento semântico (MAJOR.MINOR.PATCH)
- **[Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)** — mensagens de commit padronizadas
- **[Gitmoji](https://gitmoji.dev/)** — emojis descritivos nos commits

### Exemplos de Commits

```
✨ feat: adiciona cálculo com aportes mensais
🐛 fix: corrige conversão de taxa anual para mensal
💄 style: implementa design premium com glassmorphism
📊 feat: adiciona gráfico de evolução com Chart.js
📝 docs: atualiza README com versões e fórmulas
♻️ refactor: reorganiza funções de formatação
```

---

## 🛠 Tecnologias

- **HTML5** — Estrutura semântica
- **CSS3** — Estilos avançados (variáveis CSS, animações, grid, flexbox)
- **JavaScript (ES6+)** — Lógica de cálculo e manipulação do DOM
- **[Chart.js](https://www.chartjs.org/)** — Gráficos interativos (CDN)
- **[Google Fonts](https://fonts.google.com/)** — Tipografia Inter

---

## 📄 Licença

Projeto educacional — sem fins comerciais.