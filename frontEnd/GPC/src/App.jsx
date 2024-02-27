import { useState } from 'react'
import './App.css'
import Entity from './Component/Entity'

function App() {

  return (
    <>
    <div className='heading'>
      <div id='title'>
        <h1>WELCOME TO BGPC</h1>
        <h2>Budget Gaming PC Components</h2>
      </div>
      <div className="container">
        <p>Create your dream gaming rig without breaking the bank with our Budget PC Builder. Simply input your budget, and our smart configurator will handpick the best gaming PC components, including the perfect cabinet, to maximize performance within your specified budget. Enjoy a seamless and user-friendly experience as you customize your build, visualize it in real-time, and receive alternative recommendations if needed. Building your gaming PC has never been this easy and affordable!</p>
      </div>
    </div>
    <Entity />
    </>
  )
}

export default App
