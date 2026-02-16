'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? (
        <>
          <Loader2 className="me-2 h-4 w-4 animate-spin" />
          Verificando...
        </>
      ) : (
        <>
          <Sparkles className="me-2 h-4 w-4" />
          Verificar con IA
        </>
      )}
    </Button>
  );
}
