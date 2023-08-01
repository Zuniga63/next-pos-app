'use client';
import { FormEvent, ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  children?: ReactNode;
  isLoading?: boolean;
  isSuccess?: boolean;
  onSubmit?: () => void;
};

export default function FormSection({ title, description, children, onSubmit }: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onSubmit) return;

    onSubmit();
  };

  return (
    <div className="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 md:px-0">
            <h1 className="font-display text-lg font-medium text-dark">{title}</h1>
            {description && <p className="mt-1 text-sm text-dark">{description}</p>}
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit}>{children}</form>
        </div>
      </div>
    </div>
  );
}
