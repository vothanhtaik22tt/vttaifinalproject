import React from 'react';

function StudentForm({ formData, setFormData, handleSubmit, buttonLabel }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="class"
        placeholder="Class"
        value={formData.class}
        onChange={handleChange}
        required
      />
      <input
        name="studentId"
        placeholder="Student ID"
        value={formData.studentId}
        onChange={handleChange}
        required
      />
      <input
        name="dob"
        type="date"
        placeholder="Date of Birth"
        value={formData.dob}
        onChange={handleChange}
        required
      />
      <input
        name="placeOfBirth"
        placeholder="Place of Birth"
        value={formData.placeOfBirth}
        onChange={handleChange}
        required
      />
      <input
        name="faculty"
        placeholder="Faculty"
        value={formData.faculty}
        onChange={handleChange}
        required
      />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

export default StudentForm;
