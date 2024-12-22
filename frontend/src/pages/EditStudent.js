import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditStudent.css';

function EditStudent() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    studentId: '',
    dob: '',
    placeOfBirth: '',
    faculty: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/students/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await axios.put(`http://localhost:5000/students/${id}`, formData);
      navigate('/dashboard'); 
    } catch (error) {
      setError('Failed to update student. Please try again later.');
      console.error('Error updating student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="edit-student-container">
      <div className="edit-student-form">
        <h1>Edit Student Information</h1>
        {error && <div className="error-message">{error}</div>} {/* Hiển thị thông báo lỗi nếu có */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              placeholder="Enter class"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter student ID"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={handleChange}
              placeholder="Enter place of birth"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              placeholder="Enter faculty"
              required
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
