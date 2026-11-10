import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { errorMessage } from "../api/client";
import { deleteUser, listUsers } from "../api/users";
import { Pagination } from "../components/Pagination";
import type { Pagination as PageInfo, User } from "../types";

export function UsersPage() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    listUsers(page)
      .then((result) => {
        if (!active) return;
        setUsers(result.data);
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
    if (!window.confirm("Delete this user and their notes and posts?")) return;
    setError("");
    try {
      await deleteUser(id);
      const result = await listUsers(page);
      if (result.data.length === 0 && page > 1) {
        setPage(page - 1);
        return;
      }
      setUsers(result.data);
      setPagination(result.pagination);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  }

  return (
    <section className="card">
      <div className="row">
        <h1>Users</h1>
        <Link className="button" to="/admin/users/new">
          New user
        </Link>
      </div>
      {error ? <p className="error">{error}</p> : null}
      {loading ? <p className="status">Loading...</p> : null}
      {!loading && users.length === 0 ? <p>No users.</p> : null}
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Interests</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.interests.join(", ") || "—"}</td>
                <td className="actions">
                  <Link to={`/admin/users/${user.id}/edit`}>Edit</Link>
                  <button type="button" className="danger" onClick={() => onDelete(user.id)}>
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
