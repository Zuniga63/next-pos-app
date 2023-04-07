import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BrandLogo() {
  return (
    <Link href="/" passHref>
      <figure className="relative flex aspect-video w-20 items-center lg:w-24">
        <Image
          src={process.env.NEXT_PUBLIC_BRAND_LOGO_URL || ''}
          alt={process.env.NEXT_PUBLIC_APP_NAME || ''}
          fill
          className="object-contain"
        />
      </figure>
    </Link>
  );
}
