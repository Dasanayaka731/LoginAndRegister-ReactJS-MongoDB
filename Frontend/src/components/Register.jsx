import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  function validateForm() {
    const newErrors = {};

    if (!firstname) {
      newErrors.firstname = "First name is required";
    }

    if (!lastname) {
      newErrors.lastname = "Last name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 5) {
      newErrors.password = "Password should be at least 6 characters long";
    }

    setErrors(newErrors);
    setIsSubmitDisabled(Object.keys(newErrors).length > 0);
  }

  function saveData(e) {
    e.preventDefault();

    validateForm();

    if (isSubmitDisabled) {
      return;
    }

    const newStudent = {
      firstname,
      lastname,
      email,
      password,
    };

    axios
      .post("http://localhost:8050/student/add", newStudent)
      .then(() => {
        alert("Student Added");
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card register-card shadow">
        <h2 className="card-title text-center mb-4">Register</h2>
        <form onSubmit={saveData}>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="fname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.firstname && "is-invalid"}`}
                id="fname"
                onChange={(e) => {
                  setFirstname(e.target.value);
                  validateForm();
                }}
              />
              {errors.firstname && (
                <div className="invalid-feedback">{errors.firstname}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.lastname && "is-invalid"}`}
                id="lname"
                onChange={(e) => {
                  setLastname(e.target.value);
                  validateForm();
                }}
              />
              {errors.lastname && (
                <div className="invalid-feedback">{errors.lastname}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateForm();
                }}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
              <div className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password && "is-invalid"}`}
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateForm();
                }}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>
          <div className="card-footer text-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitDisabled}
            >
              Register
            </button>
            <p className="mt-3 mb-0">
              Already have an account?{" "}
              <Link to="/" className="login-link text-decoration-none">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
