const express = require("express");
const router = express.Router();
const studentSchema = require("../schema/studentSchema");

router.post("/create-student", (req, res, next) => {
  studentSchema.create(req.body, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  });
});

router.get("/", (req, res, next) => {
  studentSchema.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});

router.post("/login", (req, res) => {
  const { name, email, password } = req.body;
  studentSchema.findOne({ email: email }).then((student) => {
    if (student) {
      // databasepassword === given password
      if (student.password === password) {
        res.json("login successfull");
      } else {
        res.json("Password incorrect");
      }
    } else {
      console.log("No record exits");
    }
  });
});

router.delete("/delete-student/:id", (req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});

router
  .route("/update-student/:id")
  .get((req, res, next) => {
    // console.log("Hi from server");
    studentSchema.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      } else {
        console.log("Hi from server");
        return res.json(data);
      }
    });
  })
  .put((req, res, next) => {
    studentSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      (err, data) => {
        if (err) {
          return next(err);
        } else {
          return res.json(data);
        }
      }
    );
  });

module.exports = router;
/*const express = require("express");
const router = express.Router();
const studentSchema = require("../schema/studentSchema");

router.post("/create-student", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingStudent = await studentSchema.findOne({ email: email });
    if (existingStudent) {
      return res.status(400).json({ error: "Account with this email already exists" });
    }

    // Create a new student
    const newStudent = await studentSchema.create({ name, email, password });

    res.status(201).json(newStudent);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({ error: "Bad Request. Check your data and try again." });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const students = await studentSchema.find();
    res.json(students);
  } catch (err) {
    next(err);
  }
});

router.post("/login", (req, res) => {
  const { name, email, password } = req.body;
  studentSchema.findOne({ email: email }).then((student) => {
    if (student) {
      // databasepassword === given password
      if (student.password === password) {
        res.json("login successfull");
      } else {
        res.json("Password incorrect");
      }
    } else {
      console.log("No record exits");
    }
  });
});

router.delete("/delete-student/:id", (req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});

router
  .route("/update-student/:id")
  .get((req, res, next) => {
    // console.log("Hi from server");
    studentSchema.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      } else {
        console.log("Hi from server");
        return res.json(data);
      }
    });
  })
  .put((req, res, next) => {
    studentSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      (err, data) => {
        if (err) {
          return next(err);
        } else {
          return res.json(data);
        }
      }
    );
  });

module.exports = router;
*/