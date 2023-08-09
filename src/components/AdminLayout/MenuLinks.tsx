import { IconBox, IconDashboard } from '@tabler/icons-react';
import MenuLink from './MenuLink';
import MenuLinkGroup from './MenuLinkGroup';

interface ILink {
  name: string;
  url: string;
  icon?: React.ReactNode;
  links?: ILink[];
}

const links: ILink[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: <IconDashboard className="text-zinc-600" size={24} />,
  },
  {
    name: 'Cajas',
    url: '/boxes',
    icon: <IconBox className="text-zinc-600" size={24} />,
  },
];

export default function MenuLinks() {
  return (
    <nav>
      {links.map(({ url, name, icon, links }) => {
        if (links) {
          return (
            <MenuLinkGroup key={url} title={name} rootUrl={url} leftIcon={icon}>
              {links.map(subLink => (
                <MenuLink
                  key={subLink.url}
                  name={subLink.name}
                  url={subLink.url}
                  icon={subLink.icon}
                  className="pl-4"
                />
              ))}
            </MenuLinkGroup>
          );
        }

        return <MenuLink key={url} name={name} url={url} icon={icon} />;
      })}
    </nav>
  );
}
