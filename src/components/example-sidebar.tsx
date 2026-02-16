'use client';

import React from 'react';
import { exampleIdentities, IdentityCategory } from '@/lib/identities';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

interface ExampleSidebarProps {
  onSelectIdentity: (identity: string) => void;
}

const categories: IdentityCategory[] = ['Pitagóricas', 'Suma y Diferencia', 'Ángulo Doble', 'Ángulo Mitad'];

export function ExampleSidebar({ onSelectIdentity }: ExampleSidebarProps) {
  const identitiesByCategory = categories.map(category => ({
    category,
    identities: exampleIdentities.filter(i => i.category === category),
  }));

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-semibold tracking-tight">Ejemplos de Identidades</h2>
      <Accordion type="multiple" defaultValue={['Pitagóricas']} className="w-full">
        {identitiesByCategory.map(({ category, identities }) => (
          <AccordionItem value={category} key={category}>
            <AccordionTrigger>{category}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-start space-y-1">
                {identities.map(identity => (
                  <Button
                    key={identity.id}
                    variant="link"
                    className="h-auto p-1 text-left text-muted-foreground transition-colors hover:text-accent"
                    onClick={() => onSelectIdentity(identity.identity)}
                  >
                    {identity.identity}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
