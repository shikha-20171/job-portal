export default function About() {
  return (
    <div style={styles.container}>
      <h1 style={styles.mainHeading}>About <span style={styles.gradientText}>Jobify</span></h1>

      <p style={styles.paragraph}>
        Jobify is a next-generation <strong>job portal</strong> designed to bridge the gap 
        between talented students and growing companies. Our platform makes job searching 
        and hiring <strong>fast, transparent, and efficient</strong>.
      </p>

      {/* Students Section */}
      <div style={styles.card}>
        <h2 style={styles.subHeading}>For Students</h2>
        <ul style={styles.list}>
          <li>🔍 Search jobs easily</li>
          <li>🚀 Apply in one click</li>
          <li>📍 Filter by salary & location</li>
          <li>💼 Find internships & remote work</li>
        </ul>
      </div>

      {/* Employers Section */}
      <div style={styles.card}>
        <h2 style={styles.subHeading}>For Employers</h2>
        <ul style={styles.list}>
          <li>📢 Post unlimited jobs</li>
          <li>📈 Manage applications efficiently</li>
          <li>👨‍💻 Find top skilled candidates</li>
        </ul>
      </div>

      <p style={styles.paragraph}>
        Our mission is to create <strong>equal opportunities</strong> for everyone and 
        make hiring <strong>simple, fair, and transparent</strong>.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "60px 20px",
    maxWidth: "1000px",
    margin: "auto",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: "1.8",
    color: "#333",
    background: "linear-gradient(to right, #f8f9fa, #e9ecef)"
  },
  mainHeading: {
    fontSize: "3rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px"
  },
  gradientText: {
    background: "linear-gradient(90deg,#667eea,#764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  paragraph: {
    fontSize: "1.1rem",
    textAlign: "center",
    marginBottom: "40px",
    color: "#555"
  },
  card: {
    background: "white",
    padding: "25px 30px",
    borderRadius: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    marginBottom: "30px",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "default"
  },
  cardHover: {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
  },
  subHeading: {
    fontSize: "2rem",
    color: "#667eea",
    marginBottom: "15px",
    textAlign: "center"
  },
  list: {
    listStyleType: "none",
    paddingLeft: "0",
    fontSize: "1.1rem",
    color: "#555"
  }
};
