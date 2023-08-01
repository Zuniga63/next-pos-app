import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function FormSectionActions({ children }: Props) {
  return (
    <div className="flex items-center justify-end gap-x-2 bg-gray-50 px-4 py-3 text-right shadow sm:rounded-b-md sm:px-6">
      {children}
    </div>
  );
}
