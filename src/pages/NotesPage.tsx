import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { errorMessage, formatWhen } from "../api/client";
import { deleteNote, listNotes } from "../api/notes";
import { Pagination } from "../components/Pagination";
import { ROUTES } from "../routes";
import type { Note, Pagination as PageInfo } from "../types";

export function NotesPage() {
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState<Note[]>([]);
  const [pagination, setPagination] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    listNotes(page)
      .then((result) => {
        if (!active) return;
        setNotes(result.data);
        setPagination(result.pagination);
        setError("");
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

  async function onDelete(id: string) {
    if (!window.confirm("Delete this note?")) return;
    setError("");
    try {
      await deleteNote(id);
      const result = await listNotes(page);
      if (result.data.length === 0 && page > 1) {
        setPage(page - 1);
        return;
      }
      setNotes(result.data);
      setPagination(result.pagination);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }

  return (
    <section className="card">
      <div className="row">
        <h1>Your notes</h1>
        <Link className="button" to={ROUTES.NEW_NOTE}>
          New note
        </Link>
      </div>
      {error ? <p className="error">{error}</p> : null}
      {loading ? <p className="status">Loading...</p> : null}
      {!loading && notes.length === 0 ? <p>No notes yet.</p> : null}
      {notes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
                <td>{formatWhen(note.updatedAt)}</td>
                <td className="actions">
                  <Link to={`/notes/${note.id}/edit`}>Edit</Link>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => onDelete(note.id)}
                  >
                    Delete
                  </button>
                </td>
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
