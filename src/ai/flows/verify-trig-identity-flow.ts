'use server';
/**
 * @fileOverview A Genkit flow for verifying trigonometric identities step-by-step.
 *
 * - verifyTrigIdentity - A function that handles the verification of a trigonometric identity.
 * - VerifyTrigIdentityInput - The input type for the verifyTrigIdentity function.
 * - VerifyTrigIdentityOutput - The return type for the verifyTrigIdentity function.
 * - VerificationStrategy - The type for the verification strategy.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const VerificationStrategySchema = z.enum(['simplify-left', 'simplify-right', 'sides']);
export type VerificationStrategy = z.infer<typeof VerificationStrategySchema>;

const VerifyTrigIdentityInputSchema = z.object({
  identity: z
    .string()
    .describe('La identidad trigonométrica a verificar, ej., "sen(x)^2 + cos(x)^2 = 1"'),
  strategy: VerificationStrategySchema.describe('La estrategia a utilizar para la verificación.'),
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

const strategyDescriptions: Record<VerificationStrategy, string> = {
  'simplify-left': 'Simplifica el lado izquierdo de la ecuación hasta que coincida con el lado derecho. No modifiques el lado derecho.',
  'simplify-right': 'Simplifica el lado derecho de la ecuación hasta que coincida con el lado izquierdo. No modifiques el lado izquierdo.',
  'sides': 'Sustituye cada función trigonométrica (sen, cos, tan, csc, sec, cot) por su definición en términos de los lados de un triángulo rectángulo (opuesto, adyacente, hipotenusa). Luego, simplifica algebraicamente la expresión resultante para verificar si ambos lados de la ecuación son idénticos.',
};

export async function verifyTrigIdentity(
  input: VerifyTrigIdentityInput
): Promise<VerifyTrigIdentityOutput> {
  return verifyTrigIdentityFlow(input);
}

const PromptInputSchema = VerifyTrigIdentityInputSchema.extend({
  strategyDescription: z.string(),
});

const prompt = ai.definePrompt({
  name: 'verifyTrigIdentityPrompt',
  input: { schema: PromptInputSchema },
  output: { schema: VerifyTrigIdentityOutputSchema },
  prompt: `Eres un tutor experto en matemáticas especializado en identidades trigonométricas. Tu tarea es verificar si una identidad trigonométrica dada es verdadera o falsa, y proporcionar un proceso detallado, paso a paso, que lleve a la conclusión.

Utilizarás la siguiente estrategia de verificación:
{{{strategyDescription}}}

Para cada paso, indica claramente la expresión actual, la regla o identidad aplicada y una explicación concisa. Si la estrategia es simplificar un lado, muestra el estado de ese lado en cada paso. Si la estrategia es usar catetos/hipotenusa, muestra la ecuación completa en cada paso.

Aplica identidades trigonométricas comunes como las identidades pitagóricas (p. ej., sen^2(x) + cos^2(x) = 1), identidades de suma y diferencia (p. ej., sen(A+B) = senAcosB + cosAsenB), identidades de ángulo doble (p. ej., sen(2A) = 2senAcosA) e identidades de ángulo mitad. Incluye también manipulaciones algebraicas básicas.

Finalmente, proporciona una declaración clara que indique si la identidad es verdadera o falsa.

Identidad de entrada: {{{identity}}}`,
});

const verifyTrigIdentityFlow = ai.defineFlow(
  {
    name: 'verifyTrigIdentityFlow',
    inputSchema: VerifyTrigIdentityInputSchema,
    outputSchema: VerifyTrigIdentityOutputSchema,
  },
  async (input) => {
    const strategyDescription = strategyDescriptions[input.strategy];

    const promptInput = {
      ...input,
      strategyDescription,
    };
    
    const { output } = await prompt(promptInput);
    return output!;
  }
);
