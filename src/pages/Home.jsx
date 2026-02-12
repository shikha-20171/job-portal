import { useState, useEffect } from "react";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs.slice(-4).reverse()); // latest 4 jobs
  }, []);

  return (
    <div style={styles.container}>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Welcome to <span style={styles.gradientText}>Jobify 🚀</span>
        </h1>
        <p style={styles.heroSubtitle}>
          Bridging the gap between talented students and growing companies. Discover opportunities, learn, and grow with Jobify.
        </p>
      </section>

      {/* Latest Jobs Preview */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Latest Jobs</h2>
        <div style={styles.grid}>
          {jobs.length === 0 && <p style={{color:"#555"}}>No jobs posted yet.</p>}
          {jobs.map((job, idx) => (
            <div key={idx} style={styles.card}>
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Type:</strong> {job.type}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Jobify Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Why Jobify?</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <h3>Students</h3>
            <ul style={styles.featureList}>
              <li>🔍 Explore jobs & internships</li>
              <li>📈 Boost your career growth</li>
              <li>📍 Filter opportunities by location & salary</li>
              <li>💼 Learn skills & work remotely</li>
            </ul>
          </div>
          <div style={styles.featureCard}>
            <h3>Employers</h3>
            <ul style={styles.featureList}>
              <li>📢 Post jobs & internships</li>
              <li>👥 Access talented students</li>
              <li>⚡ Simplified hiring process</li>
              <li>💡 Grow your team efficiently</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials / Trust Section */}
      <section style={styles.testimonials}>
        <h2 style={styles.sectionTitle}>Trusted by Thousands</h2>
        <div style={styles.testimonialGrid}>
          <div style={styles.testimonialCard}>
            <p>"Jobify helped me land my first internship easily!"</p>
            <span>- Student</span>
          </div>
          <div style={styles.testimonialCard}>
            <p>"We found amazing candidates quickly. Highly recommend!"</p>
            <span>- Employer</span>
          </div>
        </div>
      </section>

    </div>
  );
}

const styles = {
  container: {
    fontFamily:"'Poppins', sans-serif",
    background:"linear-gradient(to right,#f0f4ff,#e9ecef)",
    minHeight:"100vh",
    padding:"0 20px"
  },
  hero: {
    textAlign:"center",
    padding:"80px 20px 60px 20px"
  },
  heroTitle: {
    fontSize:"3rem",
    fontWeight:"bold",
    marginBottom:"20px"
  },
  gradientText: {
    background:"linear-gradient(90deg,#667eea,#764ba2)",
    WebkitBackgroundClip:"text",
    WebkitTextFillColor:"transparent"
  },
  heroSubtitle: {
    fontSize:"1.2rem",
    color:"#555",
    maxWidth:"700px",
    margin:"auto"
  },
  section: {
    padding:"60px 0"
  },
  sectionTitle: {
    textAlign:"center",
    fontSize:"2.5rem",
    color:"#667eea",
    marginBottom:"40px"
  },
  grid: {
    display:"flex",
    flexWrap:"wrap",
    gap:"25px",
    justifyContent:"center"
  },
  card: {
    background:"white",
    color:"#333",
    width:"280px",
    padding:"20px",
    borderRadius:"25px",
    boxShadow:"0 10px 25px rgba(0,0,0,0.15)",
    transition:"transform 0.3s, box-shadow 0.3s",
    textAlign:"center"
  },
  features: {
    padding:"60px 20px",
    marginBottom:"60px"
  },
  featuresGrid: {
    display:"flex",
    flexWrap:"wrap",
    gap:"30px",
    justifyContent:"center"
  },
  featureCard: {
    background:"#f0f4ff",
    padding:"25px",
    borderRadius:"20px",
    width:"300px",
    boxShadow:"0 10px 25px rgba(0,0,0,0.1)",
    transition:"transform 0.3s",
    cursor:"default"
  },
  featureList: {
    listStyle:"none",
    paddingLeft:"0",
    marginTop:"15px",
    fontSize:"1rem",
    color:"#555"
  },
  testimonials: {
    padding:"60px 20px",
    background:"#667eea",
    color:"#fff",
    borderRadius:"25px"
  },
  testimonialGrid: {
    display:"flex",
    flexWrap:"wrap",
    gap:"20px",
    justifyContent:"center",
    marginTop:"30px"
  },
  testimonialCard: {
    background:"rgba(255,255,255,0.15)",
    padding:"25px",
    borderRadius:"20px",
    width:"280px",
    textAlign:"center",
    backdropFilter:"blur(5px)",
    fontStyle:"italic"
  }
};
