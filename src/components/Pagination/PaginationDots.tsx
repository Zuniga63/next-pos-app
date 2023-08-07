import { IconDots } from '@tabler/icons-react';
import styles from '@/styles/Pagination.module.css';

type Props = {
  iconSize?: number | string;
  iconStroke?: number | string;
};

export default function PaginationDots({ iconSize = '1rem', iconStroke = 1.5 }: Props) {
  return <span className={`${styles.button} ${styles.dots}`}>{<IconDots size={iconSize} stroke={iconStroke} />}</span>;
}
