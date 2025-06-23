
# 📊 Excel Analytics Platform

A full-stack web application for uploading Excel files, visualizing data through charts (2D & 3D), and generating AI-powered smart analysis and insights.


Start the full project using './deploy.sh'
---

## 🚀 Features

- ✅ Upload Excel (`.xlsx`) files
- ✅ Parse and preview uploaded data
- ✅ Generate interactive charts (Bar, Line, Pie, 3D)
- ✅ Smart analysis and chart suggestions using OpenAI
- ✅ User authentication (JWT-based)
- ✅ Secure file handling and storage
- ✅ Responsive React frontend

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- Chart.js / Three.js (for 3D charts)
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- Multer (file upload handling)
- JWT (Authentication)
- OpenAI API (for insights)

---

## 📁 Folder Structure

```
/frontend
  ├── src/
  ├── components/
  └── services/

/backend
  ├── routes/
  ├── controllers/
  ├── models/
  ├── middleware/
  └── utils/
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Swargpatel/Excel-Analytics-Swarg.git
cd Excel-Analytics-Swarg
```

### 2. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 3. Environment Variables

Create a `.env` file in both `frontend/` and `backend/` with the following:

#### `backend/.env`
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

#### `frontend/.env`
```env
REACT_APP_API_URL=http://localhost:5000/
```

---

## 🧪 Running the App

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend
```bash
cd frontend
npm start
```

---

## 📸 Screenshots

> _Include screenshots of file upload, chart display, and AI insights if available._

---

## 🧠 Smart Analysis (AI Feature)

- Automatically generates data insights and visual recommendations using OpenAI
- Helps users understand trends without manual interpretation

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [OpenAI API](https://platform.openai.com)
- [Chart.js](https://www.chartjs.org/)
- [MERN Stack Docs](https://www.mongodb.com/mern-stack)
