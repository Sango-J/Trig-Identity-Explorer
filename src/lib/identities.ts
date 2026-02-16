export type IdentityCategory = 'Pitagóricas' | 'Suma y Diferencia' | 'Ángulo Doble' | 'Ángulo Mitad';

export interface IdentityExample {
  id: string;
  identity: string;
  category: IdentityCategory;
}

export const exampleIdentities: IdentityExample[] = [
  { id: 'py1', identity: 'sin(x)^2 + cos(x)^2 = 1', category: 'Pitagóricas' },
  { id: 'py2', identity: '1 + tan(x)^2 = sec(x)^2', category: 'Pitagóricas' },
  { id: 'py3', identity: '1 + cot(x)^2 = csc(x)^2', category: 'Pitagóricas' },
  { id: 'sd1', identity: 'sin(a + b) = sin(a)cos(b) + cos(a)sin(b)', category: 'Suma y Diferencia' },
  { id: 'sd2', identity: 'cos(a - b) = cos(a)cos(b) + sin(a)sin(b)', category: 'Suma y Diferencia' },
  { id: 'sd3', identity: 'tan(a + b) = (tan(a) + tan(b)) / (1 - tan(a)tan(b))', category: 'Suma y Diferencia' },
  { id: 'da1', identity: 'sin(2x) = 2sin(x)cos(x)', category: 'Ángulo Doble' },
  { id: 'da2', identity: 'cos(2x) = cos(x)^2 - sin(x)^2', category: 'Ángulo Doble' },
  { id: 'da3', identity: 'tan(2x) = 2tan(x) / (1 - tan(x)^2)', category: 'Ángulo Doble' },
  { id: 'ha1', identity: 'sin(x/2)^2 = (1 - cos(x)) / 2', category: 'Ángulo Mitad' },
  { id: 'ha2', identity: 'cos(x/2)^2 = (1 + cos(x)) / 2', category: 'Ángulo Mitad' },
  { id: 'ha3', identity: 'tan(x/2)^2 = (1 - cos(x)) / (1 + cos(x))', category: 'Ángulo Mitad' },
];
