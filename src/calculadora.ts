// ============================================================
// calculadora.ts — VERSÃO ORIGINAL (com problemas de qualidade)
// Projeto Prático 02 - Métricas de Qualidade de Software
// Ferramenta: ESLint + @typescript-eslint
// ============================================================

// ❌ CODE SMELL: variáveis com nome de uma letra
var x: any = 0;
var y: any = 0;

// ❌ CODE SMELL: uso de 'var' em vez de 'let'/'const'
var historico: any[] = [];

// ❌ COMPLEXIDADE ALTA: função com ciclomática > 5
// ❌ LINHAS EXCESSIVAS por função
export function calcular(a: any, b: any, operacao: any): any {
  var resultado: any;

  if (operacao == "soma") {        // ❌ usa == em vez de ===
    resultado = a + b;
    if (resultado > 1000) {
      console.log("Resultado alto!");    // ❌ no-console
      if (resultado > 10000) {
        console.log("Resultado muito alto!");
      }
    }
  } else if (operacao == "subtracao") {
    resultado = a - b;
    if (resultado < 0) {
      console.log("Resultado negativo!");
      if (resultado < -1000) {
        console.log("Resultado muito negativo!");
      }
    }
  } else if (operacao == "multiplicacao") {
    resultado = a * b;
    if (resultado > 1000000) {
      console.log("Overflow possível!");
    }
  } else if (operacao == "divisao") {
    if (b == 0) {                  // ❌ usa == em vez de ===
      console.log("Erro: divisão por zero!");
      return null;
    }
    resultado = a / b;
  } else if (operacao == "potencia") {
    resultado = Math.pow(a, b);
    if (resultado === Infinity) {
      console.log("Infinito!");
      return null;
    }
  } else if (operacao == "raiz") {
    if (a < 0) {
      console.log("Raiz de número negativo!");
      return null;
    }
    resultado = Math.sqrt(a);
  } else {
    console.log("Operação inválida");
    return null;
  }

  // ❌ DUPLICAÇÃO: bloco repetido abaixo
  historico.push({ a, b, operacao, resultado });
  x = resultado;
  y = operacao;
  return resultado;
}

// ❌ DUPLICAÇÃO: função quase idêntica à de cima
export function calcularComLog(a: any, b: any, operacao: any, usuario: any): any {
  var resultado: any;

  if (operacao == "soma") {
    resultado = a + b;
    if (resultado > 1000) {
      console.log("Resultado alto!");
      if (resultado > 10000) {
        console.log("Resultado muito alto!");
      }
    }
  } else if (operacao == "subtracao") {
    resultado = a - b;
    if (resultado < 0) {
      console.log("Resultado negativo!");
    }
  } else if (operacao == "multiplicacao") {
    resultado = a * b;
  } else if (operacao == "divisao") {
    if (b == 0) {
      return null;
    }
    resultado = a / b;
  } else {
    return null;
  }

  // ❌ DUPLICAÇÃO: mesmo push do historico
  historico.push({ a, b, operacao, resultado, usuario });
  x = resultado;
  console.log(`[LOG] ${usuario} calculou: ${a} ${operacao} ${b} = ${resultado}`);
  return resultado;
}

// ❌ CODE SMELL: função sem retorno tipado
// ❌ COMPLEXIDADE: muitos ifs aninhados
export function classificarResultado(valor: any) {
  if (valor == null) {
    return "erro";
  } else {
    if (valor > 0) {
      if (valor > 100) {
        if (valor > 1000) {
          return "muito grande positivo";
        } else {
          return "grande positivo";
        }
      } else {
        return "pequeno positivo";
      }
    } else if (valor < 0) {
      if (valor < -100) {
        return "muito negativo";
      } else {
        return "pequeno negativo";
      }
    } else {
      return "zero";
    }
  }
}

// ❌ CODE SMELL: variável global desnecessária
export function obterHistorico() {
  return historico;
}

export function limparHistorico() {
  historico = [];
  x = 0;
  y = 0;
}
