import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Patch = () => {
  const navigate = useNavigate();
  const { pc } = useParams();
  const [config, setConfig] = useState({
    CPU: '',
    GPU: '',
    RAM: '',
    Storage: '',
    SMPS: '',
    Cabinet: '',
    Price_INR: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getcomp/${pc}`);
        console.log(response.data)
        setConfig(response.data);
      } catch (error) {
        console.error('Error fetching entity:', error);
      }
    };

    fetchData();
  }, [pc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prevConfig => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/putComp/${pc}`, config);
      navigate('/');
    } catch (error) {
      console.error('Error updating entity:', error);
    }
  };

  return (
    <div>
      <h2>Edit Config</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CPU:</label>
          <input
            type="text"
            name="CPU"
            value={config.CPU}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>GPU:</label>
          <input
            type="text"
            name="GPU"
            value={config.GPU}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>RAM:</label>
          <input
            type="text"
            name="RAM"
            value={config.RAM}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Storage:</label>
          <input
            type="text"
            name="Storage"
            value={config.Storage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>SMPS:</label>
          <input
            type="text"
            name="SMPS"
            value={config.SMPS}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cabinet:</label>
          <input
            type="text"
            name="Cabinet"
            value={config.Cabinet}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price (INR):</label>
          <input
            type="text"
            name="Price_INR"
            value={config.Price_INR}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
        <Link to='/'>
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default Patch;
