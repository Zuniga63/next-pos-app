import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useMenuLinkGroup({ url }: { url: string }) {
  const { isOpen, onToggle, onOpen } = useDisclosure();
  const [isActive, setIsActive] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName?.includes(url)) {
      setIsActive(true);
      onOpen();
    } else {
      setIsActive(false);
    }
  }, [pathName, url, onOpen]);

  return { isOpen, isActive, onToggle };
}
