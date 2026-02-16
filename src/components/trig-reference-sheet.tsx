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

const referenceData = [
  { func: 'Seno', abbr: 'sen(θ)', relation: 'opuesto / hipotenusa' },
  { func: 'Coseno', abbr: 'cos(θ)', relation: 'adyacente / hipotenusa' },
  { func: 'Tangente', abbr: 'tan(θ)', relation: 'sen(θ) / cos(θ)' },
  { func: 'Cosecante', abbr: 'csc(θ)', relation: '1 / sen(θ)' },
  { func: 'Secante', abbr: 'sec(θ)', relation: '1 / cos(θ)' },
  { func: 'Cotangente', abbr: 'cot(θ)', relation: '1 / tan(θ)' },
];

export function TrigReferenceSheet() {
  const { direction } = useDirection();
  return (
    <SheetContent side={direction === 'rtl' ? 'left' : 'right'} className="w-full max-w-full p-0 sm:max-w-lg">
      <SheetHeader className="p-6">
        <SheetTitle>Referencia de Funciones Trigonométricas</SheetTitle>
        <SheetDescription>
          Una referencia rápida de las funciones trigonométricas comunes y sus propiedades.
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {referenceData.map((row) => (
                <TableRow key={row.func}>
                  <TableCell className="font-medium">{row.func}</TableCell>
                  <TableCell>{row.abbr}</TableCell>
                  <TableCell>{row.relation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </SheetContent>
  );
}
