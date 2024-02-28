const express = require('express')
const mongoose = require('mongoose')
const { startDB, stopDB, isConnected } = require('./db.js')
const app = express()
const route = require('./router/routes.js')
const cors = require('cors');

app.use(express.json())
app.use("/", route)
app.use(
  cors())
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    cors();
  });
// Example in Express.js
app.get('/', (req, res)=>{
    res.send(isConnected() ? "Connected" : "Disconnected")
})

app.get('/ping', (req, res)=>{
    res.send("PONG")
})

if (require.main == module){
    app.listen(3000, async()=>{
        await startDB()
        console.log("Server is running on port 3000")
    })
}