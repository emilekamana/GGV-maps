const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express');
require('dotenv').config()


const app = express()
// JSON body parser 
app.use(express.json())
// morgan HTTP logger
app.use(morgan('tiny'))

//Connect to the database
mongoose.connect(
    `mongodb+srv://emile:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  
  // test MongoDB connection
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });

app.get('/', (req, res) => {
    res.send('ok');
  });

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})