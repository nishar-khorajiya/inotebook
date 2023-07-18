const connectToMongo=require('./db')
const express = require('express')
const auth =  require('./routes/auth')
const notes =  require('./routes/notes')
var cors = require('cors')
const app = express()
const path=require('path')
 
connectToMongo()

app.use(cors())
app.use(express.json())

const port = 5000

// app.get('/',(req,res)=>{
//     res.send("hey")
// })
app.use(express.static(path.join(__dirname,'./build')))
app.use(express.static(path.join(__dirname,'./build/index.html')))

app.use('/api/auth',auth)
app.use('/api/notes',notes)

app.listen(port, () => {
  console.log(`iNotebook Backend listening on port http://localhost:${port}`)
})