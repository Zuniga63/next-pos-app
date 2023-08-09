'use client';
import { useAdminProviders } from '@/hooks/useAdminProviders';
import { ReactNode } from 'react';
import '@/config/dayj.config';

type Props = {
  children: ReactNode;
};

export default function AdminProviders({ children }: Props) {
  useAdminProviders();
  return <>{children}</>;
}
