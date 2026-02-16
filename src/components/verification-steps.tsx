'use client';

import React from 'react';
import { VerifyTrigIdentityOutput } from '@/ai/flows/verify-trig-identity-flow';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, XCircle, ArrowDown } from 'lucide-react';

interface VerificationStepsProps {
  result: VerifyTrigIdentityOutput;
}

export function VerificationSteps({ result }: VerificationStepsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <span>Verification Result</span>
            <Badge
              variant={result.isTrue ? 'default' : 'destructive'}
              className={result.isTrue ? `bg-green-500 hover:bg-green-500/90 text-primary-foreground` : ''}
            >
              {result.isTrue ? (
                <CheckCircle2 className="mr-2 h-4 w-4" />
              ) : (
                <XCircle className="mr-2 h-4 w-4" />
              )}
              {result.isTrue ? 'Identity is True' : 'Identity is False'}
            </Badge>
          </CardTitle>
          <CardDescription>{result.finalVerification}</CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <h3 className="font-headline text-xl font-semibold">Step-by-Step Process</h3>
        {result.steps.map((step, index) => (
          <React.Fragment key={index}>
            <Card className="transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Step {index + 1}</CardTitle>
                <CardDescription>
                  <span className="font-semibold text-accent">Rule Applied: </span>
                  {step.ruleApplied}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-muted-foreground">Expression</h4>
                  <p className="font-mono rounded-md bg-muted p-3 text-sm text-muted-foreground">{step.expression}</p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-muted-foreground">Explanation</h4>
                  <p className="text-sm">{step.explanation}</p>
                </div>
              </CardContent>
            </Card>
            {index < result.steps.length - 1 && (
              <div className="flex justify-center">
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </React.Fragment>
        ))}
        <Separator />
        <p className="text-center text-sm font-semibold text-muted-foreground">End of verification.</p>
      </div>
    </div>
  );
}
