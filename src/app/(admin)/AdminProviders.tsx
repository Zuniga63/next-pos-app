'use client';
import { useAdminProviders } from '@/hooks/useAdminProviders';
import { ReactNode } from 'react';
import '@/config/dates.config';

type Props = {
  children: ReactNode;
};

export default function AdminProviders({ children }: Props) {
  useAdminProviders();
  return <>{children}</>;
}
