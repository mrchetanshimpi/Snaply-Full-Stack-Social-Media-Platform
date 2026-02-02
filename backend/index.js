const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./utils/db');
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes');
const messageRouter = require('./routes/message.routes');

require('dotenv').config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); 
const corsOption = {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}
app.use(cors(corsOption));

// routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/message', messageRouter);


const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`)
})