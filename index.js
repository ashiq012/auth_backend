const express = require('express')
const cors = require('cors')
const app = express();

require('dotenv').config();
const PORT = process.env.PORT ;

app.use(express.json());
const allowedOrigins = ['https://auth-app-cbwe.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

require('./config/database').connect();

const router = require('./routes/auth')
app.use('/api/v1',router)

app.listen(PORT,()=>{
    console.log(`Server start at port no ${PORT}`)
})
