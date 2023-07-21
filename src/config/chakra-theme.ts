import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
});
