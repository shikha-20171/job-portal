import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    const role = localStorage.getItem("role");

    if (role === "employer") navigate("/employer");
    else navigate("/student");
  };

  return (
    <div style={styles.box}>
      <h2>Login</h2>
      <input style={styles.input} placeholder="Email" />
      <input style={styles.input} placeholder="Password" type="password" />
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
    background: "#764ba2",
    color: "white"
  }
};
