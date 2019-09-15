const express = require("express");
const router = express.Router();

// Get all
router.get("/", (req, res) => {
  req.db
    .collection("students")
    .find()
    .toArray((err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json(result);
    });
});

// Get one
router.get("/:id", getStudent, (req, res) => {
  res.json(res.student);
});

// Creating one
router.post("/", (req, res) => {
  req.db.collection("students").insert(req.body, (err, result) => {
    if (err) return res.status(400).json({ message: err.message });

    res.status(201).json(req.body);
  });
});

// Updating one
router.patch("/:id", getStudent, (req, res) => {
  if (req.body.name == null) {
    req.body.name = res.student.name;
  }
  if (req.body.mail == null) {
    req.body.mail = res.student.mail;
  }
  if (req.body.password == null) {
    req.body.password = res.student.password;
  }
  req.db.collection("students").findOneAndUpdate(
    {
      mail: req.params.id
    },
    {
      $set: {
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password,
        courses: req.body.courses
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
  req.db.collection("students").findOneAndDelete(
    {
      mail: req.params.id
    },
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.value == null)
        return res.status(404).json({ message: "Cannot find student" });

      res.json({ message: "Deleted Student" });
    }
  );
});

// Middleware
async function getStudent(req, res, next) {
  let student;
  try {
    student = await req.db
      .collection("students")
      .findOne({ mail: req.params.id });
    if (student == null) {
      return res.status(404).json({ message: "Cannot find student" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.student = student;
  next();
}

module.exports = router;
