import React from 'react';
import { buildTokens, ColorScheme, Tokens } from './tokens';

const ThemeContext = React.createContext<Tokens>(buildTokens('dark'));

type Props = { scheme?: ColorScheme; children: React.ReactNode };

export function ThemeProvider({ scheme = 'dark', children }: Props) {
  const value = React.useMemo(() => buildTokens(scheme), [scheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Tokens {
  return React.useContext(ThemeContext);
}
