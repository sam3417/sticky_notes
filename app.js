import  express from "express";
import web from "./routes/web.js";
import connect1 from "./db/connection.js";
import fs from "fs";
import  path from "path";

const app = express();
app.use(express.urlencoded());

const port = process.env.port || 3000;

const db_url = "mongodb://localhost:27017";
connect1(db_url)

 
app.set("view engine","ejs");

app.use('/note',web)

app.listen(port,()=>{
  console.log(`server running at port ${port}`)
})