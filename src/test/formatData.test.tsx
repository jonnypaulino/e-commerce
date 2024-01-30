import { formatarData } from "../controller/controller";

describe("formatarData", () => {
  it("deve formatar corretamente uma data", () => {
    // Data de exemplo
    const data = new Date("2024-01-29");

    // Formato esperado: '29/01/2024'
    expect(formatarData(data)).toBe("29/01/2024");
  });
});
