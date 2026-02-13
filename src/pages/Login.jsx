import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setRole }) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select role");
      return;
    }

    // Save role
    localStorage.setItem("role", selectedRole);
    setRole(selectedRole);   // 🔥 VERY IMPORTANT

    alert("Login Successful!");

    if (selectedRole === "employer") {
      navigate("/employer");
    } else {
      navigate("/student");
    }
  };

  return (
    <div style={styles.box}>
      <h2 style={styles.heading}>Login</h2>

      <input style={styles.input} placeholder="Email" />
      <input style={styles.input} placeholder="Password" type="password" />

      {/* Role Selection */}
      <select
        style={styles.input}
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        <option value="">Select Role</option>
        <option value="student">Student</option>
        <option value="employer">Employer</option>
      </select>

      <button style={styles.btn} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

const styles = {
  box: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "35px",
    borderRadius: "25px",
    background: "white",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  heading: {
    marginBottom: "20px",
    color: "#764ba2"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "15px"
  },
  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(to right,#667eea,#764ba2)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s"
  }
};
