// ============================================================
// calculadora.refatorada.ts — VERSÃO MELHORADA
// Projeto Prático 02 - Métricas de Qualidade de Software
// ✅ Refatorada com base nas métricas extraídas pelo ESLint
// ============================================================

// ✅ Tipos explícitos e bem nomeados
export type Operacao =
  | "soma"
  | "subtracao"
  | "multiplicacao"
  | "divisao"
  | "potencia"
  | "raiz";

export interface RegistroHistorico {
  a: number;
  b: number;
  operacao: Operacao;
  resultado: number | null;
  usuario?: string;
}

// ✅ Estado encapsulado — sem variáveis globais soltas
const historico: RegistroHistorico[] = [];

// ✅ Funções pequenas, responsabilidade única
function validarDivisao(b: number): boolean {
  return b !== 0;
}

function validarRadicacao(a: number): boolean {
  return a >= 0;
}

// ✅ Complexidade ciclomática baixa (≤ 5) — uso de mapa de operações
const operacoes: Partial<Record<Operacao, (a: number, b: number) => number | null>> = {
  soma: (a, b) => a + b,
  subtracao: (a, b) => a - b,
  multiplicacao: (a, b) => a * b,
  divisao: (a, b) => (validarDivisao(b) ? a / b : null),
  potencia: (a, b) => {
    const r = Math.pow(a, b);
    return isFinite(r) ? r : null;
  },
  raiz: (a) => (validarRadicacao(a) ? Math.sqrt(a) : null),
};

// ✅ Função principal limpa: sem duplicação, sem console.log, tipos explícitos
export function calcular(
  a: number,
  b: number,
  op: Operacao
): number | null {
  const fn = operacoes[op];
  if (!fn) return null;

  const resultado = fn(a, b);
  historico.push({ a, b, operacao: op, resultado });
  return resultado;
}

// ✅ Sem duplicação — reutiliza calcular()
export function calcularComLog(
  a: number,
  b: number,
  op: Operacao,
  usuario: string
): number | null {
  const resultado = calcular(a, b, op);

  const ultimo = historico[historico.length - 1];
  if (ultimo) {
    ultimo.usuario = usuario;
  }

  return resultado;
}

// ✅ Complexidade reduzida — mapa de classificação
export function classificarResultado(valor: number | null): string {
  if (valor === null) return "erro";
  if (valor === 0) return "zero";

  const positivo = valor > 0;
  const sufixo = positivo ? "positivo" : "negativo";
  const abs = Math.abs(valor);

  if (abs > 1000) return `muito grande ${sufixo}`;
  if (abs > 100) return `grande ${sufixo}`;
  return `pequeno ${sufixo}`;
}

export function obterHistorico(): RegistroHistorico[] {
  return [...historico]; // ✅ retorna cópia imutável
}

export function limparHistorico(): void {
  historico.length = 0;
}
