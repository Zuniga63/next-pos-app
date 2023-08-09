'use client';

import { usePagination } from '@/hooks/usePagination';
import React from 'react';
import styles from '@/styles/Pagination.module.css';
import PaginationActionButton from './PaginationActionButton';
import PaginationDots from './PaginationDots';
import PaginationPageButton from './PaginationPageButton';

type Props = {
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  siblingCount?: number;
  pages?: number;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onPageClick?: (page: number) => void;
};

export default function Pagination({
  totalCount = 0,
  currentPage = 0,
  pageSize = 1,
  siblingCount = 1,
  pages,
  onNextPage,
  onPrevPage,
  onPageClick,
}: Props) {
  const { paginationRange } = usePagination({ totalCount, currentPage, pageSize, siblingCount, pages });

  if (currentPage === 0 || (paginationRange && paginationRange?.length < 2)) return null;

  return (
    <nav className={styles.pagination}>
      <PaginationActionButton isPrev isDisabled={currentPage === 1} onClick={onPrevPage} />

      {paginationRange?.map((page, index) => {
        if (typeof page === 'number')
          return (
            <PaginationPageButton key={page} value={page} isCurrent={page === currentPage} onClick={onPageClick} />
          );
        return <PaginationDots key={page + index} />;
      })}

      <PaginationActionButton isDisabled={currentPage === pages} onClick={onNextPage} />
    </nav>
  );
}
