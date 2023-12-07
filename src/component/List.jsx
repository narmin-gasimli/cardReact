import React, { useState, useEffect, Component } from 'react';

const List = () => {
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://5ea5ca472d86f00016b4626d.mockapi.io/brotherhood')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWorkers(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
    -  worker.department.toLowerCase().includes(searchTerm.toLowerCase())
    -  worker.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for employee name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredWorkers.map(worker => (
          <li key={worker.id}>{worker.name}-{worker.department}-{worker.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;