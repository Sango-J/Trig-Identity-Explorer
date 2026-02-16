'use server';

import { verifyTrigIdentity, VerifyTrigIdentityOutput } from '@/ai/flows/verify-trig-identity-flow';
import { z } from 'zod';

const inputSchema = z.object({
  identity: z.string().min(3, 'La identidad debe tener al menos 3 caracteres.'),
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
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.identity?.[0] || 'Entrada inválida.',
      error: true,
      timestamp: Date.now(),
    };
  }

  try {
    const result = await verifyTrigIdentity({ identity: validatedFields.data.identity });
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
