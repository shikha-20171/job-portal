import { useState, useEffect } from "react";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !company || !location || !salary || !type) {
      alert("Please fill all fields!");
      return;
    }

    const newJob = { title, company, location, salary, type };
    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    alert("Job posted successfully!");
    setTitle(""); setCompany(""); setLocation(""); setSalary(""); setType("");
  };

  return (
    <div style={styles.container}>
      <h1>Post a New Job</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          placeholder="Job Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Company Name"
          value={company}
          onChange={(e)=>setCompany(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Salary"
          value={salary}
          onChange={(e)=>setSalary(e.target.value)}
        />
        <select style={styles.input} value={type} onChange={(e)=>setType(e.target.value)}>
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>
        <button type="submit" style={styles.submitBtn}>Post Job</button>
      </form>

      {/* Preview of last 3 jobs */}
      {jobs.length > 0 && (
        <div style={{marginTop:"40px"}}>
          <h2>Recently Posted Jobs</h2>
          <div style={styles.grid}>
            {jobs.slice(-3).reverse().map((job, idx)=>(
              <div key={idx} style={styles.card}>
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Type:</strong> {job.type}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 🔹 Inline CSS
const styles = {
  container: {
    padding:"40px",
    fontFamily:"'Poppins', sans-serif",
    minHeight:"100vh",
    color:"#fff",
    background:"linear-gradient(to right,#667eea,#764ba2)"
  },
  form: {
    display:"flex",
    flexDirection:"column",
    gap:"15px",
    maxWidth:"500px",
    margin:"0 auto",
    background:"rgba(255,255,255,0.1)",
    padding:"30px",
    borderRadius:"25px",
    backdropFilter:"blur(10px)"
  },
  input: {
    padding:"12px",
    borderRadius:"15px",
    border:"none",
    fontSize:"16px"
  },
  submitBtn: {
    padding:"12px",
    borderRadius:"25px",
    border:"none",
    background:"linear-gradient(to right,#ff4d6d,#ff758f)",
    color:"white",
    fontWeight:"bold",
    cursor:"pointer",
    fontSize:"16px",
    transition:"all 0.3s"
  },
  grid: {
    display:"flex",
    flexWrap:"wrap",
    gap:"25px",
    justifyContent:"center",
    marginTop:"20px"
  },
  card: {
    background:"white",
    color:"#333",
    width:"280px",
    padding:"20px",
    borderRadius:"25px",
    boxShadow:"0 10px 25px rgba(0,0,0,0.15)",
    transition:"transform 0.3s, box-shadow 0.3s",
    cursor:"pointer"
  }
};
