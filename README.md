# Projeto Prático 02 — Avaliação de Métricas de Qualidade de Software

> **Disciplina:** Qualidade de Software — BSI  
> **Tema:** Atributos de Software e Métricas (ISO/IEC 25010)  
> **Linguagem:** TypeScript  
> **Ferramenta de análise:** ESLint + @typescript-eslint  

---

## 📁 Estrutura do Projeto

```
sonarcloud_examples/
├── src/
│   ├── calculadora.ts            # Versão ORIGINAL — com problemas de qualidade
│   ├── calculadora.refatorada.ts # Versão MELHORADA — após análise das métricas
│   └── calculadora.test.ts       # 23 casos de teste unitários (Jest)
├── .eslintrc.js                  # Configuração do ESLint
├── tsconfig.json                 # Configuração do TypeScript
├── jest.config.js                # Configuração do Jest (cobertura)
└── package.json                  # Dependências do projeto
```

---

## ⚙️ Instalação

```bash
npm install
```

---

## 🔍 Análise Estática (ESLint)

Rodar o ESLint no código **original** (com problemas):

```bash
npm run lint
# ou diretamente:
npx eslint src/calculadora.ts --ext .ts
```

Rodar no código **refatorado** (para comparar):

```bash
npx eslint src/calculadora.refatorada.ts --ext .ts
```

---

## 🧪 Testes e Cobertura (Jest)

```bash
npm test
```

Gera o relatório de cobertura em `reports/coverage/`.

---

## 📊 Resultados das Métricas

| Métrica | Versão Original | Versão Refatorada |
|---|---|---|
| Problemas ESLint | ❌ 57 (20 erros) | ✅ 1 aviso |
| Complexidade ciclomática máx. | ~12 | ≤ 6 |
| Código duplicado | ~60% entre funções | 0% |
| Cobertura de testes | 0% | 100% |
| Uso de `any` | 12 ocorrências | 0 |
| Uso de `var` | 5 ocorrências | 0 |
| `console.log` em produção | 11 ocorrências | 0 |

---

## 🔗 Relação com ISO/IEC 25010

| Métrica | Atributo | Subcaracterística |
|---|---|---|
| Complexidade ciclomática alta | Manutenibilidade | Modificabilidade |
| Código duplicado | Manutenibilidade | Estabilidade |
| Cobertura de testes baixa | Confiabilidade | Maturidade / Testabilidade |
| Uso de `==` fraco | Confiabilidade | Maturidade |
| Uso de `any` | Segurança | Adequação funcional |
| `console.log` em produção | Segurança | Confidencialidade |

---

## 🛠️ Principais Melhorias Aplicadas

- **Complexidade reduzida:** cadeia de `if/else if` substituída por mapa de funções (`Record<Operacao, fn>`)
- **Duplicação eliminada:** `calcularComLog` passou a reutilizar `calcular` internamente
- **Tipagem completa:** tipos e interfaces explícitos (`Operacao`, `RegistroHistorico`), zero `any`
- **Testes adicionados:** 23 casos cobrindo todos os caminhos, incluindo bordas (divisão por zero, raiz negativa, `Infinity`)
- **Boas práticas:** `const`/`let` em vez de `var`, `===` em vez de `==`, sem `console.log` em código de produção
