'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Direction = 'ltr' | 'rtl';

interface DirectionProviderState {
  direction: Direction;
  toggleDirection: () => void;
}

const DirectionContext = createContext<DirectionProviderState | undefined>(undefined);

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirection] = useState<Direction>('ltr');

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  const toggleDirection = useCallback(() => {
    setDirection((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'));
  }, []);

  return (
    <DirectionContext.Provider value={{ direction, toggleDirection }}>
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  const context = useContext(DirectionContext);
  if (context === undefined) {
    throw new Error('useDirection must be used within a DirectionProvider');
  }
  return context;
}
