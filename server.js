const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const expressMongoDb = require("express-mongo-db");

const app = express();

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": true,
  "optionsSuccessStatus": 204
}));

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

// Settings
app.set("port", process.env.PORT || 5000);

// Middlewares
// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  "origin": [" http://localhost:5000", "*"],
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": true,
  "optionsSuccessStatus": 204
}));
app.use(expressMongoDb(process.env.DATABASE_URL));

// Importing routes
const coursesRouter = require("./routes/courses");
const studentsRouter = require("./routes/students");
const studentsCoursesRouter = require("./routes/studentsCourses");
const studentsCoursesGradesRouter = require("./routes/studentsCoursesGrades");

// Routes
app.use("/courses", coursesRouter);
app.use("/students", studentsRouter);
app.use("/studentsCourses", studentsCoursesRouter);
app.use("/studentsCoursesGrades", studentsCoursesGradesRouter);
