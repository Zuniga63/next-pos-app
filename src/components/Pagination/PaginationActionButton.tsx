import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import styles from '@/styles/Pagination.module.css';

type Props = {
  isPrev?: boolean;
  isDisabled?: boolean;
  iconSize?: number | string;
  iconStroke?: number | string;
  onClick?: () => void;
};

export default function PaginationActionButton({
  isPrev,
  isDisabled,
  iconSize = '1rem',
  iconStroke = 1.5,
  onClick,
}: Props) {
  const Icon = isPrev ? IconChevronLeft : IconChevronRight;

  return (
    <button
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={`${styles.button} ${isPrev ? styles.prev : styles.next}`}
      onClick={onClick}
    >
      <span className="sr-only">{isPrev ? 'Previous' : 'Next'}</span>
      <Icon size={iconSize} stroke={iconStroke} />
    </button>
  );
}
