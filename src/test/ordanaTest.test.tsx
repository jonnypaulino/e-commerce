import { ordenarList } from "../controller/controller";

describe("ordenarList", () => {
  it("deve ordenar os itens por preço crescente", () => {
    const products = {
      items: [
        {
          id: 12,
          name: "Carregador Portátil",
          price: 29.99,
          date: "2024-01-01",
          imagem: [
            "https://images-americanas.b2w.io/produtos/51199863/imagens/novo-carregador-portatil-power-bank-original-pineng-10000mah-dual-usb/51199865_1_large.jpg",
          ],
          description: "Carregador portátil para dispositivos eletrônicos",
          type: "Acessório",
        },
        {
          id: 11,
          name: "Webcam HD",
          price: 49.99,
          date: "2024-01-02",
          imagem: [
            "https://m.media-amazon.com/images/I/51OEgiWAoKL._AC_UF1000,1000_QL80_.jpg",
          ],
          description: "Webcam de alta definição para videoconferências",
          type: "Acessório",
        },
      ],
    };

    const sortedProducts = ordenarList(1, products); // Chamada da função ordenarList

    // Verifica se os produtos foram ordenados corretamente por preço crescente
    expect(sortedProducts.items[0].price).toBe(29.99);
    expect(sortedProducts.items[1].price).toBe(49.99);
  });
});
