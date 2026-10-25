
import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    grade: "",
  });

  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setForm({ name: "", age: "", grade: "" });
  };

  const addStudent = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.age || !form.grade) {
      return;
    }

    setStudents((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        name: form.name.trim(),
        age: form.age,
        grade: form.grade,
      },
    ]);

    clearForm();
  };

  const removeStudent = (id) => {
    setStudents((prev) =>
      prev.filter((student) => student.id !== id)
    );
  };

  return (
    <main className="page">
      <section className="student-card">
        <header className="header">
          <h1>Student Entry Form</h1>
          <p>Add students and review the list below.</p>
        </header>

        <form onSubmit={addStudent}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. MS Dhoni"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="e.g. 15"
                min="1"
                value={form.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="grade">Grade</label>
              <select
                id="grade"
                name="grade"
                value={form.grade}
                onChange={handleChange}
                required
              >
                <option value="">Select grade</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Grade {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="add-button">
              Add Student
            </button>

            <button
              type="button"
              className="clear-button"
              onClick={clearForm}
            >
              Clear
            </button>
          </div>
        </form>

        <section className="student-list">
          {students.length === 0 ? (
            <p className="empty-message">
              No students added yet.
            </p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Grade</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.grade}</td>
                      <td>
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() =>
                            removeStudent(student.id)
                          }
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
