'use client';

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from './ui/scroll-area';
import { useDirection } from './direction-provider';
import { Button } from './ui/button';
import { Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const referenceData = [
  { func: 'Seno', abbr: 'sin(θ)', relation: 'opuesto / hipotenusa' },
  { func: 'Coseno', abbr: 'cos(θ)', relation: 'adyacente / hipotenusa' },
  { func: 'Tangente', abbr: 'tan(θ)', relation: 'sin(θ) / cos(θ)' },
  { func: 'Cosecante', abbr: 'csc(θ)', relation: '1 / sin(θ)' },
  { func: 'Secante', abbr: 'sec(θ)', relation: '1 / cos(θ)' },
  { func: 'Cotangente', abbr: 'cot(θ)', relation: '1 / tan(θ)' },
];

export function TrigReferenceSheet() {
  const { direction } = useDirection();
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: 'Copiado',
        description: `"${text}" ha sido copiado al portapapeles.`,
      });
    });
  };

  return (
    <SheetContent side={direction === 'rtl' ? 'left' : 'right'} className="w-full max-w-full p-0 sm:max-w-lg">
      <SheetHeader className="p-6">
        <SheetTitle>Referencia de Funciones Trigonométricas</SheetTitle>
        <SheetDescription>
          Una referencia rápida de las funciones y sus propiedades. Haz clic en el ícono para copiar la abreviatura.
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Función</TableHead>
                <TableHead>Abreviatura</TableHead>
                <TableHead>Relación</TableHead>
                <TableHead className="text-right">Copiar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referenceData.map((row) => (
                <TableRow key={row.func}>
                  <TableCell className="font-medium">{row.func}</TableCell>
                  <TableCell className="font-mono">{row.abbr}</TableCell>
                  <TableCell className="font-mono">{row.relation}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleCopy(row.abbr.replace('θ', 'x'))}>
                      <Clipboard className="h-4 w-4" />
                      <span className="sr-only">Copiar {row.abbr}</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </SheetContent>
  );
}
