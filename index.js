const express = require('express')
const cors = require('cors')
const app = express();

require('dotenv').config();
const PORT = process.env.PORT ;

app.use(express.json());
app.use(cors());

require('./config/database').connect();

const router = require('./routes/auth')
app.use('/api/v1',router)

app.listen(PORT,()=>{
    console.log(`Server start at port no ${PORT}`)
})