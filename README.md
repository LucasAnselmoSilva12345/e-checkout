# Projeto E-checkout

Um projeto de **e-commerce** desenvolvido em Next.js com TypeScript, usando ShadCN UI para componentes e validação de formulários com Zod. O checkout é dividido em etapas: Customer, Shipping e Payment, com suporte a pagamento via cartão e PIX.

---

## Menu de Conteúdos

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
  - [Página Customer](#página-customer)
  - [Página Shipping](#página-shipping)
  - [Página Payment](#página-payment)
- [Regras de Validação](#regras-de-validação)

---

## Sobre o Projeto

Este projeto simula um **fluxo completo de checkout** em um e-commerce:

1. **Identificação do cliente** (Customer)
2. **Endereço de entrega** (Shipping)
3. **Pagamento** (Payment)
4. **Acompanhamento do pagamento via PIX**

---

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) para validação de formulários
- [ShadCN UI](https://ui.shadcn.com/) para componentes
- [Tailwind CSS](https://tailwindcss.com/) para estilização

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/LucasAnselmoSilva12345/e-checkout.git
cd e-checkout
```

2. Instale as dependências:

```bash
npm install
# ou
yarn
```

3. Execução:

```bash
npm run dev
# ou
yarn dev
```

## Estrutura do Projeto

### Página Customer

- Localização: /components/checkout/CustomerForm.tsx
- Função: Captura dados do cliente: nome, e-mail, CPF e celular
- Validação: Zod valida email, nome, CPF (formato 000.000.000-00) e telefone ((XX) XXXXX-XXXX) em tempo real
- Exemplo de uso:

```bash
<CustomerForm user={currentUser} />
```

### Página Shipping

- Localização: /components/checkout/ShippingForm.tsx
- Função: Captura endereço de entrega (CEP, rua, número, bairro, cidade, estado)
- Validação: Zod valida campos obrigatórios e formato do CEP
- Frete: Ao validar o CEP, exibe mensagem Frete grátis - entrega em até 20 dias úteis

### Página Payment

- Localização: /components/checkout/PaymentForm.tsx
- Função: Captura dados de pagamento: cartão de crédito ou PIX
- Cartão: Nome, número, validade, CVV e parcelas (1 a 10)
- Validação: Zod valida número do cartão, CVV, validade e parcelas

## Regras de Validação

### Customer

- Nome: mínimo 3 caracteres
- E-mail: válido
- CPF: formato 000.000.000-00
- Celular: formato (XX) XXXXX-XXXX

### Shipping

- Todos os campos obrigatórios
- CEP válido: 8 dígitos

### Payment

- Cartão: número (16 dígitos), CVV (3 ou 4 dígitos), validade mês/ano, nome obrigatório
- Parcelas: 1 a 10 sem juros
- PIX: apenas demonstração, botão de confirmação redireciona para página de aguardando pagamento
