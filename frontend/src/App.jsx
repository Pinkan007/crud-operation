import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./main.css";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    gender: "",
  });

  const [students, setStudents] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchStudents = () => {
    axios
      .get("http://localhost:8080/fetchStudent")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      age: "",
      phone: "",
      gender: "",
    });
    setIsEditMode(false);
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      axios
        .put(`https://crud-operation-1-2hm6.onrender.com/updateStudent/${editId}`, formData)
        .then((res) => {
          alert(res.data.message);
          resetForm();
          fetchStudents();
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("https://crud-operation-1-2hm6.onrender.com//createStudent", formData)
        .then((res) => {
          alert(res.data);
          resetForm();
          fetchStudents();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`https://crud-operation-1-2hm6.onrender.com//deleteUser/${id}`)
        .then((res) => {
          alert(res.data.message);
          fetchStudents();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      email: student.email,
      age: student.age,
      phone: student.phone,
      gender: student.gender,
    });
    setEditId(student._id);
    setIsEditMode(true);
  };

  return (
    <div className="table-container">
      <h1>Student Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="gender"
          placeholder="Enter your gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditMode ? "Update" : "Register"}
        </button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((element, index) => (
              <tr key={element._id}>
                <td>{index + 1}</td>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.age}</td>
                <td>{element.phone}</td>
                <td>{element.gender}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(element)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(element._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
