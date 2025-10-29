Overview 
Goal: Build a “Student Management Dashboard” 
Stack: 
 Frontend: React.js + Tailwind CSS 
 Backend: Node.js + Express.js 
 Database: MySQL 
 Tools: VS Code, Postman/Insomnia, MySQL Workbench 
Key Features: 
✅ Display summary cards (total students, active students, etc.) 
✅ CRUD (Create, Read, Update, Delete) operations 
✅ RESTful API connection 
✅ Tailwind dashboard layout 
1. Setup the Project Structure 
Create a parent folder: 
mkdir dashboard-app 
cd dashboard-app 
Inside it: 
mkdir backend frontend 
2. Backend Setup (Node + Express + MySQL) 
Step 1: Initialize Node Project 
cd backend 
npm init -y 
Step 2: Install dependencies 
npm install express mysql2 cors dotenv 
npm install --save-dev nodemon 
Step 3: Setup folder structure 
backend/ 
├── node_modules/ 
├── server.js 
├── .env 
├── config/ 
│   └── db.js 
├── routes/ 
│   └── studentRoutes.js 
├── controllers/ 
│   └── studentController.js 
└── package.json 
Step 4: Create .env 
PORT=5000 
DB_HOST=localhost 
DB_USER=root 
DB_PASSWORD= 
DB_NAME=dashboarddb 
Step 5: Configure MySQL connection (config/db.js) 
import mysql from "mysql2"; 
import dotenv from "dotenv"; 
dotenv.config(); 
const db = mysql.createConnection({ 
host: process.env.DB_HOST, 
user: process.env.DB_USER, 
password: process.env.DB_PASSWORD, 
database: process.env.DB_NAME, 
}); 
db.connect((err) => { 
if (err) throw err; 
console.log("✅ MySQL Connected..."); 
}); 
export default db; 
Step 6: Create a Student Controller (controllers/studentController.js) 
import db from "../config/db.js"; 
// GET all students 
export const getStudents = (req, res) => { 
db.query("SELECT * FROM students", (err, results) => { 
if (err) return res.status(500).json({ error: err.message }); 
res.json(results); 
}); 
}; 
// ADD a new student 
export const addStudent = (req, res) => { 
const { name, course, year } = req.body; 
db.query("INSERT INTO students (name, course, year) VALUES (?, ?, ?)", 
[name, course, year], 
(err, results) => { 
if (err) return res.status(500).json({ error: err.message }); 
res.json({ message: "Student added successfully" }); 
} 
); 
}; 
// DELETE a student 
export const deleteStudent = (req, res) => { 
const { id } = req.params; 
db.query("DELETE FROM students WHERE id = ?", [id], (err, results) => { 
if (err) return res.status(500).json({ error: err.message }); 
res.json({ message: "Student deleted" }); 
}); 
}; 
Step 7: Define Routes (routes/studentRoutes.js) 
import express from "express"; 
import { getStudents, addStudent, deleteStudent } from 
"../controllers/studentController.js"; 
const router = express.Router(); 
router.get("/", getStudents); 
router.post("/", addStudent); 
router.delete("/:id", deleteStudent); 
export default router; 
Step 8: Setup the Express Server (server.js) 
import express from "express"; 
import cors from "cors"; 
import dotenv from "dotenv"; 
import db from "./config/db.js"; 
import studentRoutes from "./routes/studentRoutes.js"; 
dotenv.config(); 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 
// Routes 
app.use("/api/students", studentRoutes); 
app.listen(process.env.PORT, () => console.log(`🚀 Server running on port 
${process.env.PORT}`)); 
Step 9: Create MySQL Table 
Run this in MySQL Workbench: 
CREATE DATABASE dashboarddb; 
USE dashboarddb; 
CREATE TABLE students ( 
id INT AUTO_INCREMENT PRIMARY KEY, 
name VARCHAR(100), 
course VARCHAR(100), 
year INT 
); 
Then run the backend: 
npx nodemon server.js 
✅ Check API: 
GET http://localhost:5000/api/students 
POST http://localhost:5000/api/students 
3. Frontend Setup (React + Tailwind) 
Step 1: Create React App 
cd ../frontend 
npx create-react-app dashboard-frontend 
cd dashboard-frontend 
Step 2: Install dependencies 
npm install axios 
npm install -D tailwindcss postcss autoprefixer 
npx tailwindcss init -p 
Step 3: Configure Tailwind 
Edit tailwind.config.js: 
content: [ 
"./src/**/*.{js,jsx,ts,tsx}", 
], 
theme: { extend: {} }, 
plugins: [], 
Edit src/index.css: 
@tailwind base; 
@tailwind components; 
@tailwind utilities; 
 
