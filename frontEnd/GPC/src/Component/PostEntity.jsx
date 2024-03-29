import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/postEntity.css';

const PostComponent = () => {
  const [formData, setFormData] = useState({
    PC: '',
    CPU: '',
    GPU: '',
    RAM: '',
    Storage: '',
    SMPS: '',
    Cabinet: '',
    Price_INR: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadMaxPC = async () => {
      try {
        const response = await axios.get('https://s51-gpc.onrender.com/getcomp');
        const database = response.data;
        
        if (database.length > 0) {
          const maxId = Math.max(...database.map(item => parseInt(item.PC.slice(2))));
          const newPC = `PC${maxId + 1}`;
          setFormData({
            ...formData,
            PC: newPC
          });
        } else {
          setFormData({
            ...formData,
            PC: 'PC1'
          });
        }
      } catch (error) {
        console.error("Error fetching entities:", error);
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    };

    loadMaxPC();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData);
  
    try {
      const response = await axios.post('https://s51-gpc.onrender.com/postComp', formData);
      console.log("Response data:", response.data);
      
      navigate('/');
  
    } catch (error) {
      console.error("Axios error:", error);
    }
  };
  
  return (
    <div className='form-container'>
      <h2>Create a New Entity</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>PC:</label>
          <input type="text" name="PC" defaultValue={formData.PC} disabled/>
        </div>
        <div>
          <label>CPU:</label>
          <input type="text" name="CPU" value={formData.CPU} onChange={handleChange} />
        </div>
        <div>
          <label>GPU:</label>
          <input type="text" name="GPU" value={formData.GPU} onChange={handleChange} />
        </div>
        <div>
          <label>RAM:</label>
          <input type="text" name="RAM" value={formData.RAM} onChange={handleChange} />
        </div>
        <div>
          <label>Storage:</label>
          <input type="text" name="Storage" value={formData.Storage} onChange={handleChange} />
        </div>
        <div>
          <label>SMPS:</label>
          <input type="text" name="SMPS" value={formData.SMPS} onChange={handleChange} />
        </div>
        <div>
          <label>Cabinet:</label>
          <input type="text" name="Cabinet" value={formData.Cabinet} onChange={handleChange} />
        </div>
        <div>
          <label>Price (INR):</label>
          <input type="text" name="Price_INR" value={formData.Price_INR} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostComponent;
