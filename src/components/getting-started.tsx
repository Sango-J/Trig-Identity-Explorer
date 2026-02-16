import { Calculator } from 'lucide-react';

export function GettingStarted() {
  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Calculator className="h-8 w-8 text-primary" />
      </div>
      <h2 className="mt-6 font-headline text-2xl font-semibold">Verifica una Identidad Trigonométrica</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        Ingresa una identidad trigonométrica en el cuadro de texto de arriba, o selecciona un ejemplo de la barra lateral para comenzar. El verificador con IA te mostrará un desglose paso a paso.
      </p>
    </div>
  );
}
