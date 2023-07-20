'use client';

import queryClient from '@/config/queryClient';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider prepend={false}>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
