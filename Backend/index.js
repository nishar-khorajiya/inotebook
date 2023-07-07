const connectToMongo=require('./db')
const express = require('express')
const auth =  require('./routes/auth')
const notes =  require('./routes/notes')

connectToMongo()
const app = express()
app.use(express.json())

const port = 3000

app.get('/',(req,res)=>{
    res.send("hey")
})

app.use('/api/auth',auth)
app.use('/api/notes',notes)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})