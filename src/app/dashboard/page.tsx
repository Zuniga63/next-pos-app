'use client';
import React from 'react';
import { useRouter } from 'next-nprogress-bar';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function DashboarPage() {
  const router = useRouter();

  return (
    <div>
      <h1>This is Dashboard</h1>
      <Button onClick={() => router.push('/')}>Return Login</Button>
      <Link href="/admin/dashboard"> GO to Dashboard</Link>
    </div>
  );
}
