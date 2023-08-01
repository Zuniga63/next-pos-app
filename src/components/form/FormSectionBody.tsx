import { ReactNode } from 'react';

type Props = {
  hasActions?: boolean;
  children?: ReactNode;
};

export default function FormSectionBody({ hasActions, children }: Props) {
  return (
    <div className={`bg-white px-4 py-5 shadow ${hasActions ? 'sm:rounded-tl-md sm:rounded-tr-md' : 'sm:rounded-md'}`}>
      <div className="grid grid-cols-6">{children}</div>
    </div>
  );
}
