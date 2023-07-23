import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function LoginContainer({ children }: Props) {
  return (
    <main className="bg-login bg-cover bg-fixed  bg-center bg-no-repeat">
      <div className="h-screen w-full">
        <div className="flex h-full items-center justify-center xl:items-stretch xl:justify-end">
          <div className="w-full max-w-sm rounded bg-light bg-opacity-40 px-6 py-4 shadow backdrop-blur lg:rounded-none">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
