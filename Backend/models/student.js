const mongoose = require("mongoose");

const schema = mongoose.Schema;

const studentSchema = new schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//creating a model named "Student" using the Mongoose library and the "studentSchema" variable
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
