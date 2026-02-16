'use server';

import {
  verifyTrigIdentity,
  VerifyTrigIdentityOutput,
  VerificationStrategy,
} from '@/ai/flows/verify-trig-identity-flow';
import { z } from 'zod';

const inputSchema = z.object({
  identity: z.string().min(3, 'La identidad debe tener al menos 3 caracteres.'),
  strategy: z.enum(['simplify-left', 'simplify-right', 'sides']),
});

export type FormState = {
  message: string;
  data?: VerifyTrigIdentityOutput;
  error?: boolean;
  timestamp?: number;
};

export async function handleVerifyIdentity(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = inputSchema.safeParse({
    identity: formData.get('identity'),
    strategy: formData.get('strategy'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const message = fieldErrors.identity?.[0] || fieldErrors.strategy?.[0] || 'Entrada inválida.';
    return {
      message: message,
      error: true,
      timestamp: Date.now(),
    };
  }

  try {
    const result = await verifyTrigIdentity({
      identity: validatedFields.data.identity,
      strategy: validatedFields.data.strategy as VerificationStrategy,
    });
    return {
      message: 'Verificación completa.',
      data: result,
      error: false,
      timestamp: Date.now(),
    };
  } catch (e) {
    console.error(e);
    return {
      message: 'Ocurrió un error de IA durante la verificación. Por favor, revisa tu entrada o inténtalo de nuevo más tarde.',
      error: true,
      timestamp: Date.now(),
    };
  }
}
