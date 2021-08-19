const { Client } = require("pg");
const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());


// db client
const client = new Client({
    user: process.env.DB_CLIENT_USER,
    host: process.env.DB_CLIENT_HOST,
    database: process.env.DB_CLIENT_DATABASE,
    password: process.env.DB_CLIENT_PASSWORD,
    port: 5432,
  });
  
client.connect(()=>{
    console.log("connected to DB!")
});

  


app.listen(process.env.PORT || 5000,()=>{
    console.log("running on port",process.env.PORT || 5000)
})

