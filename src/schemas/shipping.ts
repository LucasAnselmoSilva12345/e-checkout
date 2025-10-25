import { z } from 'zod';

export const shippingSchema = z.object({
  zip: z
    .string()
    .regex(/^\d{5}-\d{3}$/, 'CEP inválido (formato: 00000-000)'),
  address: z.string().min(3, 'Informe o endereço'),
  number: z.string().min(1, 'Informe o número'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Informe o bairro'),
  city: z.string().min(2, 'Informe a cidade'),
  state: z
    .string()
    .length(2, 'Informe o estado com 2 letras (ex: SP)')
    .toUpperCase(),
});

export type ShippingData = z.infer<typeof shippingSchema>;
