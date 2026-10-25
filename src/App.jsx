
import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    grade: "",
  });

  const [students, setStudents] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setForm({
      name: "",
      age: "",
      grade: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const age = Number(form.age);

    if (
      !name ||
      !form.age ||
      !Number.isInteger(age) ||
      age <= 0 ||
      !form.grade
    ) {
      return;
    }

    const student = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
      name,
      age,
      grade: form.grade,
    };

    setStudents((prev) => [...prev, student]);
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
          <p>Add students and manage the list.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Alex Smith"
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
                step="1"
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
                {Array.from({ length: 12 }, (_, index) => {
                  const grade = index + 1;

                  return (
                    <option key={grade} value={grade}>
                      Grade {grade}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="add-button">
              Add student
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
