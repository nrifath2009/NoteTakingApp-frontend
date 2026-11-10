type Props = {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
};

export function Pagination({ page, totalPages, onPage }: Props) {
  if (totalPages < 1) return null;

  return (
    <div className="pager">
      <button type="button" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button type="button" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
