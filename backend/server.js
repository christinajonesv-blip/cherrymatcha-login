const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DEMO_USER = {
  email: "demo@cherrymatcha.dev",
  password: "Cherry123",
  name: "Christy",
};

app.get("/api/health", (req, res) => {
  res.json({
    message: "CherryMatcha backend is running!",
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};

  if (
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({
      message: "Please provide your email and password.",
    });
  }

  const emailMatches =
    email.trim().toLowerCase() === DEMO_USER.email;

  const passwordMatches =
    password === DEMO_USER.password;

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({
      message: "Incorrect email or password. Please try again.",
    });
  }

  return res.status(200).json({
    message: "Login successful!",
    user: {
      name: DEMO_USER.name,
      email: DEMO_USER.email,
    },
  });
});

app.listen(PORT, () => {
  console.log(
    `CherryMatcha backend running at http://localhost:${PORT}`
  );
});

