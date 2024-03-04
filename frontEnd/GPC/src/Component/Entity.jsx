import React, { useEffect, useState } from 'react';
import '../Styles/entity.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Entity = () => {
  const [Database, setDatabase] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      const response = await axios.get('http://localhost:3000/getcomp');
      setDatabase(response.data);
    };

    loadPost();
  }, []);

  return (
    <>
      <div className='getentity'>
      {Database.map((item, index) => {
        return (
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
          </div>
        );
      })}
      </div>
    </>
  );
};

export default Entity;
