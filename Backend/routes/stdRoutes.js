const router = require("express").Router();
const Products = require("../models/products");
let Student = require("../models/student");
const bycrypt = require("bcryptjs");

router.route("/add").post(async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const encryptedPass = await bycrypt.hash(password, 10);
  //create new object for student model
  const newStudent = new Student({
    firstname,
    lastname,
    email,
    password: encryptedPass,
  });
  //Meka javascript promise ekak then eken wenne success unoth "Student added" kiyala message ekak enawa
  await newStudent
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((err) => {
      //error ekak awoth eka console eken capture krnw
      console.log(err);
    });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await Student.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bycrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Password is correct, user is authenticated
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// router.route("/").get((req, res) => {
//   Student.find()
//     .then((students) => {
//       res.json(students);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.route("/").get((req, res) => {
  Products.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
