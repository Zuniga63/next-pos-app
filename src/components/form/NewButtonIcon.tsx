'use client';
import { ColorProps, IconButton, LayoutProps, ThemingProps } from '@chakra-ui/react';
import { IconCirclePlus } from '@tabler/icons-react';

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

export default function NewButtonIcon({
  colorScheme = 'green',
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
      aria-label="new"
      isLoading={isLoading}
      size={size}
      variant={variant}
      icon={<IconCirclePlus size={iconSize} stroke={iconStroke} />}
      display={display}
      onClick={onClick}
    />
  );
}
