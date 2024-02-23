const cors = require('cors');
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Hello there")
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})