'use client';

import React, { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { BookOpen, SigmaSquare } from 'lucide-react';
import { handleVerifyIdentity, FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { TrigReferenceSheet } from '@/components/trig-reference-sheet';
import { ExampleSidebar } from '@/components/example-sidebar';
import { VerificationSteps } from '@/components/verification-steps';
import { GettingStarted } from '@/components/getting-started';
import { useToast } from '@/hooks/use-toast';
import { SubmitButton } from '@/components/submit-button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Skeleton } from './ui/skeleton';

const initialState: FormState = {
  message: '',
};

export function TrigExplorer() {
  const [formState, formAction] = useActionState(handleVerifyIdentity, initialState);
  const [identityInput, setIdentityInput] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (formState?.error) {
      toast({
        title: 'Error',
        description: formState.message,
        variant: 'destructive',
      });
    }
  }, [formState, toast]);

  return (
    <div className="flex h-screen w-screen flex-col bg-background text-foreground">
      <header className="flex flex-shrink-0 items-center justify-between border-b px-4 py-2 md:px-6">
        <div className="flex items-center gap-2">
          <SigmaSquare className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-xl font-bold">Explorador de Identidades Trigonométricas</h1>
        </div>
        {isClient ? (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <BookOpen className="mr-0 h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Referencia</span>
              </Button>
            </SheetTrigger>
            <TrigReferenceSheet />
          </Sheet>
        ) : (
          <Button variant="outline" disabled>
            <BookOpen className="mr-0 h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Referencia</span>
          </Button>
        )}
      </header>
      <div className="grid flex-1 overflow-hidden md:grid-cols-[320px_1fr]">
        <aside className="hidden border-r md:block">
          <ScrollArea className="h-full">
            {isClient ? (
              <ExampleSidebar onSelectIdentity={setIdentityInput} />
            ) : (
              <div className="p-4">
                <h2 className="mb-4 text-lg font-semibold tracking-tight">Ejemplos de Identidades</h2>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            )}
          </ScrollArea>
        </aside>
        <main className="flex flex-col overflow-hidden">
          <div className="flex-shrink-0 border-b p-4 md:p-6">
            <form action={formAction} className="space-y-4">
              <Label htmlFor="identity-input">Ingresa una identidad trigonométrica para verificar</Label>
              <Textarea
                id="identity-input"
                name="identity"
                value={identityInput}
                onChange={(e) => setIdentityInput(e.target.value)}
                placeholder="ej., tan(x) * cos(x) = sin(x)"
                className="min-h-[80px] text-lg"
                required
              />
              <SubmitButton />
            </form>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 md:p-6">
              {formState.data ? (
                <VerificationSteps result={formState.data} />
              ) : (
                <GettingStarted />
              )}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
