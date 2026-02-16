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

const referenceData = [
  { func: 'Sine', abbr: 'sin(θ)', relation: 'opposite / hypotenuse' },
  { func: 'Cosine', abbr: 'cos(θ)', relation: 'adjacent / hypotenuse' },
  { func: 'Tangent', abbr: 'tan(θ)', relation: 'sin(θ) / cos(θ)' },
  { func: 'Cosecant', abbr: 'csc(θ)', relation: '1 / sin(θ)' },
  { func: 'Secant', abbr: 'sec(θ)', relation: '1 / cos(θ)' },
  { func: 'Cotangent', abbr: 'cot(θ)', relation: '1 / tan(θ)' },
];

export function TrigReferenceSheet() {
  return (
    <SheetContent className="w-full max-w-full p-0 sm:max-w-lg">
      <SheetHeader className="p-6">
        <SheetTitle>Trigonometric Functions Reference</SheetTitle>
        <SheetDescription>
          A quick reference for common trigonometric functions and their properties.
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Function</TableHead>
                <TableHead>Abbreviation</TableHead>
                <TableHead>Relation</TableHead>
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
