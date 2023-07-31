import { Collapse } from '@chakra-ui/react';
import { IconChevronDown } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useMenuLinkGroup } from '@/hooks/useMenuLinkGroup';

type Props = {
  title: string;
  children: ReactNode;
  leftIcon?: ReactNode;
  rootUrl: string;
};

export default function MenuLinkGroup({ title, children, leftIcon, rootUrl }: Props) {
  const { isOpen, isActive, onToggle } = useMenuLinkGroup({ url: rootUrl });

  return (
    <>
      <button onClick={onToggle} className="w-full">
        <div
          className={`flex items-center justify-between rounded-lg py-3 pl-4 pr-2 pt-2 transition-colors hover:bg-zinc-200 ${
            isActive && 'bg-neutral-200'
          }`}
        >
          <div className="flex items-center gap-4">
            {leftIcon}
            <h2 className={`flex-grow text-sm font-bold tracking-wider`}>{title}</h2>
          </div>
          <IconChevronDown
            size={20}
            stroke={3}
            className={`${isOpen ? '-rotate-180' : 'rotate-0'} transition-transform duration-300`}
          />
        </div>
      </button>
      <Collapse in={isOpen}>{children}</Collapse>
    </>
  );
}
