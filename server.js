const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const commentRoute = require('./routes/commentRoute');
const newsRoute = require('./routes/newsRoute');

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

//Routing Middlewares
app.use("/api/user", userRoutes);
app.use("/api/comment", commentRoute);
app.use("/api/news", newsRoute);

//Server Creation 
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port,() => {
     console.log(`Running Server on port: ${port}`);
      console.log("MongoDB Connected!");
    });
  })
  .catch((err) => {
    console.log(err);
  });