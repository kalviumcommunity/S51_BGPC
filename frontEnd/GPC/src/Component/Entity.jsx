import React from 'react'
import data from  '../data.json'
import '../Styles/entity.css'

const Entity = () => {
  
  return (
    <div className='data'>
      <h2>Entity</h2>
      <p>PC: {data.PC}</p>
      <p>CPU: {data.CPU}</p>
      <p>GPU: {data.GPU}</p>
      <p>RAM: {data.RAM}</p>
      <p>Storage: {data.Storage}</p>
      <p>Cabinet: {data.Cabinet}</p>
      <p>Price: {data.Price_INR}</p>
    </div>
  )
}

export default Entity
