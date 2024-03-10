import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Styles/patch.css";

const Patch = () => {
  const navigate = useNavigate();
  const { pc } = useParams();
  const [config, setConfig] = useState({
    CPU: "",
    GPU: "",
    RAM: "",
    Storage: "",
    SMPS: "",
    Cabinet: "",
    Price_INR: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://s51-gpc.onrender.com/getcomp/${pc}`
        );
        console.log(response.data);
        setConfig(response.data);
      } catch (error) {
        console.error("Error fetching entity:", error);
      }
    };

    fetchData();
  }, [pc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://s51-gpc.onrender.com/putComp/${pc}`, config);
      navigate("/");
    } catch (error) {
      console.error("Error updating entity:", error);
    }
  };

  return (
    <div id="edit-form">
      <h2>Edit Config</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="CPU">CPU:</label>
          <input
            type="text"
            id="CPU"
            name="CPU"
            value={config.CPU}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="GPU">GPU:</label>
          <input
            type="text"
            id="GPU"
            name="GPU"
            value={config.GPU}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="RAM">RAM:</label>
          <input
            type="text"
            id="RAM"
            name="RAM"
            value={config.RAM}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Storage">Storage:</label>
          <input
            type="text"
            id="Storage"
            name="Storage"
            value={config.Storage}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="SMPS">SMPS:</label>
          <input
            type="text"
            id="SMPS"
            name="SMPS"
            value={config.SMPS}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Cabinet">Cabinet:</label>
          <input
            type="text"
            id="Cabinet"
            name="Cabinet"
            value={config.Cabinet}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Price_INR">Price (INR):</label>
          <input
            type="text"
            id="Price_INR"
            name="Price_INR"
            value={config.Price_INR}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="update-button">
          Update
        </button>
        <Link to="/" className="cancel-link">
          <button className="cancel-button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default Patch;
