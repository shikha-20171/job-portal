
  import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployerDashboard from "./pages/EmployerDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import PostJob from "./pages/PostJob";
import About from "./pages/About";
import { useState, useEffect } from "react";

export default function App() {
  const [role, setRole] = useState("");

  // Load role from localStorage on mount
  useEffect(() => {
    const savedRole = localStorage.getItem("role") || "";
    setRole(savedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole("");
    window.location.href = "/";
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <h2 style={{ cursor: "pointer" }}>
          <Link to="/" style={styles.logo}>Jobify 🚀</Link>
        </h2>

        <div style={styles.navLinks}>
          <Link style={styles.link} to="/">Home</Link>
          <Link style={styles.link} to="/about">About</Link>

          {/* Show Login/Signup only if no role */}
          {role === "" && (
            <>
              <Link style={styles.link} to="/login">Login</Link>
              <Link style={styles.link} to="/signup">Signup</Link>
            </>
          )}

          {/* Student Dashboard link */}
          {role === "student" && (
            <Link style={styles.link} to="/student">Dashboard</Link>
          )}

          {/* Employer Dashboard + Post Job links */}
          {role === "employer" && (
            <>
              <Link style={styles.link} to="/employer">Dashboard</Link>
              <Link style={styles.link} to="/post-job">Post Job</Link>
            </>
          )}

          {/* Logout button if logged in */}
          {role !== "" && (
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/signup" element={<Signup setRole={setRole} />} />
        <Route path="/employer" element={<EmployerDashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    color: "#fff"
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 50px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    background: "rgba(0,0,0,0.15)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "28px",
    fontWeight: "bold"
  },
  navLinks: {
    display: "flex",
    alignItems: "center"
  },
  link: {
    margin: "0 15px",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s",
  },
  logoutBtn: {
    marginLeft: "15px",
    padding: "8px 20px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(to right,#ff4d6d,#ff758f)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s"
  }
};
