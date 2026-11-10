import { useEffect, useState } from "react";
import { listInterests } from "../api/analytics";
import { errorMessage } from "../api/client";
import { Pagination } from "../components/Pagination";
import type { InterestGroup, Pagination as PageInfo } from "../types";

export function AnalyticsPage() {
  const [page, setPage] = useState(1);
  const [groups, setGroups] = useState<InterestGroup[]>([]);
  const [pagination, setPagination] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    listInterests(page)
      .then((result) => {
        if (!active) return;
        setGroups(result.data);
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
      <h1>Interests</h1>
      <p className="muted">Each interest is counted once per user.</p>
      {error ? <p className="error">{error}</p> : null}
      {loading ? <p className="status">Loading...</p> : null}
      {!loading && groups.length === 0 ? <p>No interests yet.</p> : null}
      {groups.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Interest</th>
              <th>Users</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group._id}>
                <td>{group._id}</td>
                <td>{group.userCount}</td>
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
