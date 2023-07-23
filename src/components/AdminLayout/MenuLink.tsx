import { useSidebarMenuStore } from '@/store/sidebarStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  name: string;
  url?: string;
  icon?: React.ReactNode;
  className?: string;
};

export default function MenuLink({ name, icon, url = '', className }: Props) {
  const pathName = usePathname();
  const [isActive, setIsActive] = useState(false);
  const hide = useSidebarMenuStore(state => state.hide);

  useEffect(() => {
    if (url && pathName?.includes(url)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [url, pathName]);

  return (
    <Link
      href={url}
      className={`block px-4 py-2 transition-colors hover:bg-cyan-200 ${className} ${
        isActive && 'bg-cyan-300 font-bold'
      }`}
      onClick={hide}
    >
      <div className="flex items-center justify-between gap-4">
        {icon}
        <span className="flex-grow text-sm">{name}</span>
      </div>
    </Link>
  );
}
