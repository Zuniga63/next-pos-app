import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BrandLogo() {
  return (
    <Link href="/dashboard" passHref>
      <figure className="relative flex h-14 w-14 items-center overflow-hidden rounded-full">
        <Image
          src={process.env.NEXT_PUBLIC_BRAND_LOGO_URL || ''}
          alt={process.env.NEXT_PUBLIC_APP_NAME || ''}
          fill
          className="object-cover"
          priority
          sizes="56px"
        />
      </figure>
    </Link>
  );
}