Step 4: Folder Structure 
src/ 
 ├── components/ 
 │   ├── Navbar.jsx 
 │   ├── Sidebar.jsx 
 │   ├── StudentTable.jsx 
 ├── pages/ 
 │   └── Dashboard.jsx 
 ├── App.jsx 
 ├── index.js 
 
Step 5: Create a Basic Dashboard Layout (App.jsx) 
import Dashboard from "./pages/Dashboard"; 
 
function App() { 
  return ( 
    <div className="min-h-screen bg-gray-100"> 
      <Dashboard /> 
    </div> 
  ); 
} 
 
export default App; 
 
Step 6: Dashboard Page (pages/Dashboard.jsx) 
import { useEffect, useState } from "react"; 
import axios from "axios"; 
 
const Dashboard = () => { 
  const [students, setStudents] = useState([]); 
  const [form, setForm] = useState({ name: "", course: "", year: "" }); 
 
  useEffect(() => { 
    fetchStudents(); 
  }, []); 
 
  const fetchStudents = async () => { 
    const res = await axios.get("http://localhost:5000/api/students"); 
    setStudents(res.data); 
  }; 
 
  const addStudent = async (e) => { 
    e.preventDefault(); 
    await axios.post("http://localhost:5000/api/students", form); 
    setForm({ name: "", course: "", year: "" }); 
    fetchStudents(); 
  }; 
 
  const deleteStudent = async (id) => { 
    await axios.delete(`http://localhost:5000/api/students/${id}`); 
    fetchStudents(); 
  }; 
 
  return ( 
    <div className="p-6"> 
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1> 
 
      {/* Add Student Form */} 
      <form onSubmit={addStudent} className="mb-6 grid grid-cols-4 gap-2"> 
        <input type="text" placeholder="Name" value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          className="p-2 border rounded" required /> 
        <input type="text" placeholder="Course" value={form.course} 
          onChange={(e) => setForm({ ...form, course: e.target.value })} 
          className="p-2 border rounded" required /> 
        <input type="number" placeholder="Year" value={form.year} 
          onChange={(e) => setForm({ ...form, year: e.target.value })} 
          className="p-2 border rounded" required /> 
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue
600">Add</button> 
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
                <button onClick={() => deleteStudent(s.id)} className="text
red-500 hover:text-red-700"> 
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
 
Step 7: Run the Frontend 
npm start 
✅ Visit http://localhost:3000 
You’ll now see your React + Tailwind Dashboard connected to your Node + MySQL backend. 
4. (Optional) Add Summary Cards 
At the top of the Dashboard, before the form: 
<div className="grid grid-cols-3 gap-4 mb-6"> 
  <div className="bg-blue-100 p-4 rounded shadow text-center"> 
    <h2 className="text-lg font-semibold">Total Students</h2> 
    <p className="text-2xl font-bold">{students.length}</p> 
  </div> 
  <div className="bg-green-100 p-4 rounded shadow text-center"> 
    <h2 className="text-lg font-semibold">Active</h2> 
    <p className="text-2xl font-bold">{students.filter(s => s.year <= 
4).length}</p> 
  </div> 
  <div className="bg-yellow-100 p-4 rounded shadow text-center"> 
    <h2 className="text-lg font-semibold">Graduates</h2> 
    <p className="text-2xl font-bold">{students.filter(s => s.year > 
4).length}</p> 
  </div> 
</div> 
5. Wrap-Up 
✅ Frontend: React + Tailwind (UI + CRUD) 
✅ Backend: Node + Express (API + Routes) 
✅ Database: MySQL (Persistent data storage) 
✅ Communication: Axios REST API 
You can now extend this with: 
 JWT Authentication 
 Search and Filtering 
 Charts (using recharts or chart.js) 
 Role-based dashboards 