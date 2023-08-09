'use client';
import { ColorProps, IconButton, LayoutProps, ThemingProps } from '@chakra-ui/react';
import { IconReload } from '@tabler/icons-react';

type Props = {
  variant?: ThemingProps<'Button'>['variant'];
  colorScheme?: ThemingProps<'Button'>['colorScheme'];
  color?: ColorProps['color'];
  size?: ThemingProps<'Button'>['size'];
  iconSize?: string | number;
  iconStroke?: string | number;
  display?: LayoutProps['display'];
  onClick?: () => void;
  isLoading?: boolean;
};

export default function RefreshButtonIcon({
  colorScheme = 'blue',
  isLoading,
  variant = 'ghost',
  size,
  iconSize = '1.2rem',
  iconStroke = 3,
  display,
  onClick,
}: Props) {
  return (
    <IconButton
      colorScheme={colorScheme}
      aria-label="Reload material"
      isLoading={isLoading}
      size={size}
      variant={variant}
      icon={<IconReload size={iconSize} stroke={iconStroke} />}
      display={display}
      onClick={onClick}
    />
  );
}
