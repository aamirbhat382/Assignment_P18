require("dotenv").config();
const express = require( 'express');
const app = express();
const routes = require('./routes/auth');
const mongoose = require( 'mongoose');
const path = require( 'path');
const cors = require( 'cors');
const APP_PORT = 3000;

const authRoutes = require('./routes/auth')

// Database connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

global.appRoot = path.resolve(__dirname);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/uploads', express.static('uploads'));
app.use("/api", authRoutes);

const PORT = process.env.PORT || APP_PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));