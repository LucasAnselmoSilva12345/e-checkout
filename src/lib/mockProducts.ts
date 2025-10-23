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
      'https://sofanacaixa.com.br/cdn/shop/files/BloomCinza-9.webp?v=1759597763&width=1400',
    price: 3060,
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
];
