'use client';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import AdminBrandLogo from './AdminBrandLogo';
import MenuLinks from './MenuLinks';
import { useSidebarMenuStore } from '@/store/sidebarStore';

export default function MenuDrawer() {
  const [opened, isLargeScreen] = useSidebarMenuStore(state => [state.opened, state.isLargeScreen]);
  const toggle = useSidebarMenuStore(state => state.toggle);

  if (isLargeScreen) return null;

  return (
    <Drawer isOpen={opened} placement="left" onClose={toggle}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <header className="flex justify-center">
            <AdminBrandLogo />
          </header>
          <MenuLinks />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
