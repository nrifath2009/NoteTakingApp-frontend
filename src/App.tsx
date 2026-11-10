import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout, Layout } from "./components/Layout";
import { RequireAdmin, RequireAuth } from "./components/RequireAuth";
import { AdminNotesPage } from "./pages/AdminNotesPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { LoginPage } from "./pages/LoginPage";
import { NoteFormPage } from "./pages/NoteFormPage";
import { NotesPage } from "./pages/NotesPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";
import { UserFormPage } from "./pages/UserFormPage";
import { UsersPage } from "./pages/UsersPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/new" element={<NoteFormPage />} />
          <Route path="/notes/:id/edit" element={<NoteFormPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/password" element={<Navigate to="/account" replace />} />
          <Route element={<RequireAdmin />}>
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/users/new" element={<UserFormPage />} />
            <Route path="/admin/users/:id/edit" element={<UserFormPage />} />
            <Route path="/admin/notes" element={<AdminNotesPage />} />
            <Route path="/admin/analytics" element={<AnalyticsPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/notes" replace />} />
    </Routes>
  );
}
