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
    .describe('The trigonometric identity to verify, e.g., "sin(x)^2 + cos(x)^2 = 1"'),
});
export type VerifyTrigIdentityInput = z.infer<typeof VerifyTrigIdentityInputSchema>;

const VerificationStepSchema = z.object({
  expression: z
    .string()
    .describe('The current state of the expression after applying the rule.'),
  ruleApplied: z
    .string()
    .describe('The trigonometric rule or algebraic manipulation applied in this step.'),
  explanation: z.string().describe('A brief explanation of why this step was taken.'),
});

const VerifyTrigIdentityOutputSchema = z.object({
  isTrue: z.boolean().describe('True if the identity is verified as true, false otherwise.'),
  steps: z
    .array(VerificationStepSchema)
    .describe('A detailed, step-by-step process of verification.'),
  finalVerification: z
    .string()
    .describe('A summary of the final verification or a counter-example if the identity is false.'),
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
  prompt: `You are an expert mathematics tutor specializing in trigonometric identities. Your task is to verify if a given trigonometric identity is true or false, and provide a detailed, step-by-step process that leads to the conclusion.

You should simplify one side of the equation until it matches the other side, or show a counter-example if the identity is false. Focus on applying common trigonometric identities such as Pythagorean identities (e.g., sin^2(x) + cos^2(x) = 1), sum and difference identities (e.g., sin(A+B) = sinAcosB + cosAsinB), double angle identities (e.g., sin(2A) = 2sinAcosA), and half angle identities. Also, include basic algebraic manipulations.

For each step, clearly state the current expression, the rule or identity applied, and a concise explanation. Finally, provide a clear statement indicating whether the identity is true or false.

Input Identity: {{{identity}}}`,
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
