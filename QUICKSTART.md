# 🚀 QUICK START GUIDE

Para sa mga baguhan - follow these simple steps!

## ⚡ 5-Minute Setup

### 1️⃣ Install Requirements (One-time only)

Download and install these:
- ✅ [Node.js](https://nodejs.org/) - Choose LTS version
- ✅ [XAMPP](https://www.apachefriends.org/) - For MySQL
- ✅ [VS Code](https://code.visualstudio.com/) - Code editor (optional)

---

### 2️⃣ Install Project Dependencies

Open **PowerShell** or **Command Prompt** and run:

```powershell
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend/dashboard-frontend
npm install
```

---

### 3️⃣ Setup Database

1. **Open XAMPP Control Panel**
2. Click **Start** on **MySQL**
3. Click **Admin** (opens phpMyAdmin in browser)
4. Click **SQL** tab at the top
5. **Copy-paste this code:**

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

6. Click **Go**

✅ Done! Database is ready!

---

### 4️⃣ Run the Application

**Open 2 terminals (or 2 tabs in VS Code terminal):**

#### Terminal 1 - Backend:
```powershell
cd backend
npm run dev
```

**Wait for this message:**
```
✅ MySQL Connected...
🚀 Server running on port 5000
```

#### Terminal 2 - Frontend:
```powershell
cd frontend/dashboard-frontend
npm start
```

**Wait for browser to auto-open at:** `http://localhost:3000`

---

## ✅ You're Done!

You should now see the **Student Dashboard** in your browser!

### What you can do:
- ➕ Add students using the form
- 📊 View summary cards (Total, Active, Graduates)
- ❌ Delete students from the table
- 👀 See real-time updates

---

## ❓ Problems?

### ❌ Backend won't start?
- Make sure **XAMPP MySQL** is running (green in XAMPP)
- Check if you ran the SQL script

### ❌ Frontend won't start?
- Wait 1-2 minutes (first run is slow)
- Check if backend is running first

### ❌ Can't connect to database?
- Open `.env` file in `backend` folder
- Check if `DB_PASSWORD=` is empty (or add your MySQL password)

---

## 📚 Need More Help?

Read the full **README.md** for:
- Detailed troubleshooting
- API testing guide
- Customization ideas
- Security notes

---

**Happy Coding! 🎉**
