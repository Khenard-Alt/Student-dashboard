# 📚 Student Management Dashboard

A full-stack web application for managing student records with a modern, responsive dashboard interface.

## 🛠️ Tech Stack

- **Frontend:** React.js + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MySQL
- **Tools:** VS Code, XAMPP, Postman (optional)

## ✨ Features

✅ Display summary cards (Total Students, Active Students, Graduates)  
✅ CRUD Operations (Create, Read, Update, Delete)  
✅ RESTful API  
✅ Responsive Tailwind CSS Dashboard Layout  
✅ Real-time data synchronization

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **XAMPP** (for MySQL server) - [Download here](https://www.apachefriends.org/)
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

---

## 🚀 Installation & Setup

### Step 1: Clone or Download the Project

```bash
git clone <your-repo-url>
cd dashboard-app
```

Or download the ZIP file and extract it.

---

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:
- express
- mysql2
- cors
- dotenv
- nodemon (dev dependency)

---

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend/dashboard-frontend
npm install
```

This will install:
- react
- react-dom
- axios
- tailwindcss
- postcss
- autoprefixer

---

### Step 4: Configure Environment Variables

1. Navigate to the `backend` folder
2. Open the `.env` file
3. Update the database credentials if needed:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=dashboarddb
```

**Note:** If your MySQL has a password, add it to `DB_PASSWORD=your_password`

---

### Step 5: Setup MySQL Database

#### Option 1: Using phpMyAdmin (Easiest)

1. **Start XAMPP Control Panel**
2. Click **Start** on **MySQL** (and Apache)
3. Open browser and go to: `http://localhost/phpmyadmin`
4. Click **SQL** tab
5. Copy and paste this SQL script:

```sql
CREATE DATABASE dashboarddb;

USE dashboarddb;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  course VARCHAR(100),
  year INT
);
```

6. Click **Go** to execute

#### Option 2: Using MySQL Command Line

```bash
cd C:\xampp\mysql\bin
mysql -u root -p
```

Press Enter (no password by default), then paste the SQL script above.

---

## 🎯 Running the Application

### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

**Expected Output:**
```
✅ MySQL Connected...
🚀 Server running on port 5000
```

**Troubleshooting:**
- ❌ **ECONNREFUSED error?** → Make sure XAMPP MySQL is running
- ❌ **Database not found?** → Run the SQL script in Step 5
- ❌ **Port already in use?** → Change PORT in `.env` file

---

### Terminal 2: Start Frontend Server

```bash
cd frontend/dashboard-frontend
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view dashboard-frontend in the browser.

  Local:            http://localhost:3000
```

Browser will automatically open at `http://localhost:3000`

---

## 🧪 Testing the Application

### Manual Testing

1. **Add a Student:**
   - Fill in Name, Course, and Year
   - Click **Add** button
   - Student should appear in the table

2. **View Summary Cards:**
   - Total Students: Shows all students
   - Active: Students with year ≤ 4
   - Graduates: Students with year > 4

3. **Delete a Student:**
   - Click **Delete** button on any row
   - Student should be removed from table

### API Testing (Using Postman or Browser)

**GET all students:**
```
GET http://localhost:5000/api/students
```

**POST new student:**
```
POST http://localhost:5000/api/students
Content-Type: application/json

{
  "name": "Juan Dela Cruz",
  "course": "Computer Science",
  "year": 3
}
```

**DELETE student:**
```
DELETE http://localhost:5000/api/students/1
```

---

## 📁 Project Structure

```
dashboard-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MySQL connection
│   ├── controllers/
│   │   └── studentController.js  # CRUD logic
│   ├── routes/
│   │   └── studentRoutes.js      # API routes
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server
│   ├── database.sql              # SQL schema
│   └── package.json
│
└── frontend/
    └── dashboard-frontend/
        ├── src/
        │   ├── components/       # Reusable components (optional)
        │   ├── pages/
        │   │   └── Dashboard.jsx # Main dashboard page
        │   ├── App.js            # Root component
        │   └── index.css         # Tailwind CSS
        ├── tailwind.config.js    # Tailwind configuration
        ├── postcss.config.js     # PostCSS configuration
        └── package.json
```

---

## ⚠️ Common Issues & Solutions

### 1. **Frontend won't start - Tailwind CSS error**

**Error:** `Error: It looks like you're trying to use tailwindcss directly...`

**Solution:**
```bash
cd frontend/dashboard-frontend
npm uninstall tailwindcss
npm install -D tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0
npm start
```

---

### 2. **Backend can't connect to MySQL**

**Error:** `ECONNREFUSED ::1:3306`

**Solution:**
1. Open XAMPP Control Panel
2. Click **Start** on MySQL
3. Wait for green indicator
4. Restart backend server

---

### 3. **Database already exists error**

**Solution:**
If database already exists, skip the `CREATE DATABASE` line and just run:
```sql
USE dashboarddb;
CREATE TABLE students (...);
```

---

### 4. **Port 3000 or 5000 already in use**

**Solution:**

For Backend:
- Change `PORT=5000` to `PORT=5001` in `.env`
- Update API URL in `Dashboard.jsx` to `http://localhost:5001`

For Frontend:
- Kill the process using port 3000
- Or React will ask to use another port automatically

---

### 5. **CORS Error in Browser Console**

**Solution:**
Make sure backend has `app.use(cors())` in `server.js` (already included)

---

## 🔐 Security Notes

⚠️ **IMPORTANT for Production:**

1. **Never commit `.env` file to GitHub**
   - Add `.env` to `.gitignore`
   - Use environment variables in production

2. **Add input validation**
   - Sanitize user inputs
   - Add validation on both frontend and backend

3. **Use prepared statements** (Already implemented via `?` placeholders)

4. **Add authentication**
   - Implement JWT tokens
   - Add user login/registration

---

## 🎨 Customization Ideas

Want to extend this project? Here are some ideas:

- 🔐 **Authentication:** Add JWT-based login system
- 🔍 **Search & Filter:** Add search bar and filters
- 📊 **Charts:** Use recharts or chart.js for visualizations
- ✏️ **Edit Student:** Add UPDATE functionality
- 📱 **Mobile Responsive:** Enhance mobile view
- 🎨 **Dark Mode:** Add theme toggle
- 📄 **Pagination:** Add pagination for large datasets
- 📥 **Export Data:** Export to CSV/PDF
- 🖼️ **Profile Photos:** Add student photo uploads
- 👥 **Role-based Access:** Admin vs Student views

---

## 📝 NPM Scripts

### Backend
```bash
npm start       # Run with Node.js
npm run dev     # Run with Nodemon (auto-restart)
```

### Frontend
```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
```

---

## 🤝 Contributing

If you want to contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Created with ❤️ for learning purposes.

---

## 📞 Support

If you encounter any issues:

1. Check the **Common Issues** section above
2. Make sure all prerequisites are installed
3. Verify MySQL server is running
4. Check browser console for errors
5. Check terminal for backend errors

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MySQL Tutorial](https://dev.mysql.com/doc/)
- [REST API Best Practices](https://restfulapi.net/)

---

## ✅ Checklist Before Running

- [ ] Node.js installed
- [ ] XAMPP installed
- [ ] MySQL server started in XAMPP
- [ ] Database created (ran SQL script)
- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] Frontend dependencies installed (`npm install` in frontend/dashboard-frontend/)
- [ ] `.env` file configured
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Browser opened to http://localhost:3000

---

**Happy Coding! 🚀**

*Last Updated: October 28, 2025*
