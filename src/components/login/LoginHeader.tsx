import Image from 'next/image';

export default function LoginHeader() {
  return (
    <header className="mb-8 xl:mb-16">
      <figure className="relative mx-auto block h-20 w-20 overflow-hidden rounded-full shadow-md shadow-header">
        <Image
          src={process.env.NEXT_PUBLIC_BRAND_LOGO_URL || ''}
          fill
          className="object-cover"
          alt={process.env.NEXT_PUBLIC_APP_NAME || ''}
          priority
          sizes="5rem"
        />
      </figure>
    </header>
  );
}
