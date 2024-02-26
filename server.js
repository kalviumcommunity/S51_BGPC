const express = require('express')
const mongoose = require('mongoose')
const { startDB, stopDB, isConnected } = require('./db.js')
const app = express()
const route = require('./router/routes.js')

app.use(express.json())
app.use("/", route)

app.get('/', (req, res)=>{
    res.send(isConnected() ? "Connected" : "Disconnected")
})

process.on('SIGINT', async () => {
  await stopDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await stopDatabase();
  process.exit(0);
});

app.get('/ping', (req, res)=>{1
    res.send("PONG")
})

if (require.main == module){
    app.listen(3000, async()=>{
        await startDB()
        console.log("Server is running on port 3000")
    })
}