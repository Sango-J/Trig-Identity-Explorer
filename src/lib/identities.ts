export type IdentityCategory = 'Pythagorean' | 'Sum & Difference' | 'Double Angle' | 'Half Angle';

export interface IdentityExample {
  id: string;
  identity: string;
  category: IdentityCategory;
}

export const exampleIdentities: IdentityExample[] = [
  { id: 'py1', identity: 'sin(x)^2 + cos(x)^2 = 1', category: 'Pythagorean' },
  { id: 'py2', identity: '1 + tan(x)^2 = sec(x)^2', category: 'Pythagorean' },
  { id: 'py3', identity: '1 + cot(x)^2 = csc(x)^2', category: 'Pythagorean' },
  { id: 'sd1', identity: 'sin(a + b) = sin(a)cos(b) + cos(a)sin(b)', category: 'Sum & Difference' },
  { id: 'sd2', identity: 'cos(a - b) = cos(a)cos(b) + sin(a)sin(b)', category: 'Sum & Difference' },
  { id: 'sd3', identity: 'tan(a + b) = (tan(a) + tan(b)) / (1 - tan(a)tan(b))', category: 'Sum & Difference' },
  { id: 'da1', identity: 'sin(2x) = 2sin(x)cos(x)', category: 'Double Angle' },
  { id: 'da2', identity: 'cos(2x) = cos(x)^2 - sin(x)^2', category: 'Double Angle' },
  { id: 'da3', identity: 'tan(2x) = 2tan(x) / (1 - tan(x)^2)', category: 'Double Angle' },
  { id: 'ha1', identity: 'sin(x/2)^2 = (1 - cos(x)) / 2', category: 'Half Angle' },
  { id: 'ha2', identity: 'cos(x/2)^2 = (1 + cos(x)) / 2', category: 'Half Angle' },
  { id: 'ha3', identity: 'tan(x/2)^2 = (1 - cos(x)) / (1 + cos(x))', category: 'Half Angle' },
];
