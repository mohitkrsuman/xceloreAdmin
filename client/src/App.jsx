import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./pages/AdminHome";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import EditUser from "./components/EditUser";

const isAuthenticated = () => (localStorage.getItem("token") ? true : false);
function PrivateOutlet() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}
function PublicOutlet() {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/dashboard" />;
}

function App() {
  const user = useSelector((state) => state.user);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/dashboard" element={<Home />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/edit" element={<EditUser />} />
        </Route>
        <Route path="/" element={<PublicOutlet />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<PublicOutlet />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/admin/dashboard" element={<AdminHome />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
