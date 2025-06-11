import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import connectionRoutes from './routes/connection.routes.js'; // Add this import

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming request with json payload (from req.body)
app.use(cookieParser());// to parse the incoming request)

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/connections", connectionRoutes); // Add this line for the new connection routes

app.get("/", (req, res) => {
 // root route http://localhost:5000/
 res.send("hello world!");
});
 
app.listen(PORT, () => {
  connectToMongoDB();  
  console.log(`server Running on port ${PORT}`);
});
