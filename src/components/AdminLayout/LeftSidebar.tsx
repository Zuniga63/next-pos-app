'use client';
import { Collapse } from '@chakra-ui/react';
import MenuLinks from './MenuLinks';
import { useSidebarMenuStore } from '@/store/sidebarStore';

export default function LeftSidebar() {
  const [collapsed, isLargeScreen, headerHeight] = useSidebarMenuStore(state => [
    state.collapsed,
    state.isLargeScreen,
    state.headerHeight,
  ]);

  if (!isLargeScreen) return null;

  return (
    <aside
      className="sticky hidden flex-shrink-0 transition-[width] lg:block"
      style={{
        top: headerHeight,
        width: collapsed ? 0 : 240,
        height: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      <div className="absolute inset-0 overflow-y-auto shadow-xl">
        <Collapse in={!collapsed} animateOpacity>
          <MenuLinks />
        </Collapse>
      </div>
    </aside>
  );
}