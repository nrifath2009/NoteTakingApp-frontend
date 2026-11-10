import { useEffect, useState } from "react";
import { errorMessage, formatWhen } from "../api/client";
import { listAllNotes } from "../api/notes";
import { Pagination } from "../components/Pagination";
import type { Note, Pagination as PageInfo } from "../types";

export function AdminNotesPage() {
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState<Note[]>([]);
  const [pagination, setPagination] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    listAllNotes(page)
      .then((result) => {
        if (!active) return;
        setNotes(result.data);
        setPagination(result.pagination);
      })
      .catch((caught: unknown) => {
        if (active) setError(errorMessage(caught));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [page]);

  return (
    <section className="card">
      <h1>All notes</h1>
      <p className="muted">Admins can read every note. Editing and deleting stay with the owner.</p>
      {error ? <p className="error">{error}</p> : null}
      {loading ? <p className="status">Loading...</p> : null}
      {!loading && notes.length === 0 ? <p>No notes.</p> : null}
      {notes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Owner</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
                <td className="mono">{note.userId}</td>
                <td>{formatWhen(note.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {pagination ? (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onPage={(next) => {
            setLoading(true);
            setPage(next);
          }}
        />
      ) : null}
    </section>
  );
}
