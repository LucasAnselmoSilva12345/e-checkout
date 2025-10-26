export type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  compare_at_price?: number;
  discount_percentage: number;
};

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Sofá Cama Bloom Tecido Boucle Cinza',
    image:
      'https://sofanacaixa.com.br/cdn/shop/files/Bloom_Boucle_-_Cinza.webp?v=1757505896&width=700',
    price: 3400,
    compare_at_price: 5999,
    discount_percentage: 10,
  },
  {
    id: '2',
    title: 'Sofá na Caixa modular 2 lugares em Boucle',
    image:
      'https://sofanacaixa.com.br/cdn/shop/files/cinza_2_24e8fb7b-ef4e-4854-8991-5941d2d21512.webp?v=1753725654&width=700',
    price: 3370,
    compare_at_price: 5171,
    discount_percentage: 10,
  },
  {
    id: '3',
    title: 'Sofá Cama Bloom Tecido Boucle Linho + Apoio de Pé Grátis',
    image:
      'https://sofanacaixa.com.br/cdn/shop/files/Bloom_Boucle_com_Apoio_-_Linho_2.webp?v=1759597669&width=700',
    price: 4200,
    compare_at_price: 5999,
    discount_percentage: 10,
  },
  {
    id: '4',
    title: 'Sofá na Caixa modular 3 lugares Poli-Couro Marrom',
    image:
      'https://sofanacaixa.com.br/cdn/shop/files/marrom_a72caabb-8477-4239-b2b4-08db436247c4.webp?v=1753725458&width=700',
    price: 5090,
    compare_at_price: 7949,
    discount_percentage: 10,
  },
  {
    id: '5',
    title: 'Sofá Modular Pelion 3 Lugares com 1 Chaise - Cinza',
    image:
      'https://sofanacaixa.com.br/cdn/shop/files/Cinza_31727c56-cabe-46ad-bfd6-6899807d5951.webp?v=1755031654&width=700',
    price: 4988,
    compare_at_price: 8389,
    discount_percentage: 10,
  },
  {
    id: '6',
    title: 'Poltrona Design 1973 Verde 2 unidades',
    image:
      'https://sofanacaixa.com.br/cdn/shop/files/Kit2-Verde.webp?v=1736345760&width=700',
    price: 3310,
    compare_at_price: 5378,
    discount_percentage: 10,
  },
  {
    id: '7',
    title: 'Puff Cama Pet Humana',
    image:
      'https://sofanacaixa.com.br/cdn/shop/files/PuffNinho_7_convert.io_2.webp?v=1728934417&width=700',
    price: 1100,
    compare_at_price: 2780,
    discount_percentage: 10,
  },
  {
    id: '8',
    title: 'Sofá Cama Bloom - Sofá na Caixa + Poltrona Bloom Laranja',
    image:
      'https://sofanacaixa.com.br/cdn/shop/files/Bloom_Linho_com_Poltrona-1.webp?v=1755029501&width=700',
    price: 4110,
    compare_at_price: 5507,
    discount_percentage: 10,
  },
];
