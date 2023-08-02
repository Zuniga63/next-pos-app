import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function BoxesContainer({ children }: Props) {
  return <div className="pt-6 text-dark lg:flex lg:gap-x-4 lg:px-8">{children}</div>;
}
