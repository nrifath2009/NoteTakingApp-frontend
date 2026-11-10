import { useState } from "react";
import type { FormEvent } from "react";
import { changePassword, updateProfile } from "../api/auth";
import { errorMessage, parseInterests } from "../api/client";
import { useAuth } from "../context/useAuth";

export function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [interests, setInterests] = useState(user?.interests.join(", ") ?? "");
  const [profileError, setProfileError] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  async function onSaveProfile(event: FormEvent) {
    event.preventDefault();
    setProfileError("");
    setProfileMessage("");
    setSavingProfile(true);
    try {
      const updated = await updateProfile({
        name,
        email,
        interests: parseInterests(interests),
      });
      updateUser(updated);
      setName(updated.name);
      setEmail(updated.email);
      setInterests(updated.interests.join(", "));
      setProfileMessage("Profile saved");
    } catch (caught) {
      setProfileError(errorMessage(caught));
    } finally {
      setSavingProfile(false);
    }
  }

  async function onChangePassword(event: FormEvent) {
    event.preventDefault();
    setPasswordError("");
    setPasswordMessage("");
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match");
      return;
    }

    setSavingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Password changed");
    } catch (caught) {
      setPasswordError(errorMessage(caught));
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div className="profile">
      <section className="card">
        <h1>Profile</h1>
        <p className="muted">Role: {user?.role}</p>
        {profileMessage ? <p className="success">{profileMessage}</p> : null}
        {profileError ? <p className="error">{profileError}</p> : null}
        <form onSubmit={onSaveProfile} className="stack">
          <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <label>
            Email
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Interests
            <input
              value={interests}
              placeholder="chess, reading"
              onChange={(event) => setInterests(event.target.value)}
            />
          </label>
          <button type="submit" disabled={savingProfile}>
            {savingProfile ? "Saving..." : "Save profile"}
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Change password</h2>
        {passwordMessage ? <p className="success">{passwordMessage}</p> : null}
        {passwordError ? <p className="error">{passwordError}</p> : null}
        <form onSubmit={onChangePassword} className="stack">
          <label>
            Current password
            <input
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
            />
          </label>
          <label>
            New password
            <input
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
            />
          </label>
          <label>
            Confirm new password
            <input
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={savingPassword}>
            {savingPassword ? "Saving..." : "Change password"}
          </button>
        </form>
      </section>
    </div>
  );
}
