import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { errorMessage, parseInterests } from "../api/client";
import { createUser, getUser, updateUser } from "../api/users";
import { USER_ROLE } from "../constants";
import type { Role } from "../types";
import { ROUTES } from "../routes";

export function UserFormPage() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>(USER_ROLE.USER);
  const [interests, setInterests] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(editing);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    getUser(id)
      .then((user) => {
        if (!active) return;
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        setInterests(user.interests.join(", "));
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
    const interestList = parseInterests(interests);
    try {
      if (id)
        await updateUser(id, { name, email, role, interests: interestList });
      else
        await createUser({
          name,
          email,
          password,
          role,
          interests: interestList,
        });
      navigate(ROUTES.ADMIN_USERS);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="card">
      <h1>{editing ? "Edit user" : "New user"}</h1>
      {loading ? <p className="status">Loading...</p> : null}
      {error ? <p className="error">{error}</p> : null}
      {!loading ? (
        <form onSubmit={onSubmit} className="stack">
          <label>
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          {editing ? null : (
            <label>
              Password
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
          )}
          <label>
            Role
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as Role)}
            >
              <option value={USER_ROLE.USER}>{USER_ROLE.USER}</option>
              <option value={USER_ROLE.ADMIN}>{USER_ROLE.ADMIN}</option>
            </select>
          </label>
          <label>
            Interests
            <input
              value={interests}
              placeholder="chess, reading"
              onChange={(event) => setInterests(event.target.value)}
            />
          </label>
          <div className="actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </button>
            <Link to={ROUTES.ADMIN_USERS}>Cancel</Link>
          </div>
        </form>
      ) : null}
    </section>
  );
}
