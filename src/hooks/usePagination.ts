import { useCallback, useMemo } from 'react';

type Props = {
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  siblingCount?: number;
  pages?: number;
};

const DOTS = '...';

export function usePagination({ totalCount = 0, currentPage = 0, pageSize = 1, siblingCount = 1, pages }: Props) {
  const range = useCallback((start: number, end: number) => {
    const length = end - start + 1;

    // Se genera un arreglo de numeros de longitud length
    // ? El array se inicializa con undefined en cada posición (_)
    // ? idx sera el valor de la posición [0, 1, 2, ..., length -1]
    // * Se llena desde el valor inicial hasta el valor final
    return Array.from({ length }, (_, idx) => idx + start);
  }, []);

  const paginationRange = useMemo(() => {
    const totalPageCount = pages || Math.ceil(totalCount / pageSize);

    // * Se define el numero de botones a mostrar
    // ? Este recuento se calcula como siblingCount + firstPage + lastPage + currentPage + 2 * DOTS
    const totalPageNumber = siblingCount + 5;

    // * Caso 1: El numero de paginas es menor al numero de paginas a mostrar
    if (totalPageNumber >= totalPageCount) return range(1, totalPageCount);

    // ? Se determina las posiciones en las que iran los DOTS
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    // ? Los DOTS no se muestran cuando hay un solo numero de pagina que insertar
    // ? entre los extremos de los limites de pagina, es decir 1 y totalPageCount
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    const shouldShowLeftDots = leftSiblingIndex > firstPageIndex + 1;
    const shouldShowRightDots = rightSiblingIndex < lastPageIndex - 2;

    // * Caso 2: Solo se muestran los puntos suspensivos de la derecha
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(firstPageIndex, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    // * Caso 3: Se muestran los puntos suspensivos de la izquierda
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, lastPageIndex);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    // * Caso 4: Se muestran puntos suspensivos a ambos lados
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage, pages]);

  return { paginationRange };
}
