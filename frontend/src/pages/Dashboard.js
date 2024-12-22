import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import * as XLSX from 'xlsx';
import './Dashboard.css';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [places, setPlaces] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [filters, setFilters] = useState({
    class: '',
    placeOfBirth: '',
    faculty: '',
  });
  const [searchQuery, setSearchQuery] = useState(''); // State cho tìm kiếm

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, students, searchQuery]); // Thêm searchQuery vào dependency array

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/students');
      setStudents(response.data);
      setFilteredStudents(response.data);
      extractFilterOptions(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const extractFilterOptions = (data) => {
    const classSet = new Set(data.map((student) => student.class));
    const placeSet = new Set(data.map((student) => student.placeOfBirth));
    const facultySet = new Set(data.map((student) => student.faculty));

    setClasses([...classSet]);
    setPlaces([...placeSet]);
    setFaculties([...facultySet]);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = students;

    // Lọc theo filter
    if (filters.class) {
      filtered = filtered.filter((student) => student.class === filters.class);
    }
    if (filters.placeOfBirth) {
      filtered = filtered.filter((student) => student.placeOfBirth === filters.placeOfBirth);
    }
    if (filters.faculty) {
      filtered = filtered.filter((student) => student.faculty === filters.faculty);
    }

    // Lọc theo tìm kiếm
    if (searchQuery) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  };

  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredStudents.map((student) => ({
        'Student ID': student.studentId,
        Name: student.name,
        Class: student.class,
        'Date of Birth': moment(student.dob).format('DD/MM/YYYY'),
        'Place of Birth': student.placeOfBirth,
        Faculty: student.faculty,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, 'Student_List.xlsx');
  };

  const handleViewDetails = (id) => {
    navigate(`/student/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Student Dashboard</h1>

      {/* Bộ lọc và ô tìm kiếm */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by Name or Student ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Xử lý thay đổi giá trị tìm kiếm
          className="search-input"
        />
        <select name="class" value={filters.class} onChange={handleFilterChange}>
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <select name="placeOfBirth" value={filters.placeOfBirth} onChange={handleFilterChange}>
          <option value="">All Places</option>
          {places.map((place) => (
            <option key={place} value={place}>{place}</option>
          ))}
        </select>

        <select name="faculty" value={filters.faculty} onChange={handleFilterChange}>
          <option value="">All Faculties</option>
          {faculties.map((faculty) => (
            <option key={faculty} value={faculty}>{faculty}</option>
          ))}
        </select>
      </div>

      {/* Nút xuất file Excel và tìm kiếm */}
      <div className="export-search-container">
        <button className="export-button" onClick={exportToExcel}>
          Export to Excel
        </button>
      </div>

      {/* Bảng sinh viên */}
      <table className="students-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Date of Birth</th>
            <th>Place of Birth</th>
            <th>Faculty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{moment(student.dob).format('DD/MM/YYYY')}</td>
              <td>{student.placeOfBirth}</td>
              <td>{student.faculty}</td>
              <td>
                <div className="actions">
                  <button className="edit-button" onClick={() => handleEdit(student._id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(student._id)}>Delete</button>
                  <button className="view-button" onClick={() => handleViewDetails(student._id)}>View Details</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
