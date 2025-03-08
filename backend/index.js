const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const Score = require("./models/quizschema");

const app = express();
app.use(express.json());
app.use(cors());

const mongoUrl =
  "mongodb+srv://sadvibayyavarapu:sadvi134ash2004@cluster0.zyjmmfq.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log("Error connecting to database:", e));

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: "Error creating employee", error: err });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record found");
    }
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
});

app.post("/quizAttempted", async (req, res) => {
  const { score } = req.body;
  const newScore = new Score({ score });
  try {
    await newScore.save();
    res.status(201).json({ message: "Score saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving score", error });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
