import { IconBox, IconDashboard, TablerIconsProps } from '@tabler/icons-react';

interface ILink {
  name: string;
  url: string;
  Icon?: (props: TablerIconsProps) => JSX.Element;
  links?: ILink[];
}

export const links: ILink[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    Icon: IconDashboard,
  },
  {
    name: 'Cajas',
    url: '/boxes',
    Icon: IconBox,
  },
];
