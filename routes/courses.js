const express = require("express");
const router = express.Router();

// Get all
router.get("/", (req, res) => {
  req.db
    .collection("courses")
    .find()
    .toArray((err, result) => {
      if (err) res.status(500).json({ message: err.message });

      res.json(result);
    });
});

// Get one
router.get("/:id", getCourse, (req, res) => {
  res.json(res.course);
});

// Creating one
router.post("/", (req, res) => {
  req.db.collection("courses").insert(req.body, (err, result) => {
    if (err) return res.status(400).json({ message: err.message });

    res.status(201).json(req.body);
  });
});

// Updating one
router.patch("/:id", getCourse, (req, res) => {
  if (req.body.code == null) {
    req.body.code = res.course.code;
  }
  if (req.body.name == null) {
    req.body.name = res.course.name;
  }
  if (req.body.credits == null) {
    req.body.credits = res.course.credits;
  }
  if (req.body.department == null) {
    req.body.department = res.course.department;
  }
  req.db.collection("courses").findOneAndUpdate(
    {
      $or: [{ code: req.params.id }, { name: req.params.id }]
    },
    {
      $set: {
        code: req.body.code,
        name: req.body.name,
        credits: req.body.credits,
        department: req.body.department
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
  req.db.collection("courses").findOneAndDelete(
    {
      $or: [{ code: req.params.id }, { name: req.params.id }]
    },
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.value == null)
        return res.status(404).json({ message: "Cannot find course" });

      res.json({ message: "Deleted Course" });
    }
  );
});

// Middleware
async function getCourse(req, res, next) {
  let course;
  try {
    course = await req.db
      .collection("courses")
      .findOne({ $or: [{ code: req.params.id }, { name: req.params.id }] });
    if (course == null) {
      return res.status(404).json({ message: "Cannot find course" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.course = course;
  next();
}

module.exports = router;
