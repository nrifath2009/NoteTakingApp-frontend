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
import { ROUTES } from "./routes";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path={ROUTES.NOTES} element={<NotesPage />} />
          <Route path={ROUTES.NEW_NOTE} element={<NoteFormPage />} />
          <Route path={ROUTES.EDIT_NOTE} element={<NoteFormPage />} />
          <Route path={ROUTES.ACCOUNT} element={<ProfilePage />} />
          <Route
            path={ROUTES.ACCOUNT_PASSWORD}
            element={<Navigate to={ROUTES.ACCOUNT} replace />}
          />
          <Route element={<RequireAdmin />}>
            <Route path={ROUTES.ADMIN_USERS} element={<UsersPage />} />
            <Route path={ROUTES.NEW_ADMIN_USER} element={<UserFormPage />} />
            <Route path={ROUTES.EDIT_ADMIN_USER} element={<UserFormPage />} />
            <Route path={ROUTES.ADMIN_NOTES} element={<AdminNotesPage />} />
            <Route path={ROUTES.ADMIN_ANALYTICS} element={<AnalyticsPage />} />
          </Route>
        </Route>
      </Route>
      <Route
        path={ROUTES.NOT_FOUND}
        element={<Navigate to={ROUTES.NOTES} replace />}
      />
    </Routes>
  );
}
