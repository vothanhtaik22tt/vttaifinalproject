import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import Header from './components/Header';
import StudentDetail from './pages/StudentDetail';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation();
  const hideHeader = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      {!hideHeader && <Header />} {/* Ẩn Header nếu là trang Login */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
        <Route path="/student/:studentId" element={<StudentDetail />} />
      </Routes>
    </>
  );
}

export default App;
