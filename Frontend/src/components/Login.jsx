import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const navigate = useNavigate();

  function validateForm() {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    setIsSubmitDisabled(Object.keys(newErrors).length > 0);
  }

  async function login(e) {
    e.preventDefault();

    validateForm();

    if (isSubmitDisabled) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8050/student/login", {
        email: email,
        password: password,
      });
      console.log(response.data.message);
      alert("Login Success");
      navigate("/home");
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.message);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card login-card shadow">
        <h2 className="card-title text-center mb-4">Login</h2>
        <form onSubmit={login}>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                id="email"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateForm();
                }}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password && "is-invalid"}`}
                id="exampleInputPassword1"
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
              Submit
            </button>
            <p className="mt-3 mb-0">
              Don't have an account?{" "}
              <Link to="/register" className="register-link text-decoration-none">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
