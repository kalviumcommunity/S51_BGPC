import React, { useEffect, useState } from "react";
import "../Styles/entity.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Entity = () => {
  const [database, setDatabase] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState("all");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await axios.get(
          "https://s51-gpc.onrender.com/getcomp"
        );
        setDatabase(response.data);
      } catch (error) {
        console.error("Error fetching entities:", error);
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    };

    loadPost();
  }, []);

  const handleDelete = async (pc) => {
    try {
      await axios.delete(`https://s51-gpc.onrender.com/delete/${pc}`);
      setDatabase(database.filter((item) => item.PC !== pc));
      
      const maxPC = Math.max(...database.map((item) => parseInt(item.PC.slice(2))));
      localStorage.setItem('maxPC', `PC${maxPC}`);
    } catch (error) {
      console.error("Error deleting entity:", error);
    }
  };
  const handleFilterChange = (event) => {
    setSelectedCreator(event.target.value);
  };

  const filteredDatabase =
    selectedCreator === "all"
      ? database
      : database.filter((item) => item.Creator === selectedCreator);

  return (
    <>
      <div>
        <select
          value={selectedCreator}
          onChange={handleFilterChange}
          id="creators"
        >
          <option value="all">All</option>
          <option value="Mark Zuckerberg">Mark Zuckerberg</option>
          <option value="Bill Gates">Bill Gates</option>
          <option value="Elon Musk">Elon Musk</option>
        </select>
      </div>
      <div className="getentity">
        {filteredDatabase.map((item, index) => (
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
            <p>Creator: {item.Creator}</p>
            <div className="btn-container">
              <button onClick={() => handleDelete(item.PC)} id="btns">
                Delete
              </button>
              <Link to={`/edit/${item.PC}`}>
                <button id="btns" className="link">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Entity;
