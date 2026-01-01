const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());


mongoose
  .connect("mongodb+srv://vasanthansanthavel_db_user:Vasanth@6@cluster0.kofzzkc.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});