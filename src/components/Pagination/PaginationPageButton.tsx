import styles from '@/styles/Pagination.module.css';

type Props = {
  value: number;
  isCurrent?: boolean;
  onClick?: (page: number) => void;
};

export default function PaginationPageButton({ value, isCurrent, onClick }: Props) {
  const handleClick = () => {
    if (!onClick) return;
    onClick(value);
  };
  return (
    <button
      aria-current={isCurrent ? 'page' : undefined}
      className={`${styles.button} ${isCurrent && styles.is_current}`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
