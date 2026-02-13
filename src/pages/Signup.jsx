import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup({ setRole }) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    // Save role
    localStorage.setItem("role", selectedRole);

    // 🔥 Update App state immediately
    setRole(selectedRole);

    alert("Signup Successful!");

    // Redirect based on role
    if (selectedRole === "employer") {
      navigate("/employer");
    } else {
      navigate("/student");
    }
  };

  return (
    <div style={styles.box}>
      <h2 style={styles.heading}>Create Account</h2>

      <form onSubmit={handleSignup}>
        <select
          style={styles.input}
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="employer">Employer</option>
        </select>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" style={styles.btn}>
          Signup
        </button>
      </form>
    </div>
  );
}

const styles = {
  box: {
    maxWidth: "420px",
    margin: "100px auto",
    padding: "35px",
    borderRadius: "25px",
    background: "white",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  heading: {
    marginBottom: "20px",
    color: "#667eea"
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
