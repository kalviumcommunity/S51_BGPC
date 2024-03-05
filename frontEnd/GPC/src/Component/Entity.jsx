import React, { useEffect, useState } from 'react';
import '../Styles/entity.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Entity = () => {
  const [Database, setDatabase] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getcomp');
        setDatabase(response.data);
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    loadPost();
  }, []);

  const handleDelete = async (pc) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${pc}`);
      setDatabase(Database.filter(item => item.PC !== pc));
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  };

  return (
    <>
      <div className='getentity'>
        {Database.map((item, index) => (
          <div key={index} className="entity">
            <h2>Config</h2>
            <p>PC: {item.PC}</p>
            <p>CPU: {item.CPU}</p>
            <p>GPU: {item.GPU}</p>
            <p>RAM: {item.RAM}</p>
            <p>Storage: {item.Storage}</p>
            <p>SMPS: {item.SMPS}</p>
            <p>Cabinet: {item.Cabinet}</p>
            <p>Price: {item.Price_INR}</p>
            <button onClick={() => handleDelete(item.PC)} id='btns'>Delete</button>
            <Link to={`/edit/${item.PC}`}>
              <button id='btns'>Edit</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Entity;
