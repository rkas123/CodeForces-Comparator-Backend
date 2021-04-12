import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user.js";
import clistRoutes from "./routes/clist.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/list", clistRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL =
  "mongodb+srv://rupesh:test123@cluster0.zb48t.mongodb.net/CodeForcesComparatorDB?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });

mongoose.set("useFindAndModify", false);
