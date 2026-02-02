import styles from './Pagination.module.css';
interface PaginationProps {
  onPrev: () => void;
  onNext: () => void;
  isLastPage: boolean;
  currentPage: number;
  totalPages: number;
}
function Pagination({ onPrev, onNext, isLastPage, currentPage, totalPages }: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button onClick={onPrev} disabled={currentPage === 1}>
        Prev
      </button>
      <span>
        {currentPage} ... {totalPages}
      </span>
      <button onClick={onNext} disabled={isLastPage}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
