import { create } from 'zustand';

export interface SidebarMenuState {
  opened: boolean;
  collapsed: boolean;
  isLargeScreen: boolean;
  headerHeight: number;
  hide: () => void;
  toggle: () => void;
  updateIsLargeScreen: (value: boolean) => void;
  updateHeaderHeight: (value: number) => void;
}

export const useSidebarMenuStore = create<SidebarMenuState>(set => ({
  opened: false,
  collapsed: false,
  isLargeScreen: true,
  headerHeight: 0,
  hide: () => set(state => ({ opened: false })),
  toggle: () =>
    set(state => {
      if (state.isLargeScreen) return { collapsed: !state.collapsed };
      else return { opened: !state.opened };
    }),
  updateIsLargeScreen: value => set(state => ({ isLargeScreen: value })),
  updateHeaderHeight: value => set(state => ({ headerHeight: value })),
}));
