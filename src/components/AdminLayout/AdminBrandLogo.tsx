import Image from 'next/image';
import Link from 'next/link';

export default function AdminBrandLogo() {
  return (
    <Link href="/dashboard" passHref>
      <figure className="relative flex h-12 w-12 items-center overflow-hidden rounded-full">
        <Image
          src={process.env.NEXT_PUBLIC_BRAND_LOGO_URL || ''}
          alt={process.env.NEXT_PUBLIC_APP_NAME || ''}
          fill
          className="object-contain"
          priority
          sizes="48px"
        />
      </figure>
    </Link>
  );
}
