const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");
const auth = require("./app/routes/auth.routes");
const user = require("./app/routes/user.routes");
const db = require("./app/models");
const Role = db.role;

const app = express();

var corsOptions = {
  origin: "http://localhost:4000",
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "venturas-session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

db.mongoose
  .connect(
    `mongodb+srv://${dbConfig.HOST}:${dbConfig.PASS}@${dbConfig.DB}/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.use("/auth", auth);
app.use("/user", user);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
