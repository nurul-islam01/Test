const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");
const auth = require("./app/routes/auth.routes");
const user = require("./app/routes/user.routes");
const car = require("./app/routes/car.routes");
const city = require("./app/routes/city.routes");

const db = require("./app/models");

const app = express();

var corsOptions = {
  credentials: true,
  exposedHeaders: ["set-cookie"],
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

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
app.use("/car", car);
app.use("/city", city);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
