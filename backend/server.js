import express from "express";
//dotenv
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";

//importing our song routes
import songRoutes from "./routes/song.js";

//importing our user routes
import userRoutes from "./routes/user.js";

import mongoose from "mongoose";

//create express app
const app = express();

//cors
app.use(cors());

//middlewares
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/songs", songRoutes);
app.use("/api/user", userRoutes);


//connect to db
//async in nature, so then is fired when it is completed
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //once connected to db, listen for request
    app.listen(4000, () => console.log("connected to db and Server is running on port 4000"));
  })
  .catch((error) => {
    console.log(error);
  });
