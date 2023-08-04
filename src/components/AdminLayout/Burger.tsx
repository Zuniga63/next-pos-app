'use client';
import { IconButton } from '@chakra-ui/react';
import { IconMenu2, IconArrowBadgeRight } from '@tabler/icons-react';
import { useSidebarMenuStore } from '@/store/sidebarStore';

export default function Burger() {
  const [opened, isLargeScreen, collapsed] = useSidebarMenuStore(state => [
    state.opened,
    state.isLargeScreen,
    state.collapsed,
  ]);
  const toggle = useSidebarMenuStore(state => state.toggle);

  const Icon = isLargeScreen && collapsed ? IconArrowBadgeRight : IconMenu2;

  return (
    <IconButton
      colorScheme="gray"
      aria-label={opened ? 'Close navigation' : 'Open navigation'}
      icon={<Icon size="1.5rem" />}
      onClick={toggle}
      size="sm"
      variant="ghost"
      className="block lg:hidden"
    />
  );
}
