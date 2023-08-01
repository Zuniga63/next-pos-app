'use client';
import { clearCredentials } from '@/store/authStore';
import { Avatar, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';

export default function AdminAvatar() {
  const router = useRouter();

  const logout = () => {
    clearCredentials();
    router.push('/');
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar name="Administrator" size="sm" />
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem as={Link} href="/profile">
            My Perfil
          </MenuItem>
          <MenuItem isDisabled>Projects</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={logout} color="red">
          Cerrar Sesion
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
