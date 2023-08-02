import { ReactNode } from 'react';

type Props = {
  isOpen?: boolean;
  children?: ReactNode;
};

export default function Container({ isOpen, children }: Props) {
  return (
    <div
      className={`group overflow-hidden rounded-b rounded-t-lg border text-dark shadow-sm ${!isOpen && 'opacity-80'}`}
    >
      {children}
    </div>
  );
}
