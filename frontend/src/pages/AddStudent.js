import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddStudent.css';

function AddStudent() {
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
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/students', formData);
      if (response.status === 200) {
        setSuccessMessage('Add student complete');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      setError('Failed to add student. Please try again later.');
      console.error('Error adding student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="add-student-container">
      <div className="add-student-form">
        <h1>Add New Student</h1>
        {error && <div className="error-message">{error}</div>} {/* Hiển thị thông báo lỗi nếu có */}
        {successMessage && <div className="success-message">{successMessage}</div>} {/* Hiển thị thông báo thành công */}
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
            {isSubmitting ? 'Submitting...' : 'Add Student'}
          </button>
        </form>
        <button onClick={handleGoBack} className="back-button">
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default AddStudent;
