'use client';
import { useSidebarMenu } from '@/hooks/useSidebarMenu';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function AdminProviders({ children }: Props) {
  useSidebarMenu();
  return <>{children}</>;
}
