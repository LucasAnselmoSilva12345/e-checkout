import { z } from 'zod';

export const customerSchema = z.object({
  name: z
    .string()
    .min(3, 'Informe seu nome completo')
    .regex(/^[A-Za-zÀ-ú\s]+$/, 'O nome deve conter apenas letras'),
  email: z.string().email('Informe um e-mail válido'),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato de CPF inválido (000.000.000-00)'),
  phone: z
    .string()
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Número de celular inválido (ex: (11) 90000-0000)'),
});

export type CustomerData = z.infer<typeof customerSchema>;
