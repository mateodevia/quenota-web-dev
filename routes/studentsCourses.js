const express = require("express");
const router = express.Router();

// Get all
router.get("/", (req, res) => {
  req.db
    .collection("studentsCourses")
    .find()
    .toArray((err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json(result);
    });
});

// Get one
router.get("/:id", getStudentCourse, (req, res) => {
  res.json(res.studentCourse);
});

// Creating one
router.post("/", (req, res) => {
  req.db.collection("studentsCourses").insert(req.body, (err, result) => {
    if (err) return res.status(400).json({ message: err.message });

    res.status(201).json(req.body);
  });
});

// Updating one
router.patch("/:id/:code", getStudentCourse, (req, res) => {
  if (req.body.courseId == null) {
    req.body.courseId = res.studentCourse.courseId;
  }
  if (req.body.nameCourse == null) {
    req.body.nameCourse = res.studentCourse.nameCourse;
  }
  if (req.body.codeCourse == null) {
    req.body.codeCourse = res.studentCourse.codeCourse;
  }
  if (req.body.gradeObjective == null) {
    req.body.gradeObjective = res.studentCourse.gradeObjective;
  }
  if (req.body.approximation == null) {
    req.body.approximation = res.studentCourse.approximation;
  }
  req.db.collection("studentsCourses").findOneAndUpdate(
    {
      courseId: req.params.id,
      codeCourse: req.params.code
    },
    {
      $set: {
        courseId: req.body.courseId,
        nameCourse: req.body.nameCourse,
        codeCourse: req.body.codeCourse,
        gradeObjective: req.body.gradeObjective,
        approximation: req.body.approximation
      }
    },
    (err, result) => {
      if (err) return res.status(400).json({ message: err.message });

      res.json(result);
    }
  );
});

// Delete one
router.delete("/:id", (req, res) => {
  req.db.collection("studentsCourses").findOneAndDelete(
    {
      courseId: req.params.id
    },
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.value == null)
        return res.status(404).json({ message: "Cannot find studentCourse" });

      res.json({ message: "Deleted StudentCourse" });
    }
  );
});

// Middleware
async function getStudentCourse(req, res, next) {
  let studentCourse;
  try {
    studentCourse = await req.db
      .collection("studentsCourses")
      .findOne({ courseId: req.params.id });
    if (studentCourse == null) {
      return res.status(404).json({ message: "Cannot find studentCourse" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.studentCourse = studentCourse;
  next();
}

module.exports = router;
