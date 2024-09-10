import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Ambil pengguna dari API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  // Filter pengguna berdasarkan pencarian (nama, email, atau telepon)
  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <h1>Team Users</h1>
      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id}>
              <div className="user-info">
                <strong>{user.name}</strong>
                <br />
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </div>
              <div className="contact-info">
                <a href={`tel:${user.phone}`}>{user.phone}</a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
