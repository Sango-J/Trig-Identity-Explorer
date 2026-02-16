'use server';
/**
 * @fileOverview A Genkit flow for verifying trigonometric identities step-by-step.
 *
 * - verifyTrigIdentity - A function that handles the verification of a trigonometric identity.
 * - VerifyTrigIdentityInput - The input type for the verifyTrigIdentity function.
 * - VerifyTrigIdentityOutput - The return type for the verifyTrigIdentity function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VerifyTrigIdentityInputSchema = z.object({
  identity: z
    .string()
    .describe('La identidad trigonométrica a verificar, ej., "sen(x)^2 + cos(x)^2 = 1"'),
});
export type VerifyTrigIdentityInput = z.infer<typeof VerifyTrigIdentityInputSchema>;

const VerificationStepSchema = z.object({
  expression: z
    .string()
    .describe('El estado actual de la expresión después de aplicar la regla.'),
  ruleApplied: z
    .string()
    .describe('La regla trigonométrica o manipulación algebraica aplicada en este paso.'),
  explanation: z.string().describe('Una breve explicación de por qué se tomó este paso.'),
});

const VerifyTrigIdentityOutputSchema = z.object({
  isTrue: z.boolean().describe('Verdadero si la identidad se verifica como verdadera, falso en caso contrario.'),
  steps: z
    .array(VerificationStepSchema)
    .describe('Un proceso de verificación detallado, paso a paso.'),
  finalVerification: z
    .string()
    .describe('Un resumen de la verificación final o un contraejemplo si la identidad es falsa.'),
});
export type VerifyTrigIdentityOutput = z.infer<typeof VerifyTrigIdentityOutputSchema>;

export async function verifyTrigIdentity(
  input: VerifyTrigIdentityInput
): Promise<VerifyTrigIdentityOutput> {
  return verifyTrigIdentityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyTrigIdentityPrompt',
  input: { schema: VerifyTrigIdentityInputSchema },
  output: { schema: VerifyTrigIdentityOutputSchema },
  prompt: `Eres un tutor experto en matemáticas especializado en identidades trigonométricas. Tu tarea es verificar si una identidad trigonométrica dada es verdadera o falsa, y proporcionar un proceso detallado, paso a paso, que lleve a la conclusión.

Debes simplificar un lado de la ecuación hasta que coincida con el otro, o mostrar un contraejemplo si la identidad es falsa. Concéntrate en aplicar identidades trigonométricas comunes como las identidades pitagóricas (p. ej., sen^2(x) + cos^2(x) = 1), identidades de suma y diferencia (p. ej., sen(A+B) = senAcosB + cosAsenB), identidades de ángulo doble (p. ej., sen(2A) = 2senAcosA) e identidades de ángulo mitad. Incluye también manipulaciones algebraicas básicas.

Para cada paso, indica claramente la expresión actual, la regla o identidad aplicada y una explicación concisa. Finalmente, proporciona una declaración clara que indique si la identidad es verdadera o falsa.

Identidad de entrada: {{{identity}}}`,
});

const verifyTrigIdentityFlow = ai.defineFlow(
  {
    name: 'verifyTrigIdentityFlow',
    inputSchema: VerifyTrigIdentityInputSchema,
    outputSchema: VerifyTrigIdentityOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
