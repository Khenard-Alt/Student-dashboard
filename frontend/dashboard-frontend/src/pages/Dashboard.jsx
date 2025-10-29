import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", course: "", year: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/students", form);
      setForm({ name: "", course: "", year: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Total Students</h2>
          <p className="text-2xl font-bold">{students.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Active</h2>
          <p className="text-2xl font-bold">
            {students.filter((s) => s.year <= 4).length}
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Graduates</h2>
          <p className="text-2xl font-bold">
            {students.filter((s) => s.year > 4).length}
          </p>
        </div>
      </div>

      {/* Add Student Form */}
      <form onSubmit={addStudent} className="mb-6 grid grid-cols-4 gap-2">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Course"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add
        </button>
      </form>

      {/* Student Table */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Course</th>
            <th className="p-3">Year</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-3">{s.id}</td>
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.course}</td>
              <td className="p-3">{s.year}</td>
              <td className="p-3">
                <button
                  onClick={() => deleteStudent(s.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
