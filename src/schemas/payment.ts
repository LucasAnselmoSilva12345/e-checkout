import { z } from 'zod';

export const paymentSchema = z.object({
  name: z.string().min(3, 'Informe o nome'),
  number: z
    .string()
    .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Número do cartão inválido (16 dígitos)'),
  expiryMonth: z
    .string()
    .regex(/^(0[1-9]|1[0-2])$/, 'Mês inválido (MM)'),
  expiryYear: z
    .string()
    .regex(/^\d{4}$/, 'Ano inválido (YYYY)'),
  cvv: z.string().regex(/^\d{3}$/, 'CVV inválido (3 dígitos)'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido (000.000.000-00)'),
  installments: z.number().min(1).max(10, 'Máximo de 10 parcelas'),
});

export type PaymentData = z.infer<typeof paymentSchema>;
