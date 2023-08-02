import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function Content({ children }: Props) {
  return <div className="border-x border-gray-200 bg-light px-4 py-2 dark:bg-none">{children}</div>;
}
