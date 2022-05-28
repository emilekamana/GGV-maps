const express = require('express')
const mongoose = require('mongoose')
const uiRoutes = require('./routes/uiRoutes')
const transponderRoutes = require('./routes/transponderRoutes')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express');
require('dotenv').config()


const app = express()
// JSON body parser 
app.use(express.json())
// morgan HTTP logger
app.use(morgan('tiny'))
app.set("view engine", "ejs");

var port = process.env.PORT || 3000;

//Connect to the database
mongoose.connect(
    `mongodb+srv://emile:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, 
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
app.use("/api/transponder", transponderRoutes);

app.use("/", uiRoutes)
// app.get('/', (req, res) => {
//     // res.send('ok');
//     const transponders = await transponderModel.find({});
//     try {
//         res.render("index", {"transponders": transponders});
//         // res.send();
//       } catch (error) {
//         res.status(500).send(error);
//       }
    
// });
app.use(express.static('public'));
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})