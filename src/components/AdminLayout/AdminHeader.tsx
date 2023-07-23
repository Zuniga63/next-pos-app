import AdminAvatar from './AdminAvatar';
import AdminBrandLogo from './AdminBrandLogo';
import Burger from './Burger';

export function AdminHeader() {
  return (
    <header
      className="sticky top-0 z-fixed flex h-16 items-center bg-light px-4 py-2 shadow-lg lg:px-6"
      id="admin-layout-header"
    >
      <div className="flex flex-grow items-center justify-between gap-x-4">
        {/* BURGER AND LOGO */}
        <div className="flex items-center gap-x-2">
          <Burger />
          <AdminBrandLogo />
          <h1 className="hidden font-display text-lg font-bold tracking-wider lg:block">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h1>
        </div>

        <AdminAvatar />
      </div>
    </header>
  );
}
