import express from "express";
import {connectDb} from "./config/db.js";
import routeserver from "./routes/routeserver.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.resolve(__dirname, "../../frontend/react-project/dist");
app.use(express.json())
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
//      next();
    
// });
app.use("/api/notes", rateLimiter, routeserver);

app.use(express.static(frontendDist));
app.get("*", (req, res, next) => {
  if (req.path === "/api" || req.path.startsWith("/api/")) {
    return res.sendStatus(404);
  }
  res.sendFile(path.join(frontendDist, "index.html"), (error) => {
    if (error) next(error);
  });
});
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server started on port :${PORT}`);
  });
});