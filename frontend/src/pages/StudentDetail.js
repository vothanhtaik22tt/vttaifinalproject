import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './StudentDetail.css';

function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/students/studentId/${id}`);
        setStudent(response.data);
      } catch (error) {
        setError('Failed to fetch student details. Try again later.');
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!student) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="student-detail">
      <h1>Student Details</h1>
      <div className="student-info">
        <img src={student.imageUrl || 'default-image-url.jpg'} alt={student.name} />
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Student ID:</strong> {student.studentId}</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Date of Birth:</strong> {student.dob}</p>
        <p><strong>Place of Birth:</strong> {student.placeOfBirth}</p>
        <p><strong>Faculty:</strong> {student.faculty}</p>
      </div>
    </div>
  );
}

export default StudentDetail;
