import { setAuthTokens } from '@/logic/set-auth-token';
import { useSidebarMenuStore } from '@/store/sidebarStore';
import { useMediaQuery } from '@chakra-ui/react';
import { useEffect } from 'react';

export function useAdminProviders() {
  const opened = useSidebarMenuStore(state => state.opened);
  const updateHeaderHeight = useSidebarMenuStore(state => state.updateHeaderHeight);
  const hide = useSidebarMenuStore(state => state.hide);
  const updateIsLargeScreen = useSidebarMenuStore(state => state.updateIsLargeScreen);

  const [isLargeScreen] = useMediaQuery('(min-width: 1024px)', {
    ssr: true,
    fallback: true,
  });

  useEffect(() => {
    setAuthTokens();
  }, []);

  useEffect(() => {
    // * Hide the drawer if opened
    updateIsLargeScreen(isLargeScreen);
    if (isLargeScreen && opened) hide();
  }, [isLargeScreen, opened]);

  useEffect(() => {
    const header = document.getElementById('admin-layout-header');
    if (header) {
      updateHeaderHeight(header.offsetHeight);
    }
  }, [isLargeScreen]);
}
