import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Firebase + MongoDB Demo</h1>

      <p>
        Backend: <strong>Connected ✓</strong>
      </p>

      <h2>Student Records</h2>

      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table
          border="1"
          cellPadding="12"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Year</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;