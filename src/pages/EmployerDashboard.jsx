import { useState, useEffect } from "react";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");
  const [applicants, setApplicants] = useState({}); // key: jobTitle, value: array of applicants

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);

    const storedApplicants = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    // Convert to object {jobTitle: [applicants]}
    const appObj = {};
    storedApplicants.forEach(a => {
      const key = `${a.title}-${a.company}`;
      if (!appObj[key]) appObj[key] = [];
      appObj[key].push(a);
    });
    setApplicants(appObj);
  }, []);

  const saveJobs = (updatedJobs) => {
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const deleteJob = (job) => {
    const updated = jobs.filter(j => j !== job);
    saveJobs(updated);
    alert("Job deleted successfully!");
  };

  const openEdit = (job) => {
    setEditJob(job);
    setTitle(job.title);
    setCompany(job.company);
    setLocation(job.location);
    setSalary(job.salary);
    setType(job.type);
  };

  const saveEdit = () => {
    const updatedJobs = jobs.map(j => j === editJob ? { title, company, location, salary, type } : j);
    saveJobs(updatedJobs);
    setEditJob(null);
  };

  return (
    <div style={styles.container}>
      <h1>Employer Dashboard</h1>

      {/* Posted Jobs Grid */}
      <div style={styles.grid}>
        {jobs.length === 0 && <p style={{color:"#fff"}}>No jobs posted yet.</p>}
        {jobs.map((job, idx) => {
          const key = `${job.title}-${job.company}`;
          const applicantCount = applicants[key]?.length || 0;

          return (
            <div key={idx} style={styles.card} onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 20px 35px rgba(0,0,0,0.3)";
            }} onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
            }}>
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p style={{color:"#667eea"}}>Applicants: {applicantCount}</p>

              <div style={styles.cardButtons}>
                <button style={styles.editBtn} onClick={() => openEdit(job)}>Edit</button>
                <button style={styles.deleteBtn} onClick={() => deleteJob(job)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editJob && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Edit Job</h3>
            <input style={styles.input} placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
            <input style={styles.input} placeholder="Company" value={company} onChange={e=>setCompany(e.target.value)} />
            <input style={styles.input} placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />
            <input style={styles.input} placeholder="Salary" value={salary} onChange={e=>setSalary(e.target.value)} />
            <select style={styles.input} value={type} onChange={e=>setType(e.target.value)}>
              <option value="">Select Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
            <button style={styles.applyBtn} onClick={saveEdit}>Save Changes</button>
            <button style={styles.closeBtn} onClick={()=>setEditJob(null)}>Close</button>
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
    background:"linear-gradient(to right,#764ba2,#667eea)"
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
    transition:"transform 0.3s, box-shadow 0.3s"
  },
  cardButtons: {
    display:"flex",
    justifyContent:"space-between",
    marginTop:"15px"
  },
  editBtn: {
    padding:"8px 15px",
    borderRadius:"20px",
    border:"none",
    background:"#667eea",
    color:"white",
    cursor:"pointer",
    fontWeight:"bold"
  },
  deleteBtn: {
    padding:"8px 15px",
    borderRadius:"20px",
    border:"none",
    background:"#ff4d6d",
    color:"white",
    cursor:"pointer",
    fontWeight:"bold"
  },
  modal: {
    position:"fixed",
    top:0,left:0,
    width:"100%",height:"100%",
    background:"rgba(0,0,0,0.6)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    zIndex:1000
  },
  modalContent: {
    background:"white",
    padding:"30px",
    borderRadius:"25px",
    width:"400px",
    textAlign:"center",
    display:"flex",
    flexDirection:"column",
    gap:"15px",
    color:"#333"
  },
  input: {
    padding:"10px",
    borderRadius:"15px",
    border:"1px solid #ccc"
  },
  applyBtn: {
    padding:"8px 15px",
    borderRadius:"20px",
    border:"none",
    background:"linear-gradient(to right,#667eea,#764ba2)",
    color:"white",
    cursor:"pointer",
    fontWeight:"bold"
  },
  closeBtn: {
    marginTop:"10px",
    padding:"8px 15px",
    borderRadius:"20px",
    border:"none",
    background:"gray",
    color:"white",
    cursor:"pointer"
  }
};
