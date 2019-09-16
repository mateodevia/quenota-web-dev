const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const expressMongoDb = require("express-mongo-db");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
} else {
  app.use(express.static("client/build"));

  app.get("*", (req, env) => {
    resizeBy.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Connecting to Database
let db;
MongoClient.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, database) => {
    if (err) return console.log(err);
    db = database;
    console.log("Connected to database");

    app.listen(app.get("port"), () =>
      console.log(`Server on port ${app.get("port")}`)
    );
  }
);

// Importing routes
const coursesRouter = require("./routes/courses");
const studentsRouter = require("./routes/students");
const studentsCoursesRouter = require("./routes/studentsCourses");
const studentsCoursesGradesRouter = require("./routes/studentsCoursesGrades");

// Settings
app.set("port", process.env.PORT || 5000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(expressMongoDb(process.env.DATABASE_URL));

// Routes
app.use("/courses", coursesRouter);
app.use("/students", studentsRouter);
app.use("/studentsCourses", studentsCoursesRouter);
app.use("/studentsCoursesGrades", studentsCoursesGradesRouter);
