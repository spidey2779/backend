import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser  from "cookie-parser";
import { ConnectToDB } from "./src/db/db.js";
import user from './src/routes/user.js'
import todo from './src/routes/todo.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
// Middleware to parse JSON bodies
app.use(bodyParser.json());

//Middleware to parse cookies
app.use(cookieParser());

// Middleware to enable CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
ConnectToDB();

app.get("/", (req, res) => {
  res.send("Hello spidey " + JSON.stringify(process.env.MONGODB_URI));
});
app.use("/user", user);
app.use("/todo",todo)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
