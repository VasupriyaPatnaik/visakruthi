import { Navigate } from "react-router-dom";
import AdminDashboardPage from "./AdminDashboardPage";
import VolunteerDashboardPage from "./VolunteerDashboardPage";
import ArtisanDashboardPage from "./ArtisanDashboardPage";

const getUser = () => {
  try {
    const stored = window.localStorage.getItem("visakruthiUser") || window.localStorage.getItem("visakruthiAdmin");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!parsed.role) parsed.role = "admin";
    return parsed;
  } catch {
    return null;
  }
};

export default function Dashboard() {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "volunteer") return <VolunteerDashboardPage user={user} />;
  if (user.role === "artisan") return <ArtisanDashboardPage user={user} />;
  return <AdminDashboardPage user={user} />;
}
