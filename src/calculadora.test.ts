// ============================================================
// calculadora.test.ts — Testes unitários
// Projeto Prático 02 - Cobertura de testes
// ============================================================
import { calcular, calcularComLog, classificarResultado, obterHistorico, limparHistorico } from "./calculadora.refatorada";

beforeEach(() => {
  limparHistorico();
});

describe("calcular — operações básicas", () => {
  test("soma de dois números positivos", () => {
    expect(calcular(5, 3, "soma")).toBe(8);
  });

  test("subtração resulta em negativo", () => {
    expect(calcular(2, 10, "subtracao")).toBe(-8);
  });

  test("multiplicação", () => {
    expect(calcular(4, 5, "multiplicacao")).toBe(20);
  });

  test("divisão normal", () => {
    expect(calcular(10, 2, "divisao")).toBe(5);
  });

  test("divisão por zero retorna null", () => {
    expect(calcular(10, 0, "divisao")).toBeNull();
  });

  test("potência", () => {
    expect(calcular(2, 10, "potencia")).toBe(1024);
  });

  test("potência com Infinity retorna null", () => {
    expect(calcular(10, 10000, "potencia")).toBeNull();
  });

  test("raiz quadrada", () => {
    expect(calcular(9, 0, "raiz")).toBeCloseTo(3);
  });

  test("raiz de número negativo retorna null", () => {
    expect(calcular(-4, 0, "raiz")).toBeNull();
  });
});

describe("calcular — operação inválida", () => {
  test("operação desconhecida retorna null", () => {
    // @ts-expect-error — teste intencional com valor inválido
    expect(calcular(1, 2, "modulo")).toBeNull();
  });
});

describe("calcularComLog", () => {
  test("retorna mesmo resultado que calcular", () => {
    const r1 = calcular(6, 3, "divisao");
    limparHistorico();
    const r2 = calcularComLog(6, 3, "divisao", "teste");
    expect(r1).toBe(r2);
  });

  test("registra usuário no histórico", () => {
    calcularComLog(2, 3, "soma", "Alice");
    const h = obterHistorico();
    expect(h[0].usuario).toBe("Alice");
  });
});

describe("classificarResultado", () => {
  test("null → erro", () => expect(classificarResultado(null)).toBe("erro"));
  test("0 → zero", () => expect(classificarResultado(0)).toBe("zero"));
  test("50 → pequeno positivo", () => expect(classificarResultado(50)).toBe("pequeno positivo"));
  test("500 → grande positivo", () => expect(classificarResultado(500)).toBe("grande positivo"));
  test("2000 → muito grande positivo", () => expect(classificarResultado(2000)).toBe("muito grande positivo"));
  test("-50 → pequeno negativo", () => expect(classificarResultado(-50)).toBe("pequeno negativo"));
  test("-500 → grande negativo", () => expect(classificarResultado(-500)).toBe("grande negativo"));
  test("-2000 → muito grande negativo", () => expect(classificarResultado(-2000)).toBe("muito grande negativo"));
});

describe("obterHistorico", () => {
  test("começa vazio", () => {
    expect(obterHistorico()).toHaveLength(0);
  });

  test("registra operações", () => {
    calcular(1, 2, "soma");
    calcular(3, 4, "multiplicacao");
    expect(obterHistorico()).toHaveLength(2);
  });

  test("retorna cópia — não altera o histórico interno", () => {
    calcular(1, 1, "soma");
    const h = obterHistorico();
    h.pop();
    expect(obterHistorico()).toHaveLength(1);
  });
});
