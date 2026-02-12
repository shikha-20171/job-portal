import { useState, useEffect } from "react";

export default function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [viewSaved, setViewSaved] = useState(false);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);

    const storedSaved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(storedSaved);

    const storedApplied = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(storedApplied);
  }, []);

  // Save job
  const saveJob = (job) => {
    if (!savedJobs.find(j => j.title === job.title && j.company === job.company)) {
      const updated = [...savedJobs, job];
      setSavedJobs(updated);
      localStorage.setItem("savedJobs", JSON.stringify(updated));
    }
  };

  // Apply for job
  const applyJob = (job) => {
    if (!appliedJobs.find(j => j.title === job.title && j.company === job.company)) {
      const newApplied = [...appliedJobs, { ...job, resume: resume?.name || "No Resume" }];
      setAppliedJobs(newApplied);
      localStorage.setItem("appliedJobs", JSON.stringify(newApplied));
      alert("Applied successfully!");
      setSelectedJob(null);
      setResume(null);
    } else {
      alert("Already applied to this job.");
    }
  };

  // Filter jobs safely
  const filteredJobs = jobs.filter(
    (job) =>
      (job.title ?? "").toLowerCase().includes(search.toLowerCase()) &&
      (job.location ?? "").toLowerCase().includes(locationFilter.toLowerCase()) &&
      (job.salary ?? "").toLowerCase().includes(salaryFilter.toLowerCase()) &&
      (job.type ?? "").toLowerCase().includes(typeFilter.toLowerCase())
  );

  const displayJobs = viewSaved ? savedJobs : filteredJobs;

  return (
    <div style={styles.container}>
      <h1>{viewSaved ? "Saved Jobs ❤️" : "Available Jobs"}</h1>

      {/* Toggle Saved / All */}
      <button style={styles.toggleBtn} onClick={() => setViewSaved(!viewSaved)}>
        {viewSaved ? "View All Jobs" : "View Saved Jobs"}
      </button>

      {/* Filters only if viewing all jobs */}
      {!viewSaved && (
        <div style={styles.filters}>
          <input placeholder="Search by title" style={styles.input} onChange={e => setSearch(e.target.value)} />
          <input placeholder="Filter by location" style={styles.input} onChange={e => setLocationFilter(e.target.value)} />
          <input placeholder="Filter by salary" style={styles.input} onChange={e => setSalaryFilter(e.target.value)} />
          <select style={styles.input} onChange={e => setTypeFilter(e.target.value)}>
            <option value="">Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
      )}

      {/* Job Cards */}
      <div style={styles.grid}>
        {displayJobs.length === 0 && <p style={{color:"#fff"}}>No jobs found.</p>}
        {displayJobs.map((job, idx) => (
          <div key={idx} style={styles.card} onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-10px)";
            e.currentTarget.style.boxShadow = "0 20px 35px rgba(0,0,0,0.3)";
          }} onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
          }}>
            <h3>{job.title ?? "N/A"}</h3>
            <p><strong>Company:</strong> {job.company ?? "N/A"}</p>
            <p><strong>Location:</strong> {job.location ?? "N/A"}</p>
            <p><strong>Salary:</strong> {job.salary ?? "N/A"}</p>
            <p><strong>Type:</strong> {job.type ?? "N/A"}</p>
            {viewSaved && <p>❤️ Saved</p>}
            {!viewSaved && (
              <div style={styles.cardButtons}>
                <button style={styles.applyBtn} onClick={() => setSelectedJob(job)}>Apply</button>
                <button style={styles.saveBtn} onClick={() => saveJob(job)}>❤️ Save</button>
              </div>
            )}
            {/* Show applied history */}
            {appliedJobs.find(j => j.title === job.title && j.company === job.company) && <p style={{color:"green", fontWeight:"bold"}}>✔ Applied</p>}
          </div>
        ))}
      </div>

      {/* Apply Modal */}
      {selectedJob && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Apply for {selectedJob.title ?? "N/A"}</h3>
            <input style={styles.input} placeholder="Your Name" />
            <input style={styles.input} placeholder="Email" />
            <input type="file" onChange={e => setResume(e.target.files[0])} style={styles.input} />
            <button style={styles.applyBtn} onClick={() => applyJob(selectedJob)}>Submit Application</button>
            <button style={styles.closeBtn} onClick={() => setSelectedJob(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// 🔹 Inline CSS
const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Poppins', sans-serif",
    color: "#fff",
    minHeight: "100vh",
    background: "linear-gradient(to right,#667eea,#764ba2)"
  },
  toggleBtn: {
    padding: "10px 20px",
    borderRadius: "25px",
    border: "none",
    background: "#ff758f",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "20px"
  },
  filters: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  input: {
    padding: "10px",
    borderRadius: "15px",
    border: "none",
    minWidth: "150px"
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "25px",
    justifyContent: "center"
  },
  card: {
    background: "white",
    color: "#333",
    width: "280px",
    padding: "20px",
    borderRadius: "25px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: "transform 0.3s, box-shadow 0.3s"
  },
  cardButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px"
  },
  applyBtn: {
    padding: "8px 15px",
    borderRadius: "20px",
    border: "none",
    background: "linear-gradient(to right,#667eea,#764ba2)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },
  saveBtn: {
    padding: "8px 15px",
    borderRadius: "20px",
    border: "none",
    background: "#ff4d6d",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },
  modal: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modalContent: {
    background: "white",
    padding: "30px",
    borderRadius: "25px",
    width: "400px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    color: "#333"
  },
  closeBtn: {
    marginTop: "10px",
    padding: "8px 15px",
    borderRadius: "20px",
    border: "none",
    background: "gray",
    color: "white",
    cursor: "pointer"
  }
};
