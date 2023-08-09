import { AdminHeader } from '@/components/AdminLayout/AdminHeader';
import LeftSidebar from '@/components/AdminLayout/LeftSidebar';
import MenuDrawer from '@/components/AdminLayout/MenuDrawer';
import AdminProviders from './AdminProviders';

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <AdminProviders>
      <AdminHeader />
      <div className="flex">
        <LeftSidebar />
        <div className="flex-grow">{children}</div>
      </div>
      <MenuDrawer />
    </AdminProviders>
  );
}
