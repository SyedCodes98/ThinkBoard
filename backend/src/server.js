import express from "express";
import {connectDb} from "./config/db.js";
import routeserver from "./routes/routeserver.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"//d
dotenv.config();
import path from "path";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json())
app.use(rateLimiter);
if(process.env.NODE_ENV != "production"){
app.use(
  cors({
    origin:"http://localhost:5173"
  })
)
}
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
//      next();
    
// });
app.use("/api/notes", routeserver);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.json(__dirname,"../frontend","dist","index.html"));

  });
}
connectDb().then(()=>{
  app.listen(5001, () => {
  console.log("server started on port :5001");
});
})

//mongodb+srv://<db_username>:cRWtRwXbzqIlvuU3@cluster0.fm4vzyp.mongodb.net/