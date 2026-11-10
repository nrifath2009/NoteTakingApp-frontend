import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { errorMessage } from "../api/client";
import { createNote, getNote, updateNote } from "../api/notes";

export function NoteFormPage() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(editing);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    getNote(id)
      .then((note) => {
        if (!active) return;
        setTitle(note.title);
        setContent(note.content);
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
  }, [id]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (id) await updateNote(id, { title, content });
      else await createNote({ title, content });
      navigate("/notes");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="card">
      <h1>{editing ? "Edit note" : "New note"}</h1>
      {loading ? <p className="status">Loading...</p> : null}
      {error ? <p className="error">{error}</p> : null}
      {!loading ? (
        <form onSubmit={onSubmit} className="stack">
          <label>
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} required />
          </label>
          <label>
            Content
            <textarea value={content} onChange={(event) => setContent(event.target.value)} required />
          </label>
          <div className="actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </button>
            <Link to="/notes">Cancel</Link>
          </div>
        </form>
      ) : null}
    </section>
  );
}
