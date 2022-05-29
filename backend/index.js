// Import required libraries
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const uiRoutes = require('./routes/uiRoutes')
const transponderRoutes = require('./routes/transponderRoutes')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express');
require('dotenv').config()

const app = express()
// JSON body parser 
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
// morgan HTTP logger
app.use(morgan('tiny'))
// view engine to render
app.set("view engine", "ejs");

// setup cors to provide access/make the the api public
app.use(cors({
  origin: '*',
  credentials: false,
}));

//Connect to the database
mongoose.connect(
    `mongodb+srv://emile:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  
// Test MongoDB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Add routes to express
app.use("/api/transponder", transponderRoutes);
app.use("/", uiRoutes)

// Set folder for static files
app.use(express.static('public'));

// Start the app on port 3000 locally or server set port on deployment
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})