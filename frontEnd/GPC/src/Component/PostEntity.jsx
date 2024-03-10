import React, { useState } from 'react';
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
          <input type="text" name="PC" value={formData.PC} onChange={handleChange} />
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
