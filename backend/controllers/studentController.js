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
