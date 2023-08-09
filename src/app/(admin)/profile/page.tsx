import UpdatePasswordForm from '@/components/profile/UpdatePasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perfil de usuario',
};

export default function UserProfile() {
  return <UpdatePasswordForm />;
}
