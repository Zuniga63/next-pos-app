import { inter, poppins } from '@/config/google-fonts';
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: poppins.style.fontFamily,
    body: inter.style.fontFamily,
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
});
