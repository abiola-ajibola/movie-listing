import Link from "next/link";
import styles from "./Paginationi.module.css";

type PaginationProps = { page: number; perPage: number; total: number };

export function Pagination({ page, perPage, total }: PaginationProps) {
  const _total = Math.min(total, 500 * perPage); // TMDB API limit
  const lastPage = Math.ceil(_total / perPage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageNumber}>Page: {page}</div>
      <div className={styles.paginationLinks}>
        {page >= 2 && <Link href={`?page=1`}>&lt;&lt;</Link>}
        {page > 1 && <Link href={`?page=${page - 1}`}>&lt;</Link>}
        {page >= 4 && (
          <>
            {Array.from({ length: 3 }, (_, i) => (
              <Link key={i} href={`?page=${page - i - 1}`}>{page - i - 1}</Link>
            )).reverse()}
          </>
        )}
        {page >= 4 && <span>&#9210;</span>}
        {page < lastPage - 5 && (
          <>
            {Array.from({ length: 3 }, (_, i) => (
              <Link key={i} href={`?page=${page + i + 1}`}>{page + i + 1}</Link>
            ))}
          </>
        )}
        {page < lastPage && <Link href={`?page=${page + 1}`}>&gt;</Link>}
        {page < lastPage && (
          <Link href={`?page=${_total / perPage}`}>&gt;&gt;</Link>
        )}
      </div>
    </div>
  );
}
