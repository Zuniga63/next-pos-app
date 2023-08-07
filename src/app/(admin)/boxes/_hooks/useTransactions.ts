import { ITransaction } from '@/types';
import { normalizeText } from '@/utils';
import { useEffect, useMemo, useState } from 'react';

type Props = {
  search?: string;
  allTransactions?: ITransaction[];
};

export function useTransactions({ search, allTransactions }: Props) {
  const pageSize = 25;

  const [pageCount, setPaginationPages] = useState(0);
  const [currentPage, setActivePage] = useState(1);

  const transactionFilterResult: ITransaction[] = useMemo(() => {
    let result: ITransaction[] = [];
    if (!allTransactions) return result;

    if (search) {
      const text = normalizeText(search);
      result = allTransactions.filter(t => normalizeText(t.description).includes(text));
    } else {
      result = allTransactions.slice();
    }

    return result.reverse();
  }, [search, allTransactions]);

  const transactions: ITransaction[] = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return transactionFilterResult.slice(startIndex, endIndex);
  }, [transactionFilterResult, currentPage]);

  const nextPage = () => {
    if (currentPage >= pageCount) return;
    setActivePage(current => current + 1);
  };

  const prevPage = () => {
    if (currentPage <= 1) return;
    setActivePage(current => current - 1);
  };

  const goToPage = (value: number) => {
    if (value < 1 || value > pageCount) return;
    setActivePage(value);
  };

  useEffect(() => {
    const pages = Math.ceil(transactionFilterResult.length / pageSize);
    const page = currentPage > pages ? pages || 1 : currentPage;

    setPaginationPages(pages);
    setActivePage(page);
  }, [transactionFilterResult]);

  return {
    transactions,
    currentPage,
    pageCount,
    nextPage,
    prevPage,
    goToPage,
  };
}
