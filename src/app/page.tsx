import LoginContainer from '@/components/login/LoginContainer';
import LoginForm from '@/components/login/LoginForm';
import LoginHeader from '@/components/login/LoginHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <LoginContainer>
      <LoginHeader />
      <LoginForm />
    </LoginContainer>
  );
}
