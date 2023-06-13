import React from 'react';
import styles from "./Paginator.module.css"
import classnames from 'classnames';
interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagesToShow = Math.min(totalPages, 5); // Ограничение на количество показываемых страниц
  let totalPag = Math.ceil(totalPages / 10)
  const getPageNumbers = (): number[] => {


    if (totalPag <= pagesToShow) {

      return Array.from({ length: totalPag }, (_, i) => i + 1);
    }

    /* if (totalPages <= pagesToShow) {
       return Array.from({ length: Math.ceil(totalPages / 10) }, (_, i) => i);
     }*/

    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = currentPage - halfPagesToShow;
    let endPage = currentPage + halfPagesToShow;
    let arrLength = endPage - startPage + 1
    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages && endPage < totalPag) {
      startPage -= endPage - totalPages;
      endPage = totalPages;

    }
    if (endPage > totalPag) {
      endPage -= 2
      arrLength -= 2
    }
    return Array.from({ length: arrLength }, (_, i) => startPage + i);
  };

  const handlePageChange = (page: number) => {
    if (page === totalPag) {
      onPageChange(page)
    }
    else if (page <= totalPag - 2) {
      onPageChange(page)
    } else if (page < totalPag) {
      onPageChange(page)
    }

  }
  return (
    <div className={styles.paginator__container}>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={classnames(styles.page__btn, currentPage === page && styles.selected)}
        >
          {page}
        </button>
      ))}
      {totalPag > pagesToShow &&
        <button
          className={classnames(styles.page__btn, currentPage === totalPag && styles.selected)}
          onClick={() => handlePageChange(totalPag - 1)}>
          ... {totalPag}
        </button>
      }
    </div>
  );
};

export default Paginator;
