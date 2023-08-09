'use client';
import { ColorProps, IconButton, LayoutProps, ThemingProps, Tooltip } from '@chakra-ui/react';
import { IconTrash } from '@tabler/icons-react';

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
  ariaLabel?: string;
};

export default function DeleteIconButton({
  colorScheme = 'red',
  isLoading,
  variant = 'ghost',
  size,
  iconSize = '1.2rem',
  iconStroke = 3,
  display,
  onClick,
  ariaLabel = 'delete',
}: Props) {
  return (
    <Tooltip label={ariaLabel} hasArrow bg="red">
      <IconButton
        colorScheme={colorScheme}
        aria-label={ariaLabel}
        isLoading={isLoading}
        size={size}
        variant={variant}
        icon={<IconTrash size={iconSize} stroke={iconStroke} />}
        display={display}
        onClick={onClick}
      />
    </Tooltip>
  );
}
