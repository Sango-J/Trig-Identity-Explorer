'use server';

import { verifyTrigIdentity, VerifyTrigIdentityOutput } from '@/ai/flows/verify-trig-identity-flow';
import { z } from 'zod';

const inputSchema = z.object({
  identity: z.string().min(3, 'Identity must be at least 3 characters long.'),
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
      message: validatedFields.error.flatten().fieldErrors.identity?.[0] || 'Invalid input.',
      error: true,
      timestamp: Date.now(),
    };
  }

  try {
    const result = await verifyTrigIdentity({ identity: validatedFields.data.identity });
    return {
      message: 'Verification complete.',
      data: result,
      error: false,
      timestamp: Date.now(),
    };
  } catch (e) {
    console.error(e);
    return {
      message: 'An AI error occurred during verification. Please check your input or try again later.',
      error: true,
      timestamp: Date.now(),
    };
  }
}
