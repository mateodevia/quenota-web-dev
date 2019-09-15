const express = require("express");
const router = express.Router();

// Get all
router.get("/", (req, res) => {
  req.db
    .collection("studentsCoursesGrades")
    .find()
    .toArray((err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json(result);
    });
});

// Get one
router.get("/:id", getStudentCourseGrade, (req, res) => {
  res.json(res.studentCourseGrade);
});

// Creating one
router.post("/", (req, res) => {
  req.db.collection("studentsCoursesGrades").insert(req.body, (err, result) => {
    if (err) return res.status(400).json({ message: err.message });

    res.status(201).json(req.body);
  });
});

// Updating one
router.patch("/:id/:grade", getStudentCourseGrade, (req, res) => {
  if (req.body.gradeId == null) {
    req.body.gradeId = res.studentCourseGrade.gradeId;
  }
  if (req.body.nameGrade == null) {
    req.body.nameGrade = res.studentCourseGrade.nameGrade;
  }
  if (req.body.currentGrade == null) {
    req.body.currentGrade = res.studentCourseGrade.currentGrade;
  }
  if (req.body.percentage == null) {
    req.body.percentage = res.studentCourseGrade.percentage;
  }
  req.db.collection("studentsCoursesGrades").findOneAndUpdate(
    {
      gradeId: req.params.id,
      nameGrade: req.params.grade
    },
    {
      $set: {
        gradeId: req.body.gradeId,
        nameGrade: req.body.nameGrade,
        currentGrade: req.body.currentGrade,
        percentage: req.body.percentage
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
  req.db.collection("studentsCoursesGrades").findOneAndDelete(
    {
      gradeId: req.params.id
    },
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.value == null)
        return res
          .status(404)
          .json({ message: "Cannot find studentCourseGrade" });

      res.json({ message: "Deleted StudentCourseGrade" });
    }
  );
});

// Middleware
async function getStudentCourseGrade(req, res, next) {
  let studentCourseGrade;
  try {
    studentCourseGrade = await req.db
      .collection("studentsCoursesGrades")
      .findOne({ gradeId: req.params.id });
    if (studentCourseGrade == null) {
      return res
        .status(404)
        .json({ message: "Cannot find studentCourseGrade" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.studentCourseGrade = studentCourseGrade;
  next();
}

module.exports = router;
