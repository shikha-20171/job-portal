import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const handleSignup = () => {
    localStorage.setItem("role", role);
    alert("Signup Successful!");
    navigate("/login");
  };

  return (
    <div style={styles.box}>
      <h2>Signup</h2>

      <select
        style={styles.input}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="employer">Employer</option>
      </select>

      <input style={styles.input} placeholder="Email" />
      <input style={styles.input} placeholder="Password" type="password" />

      <button style={styles.btn} onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}

const styles = {
  box: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    borderRadius: "20px"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px"
  },
  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "30px",
    border: "none",
    background: "#667eea",
    color: "white"
  }
};
