import React, { useState } from "react";
import axios from "../utils/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  // validation hooks
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const navigate = useNavigate();

  const isFormValid = () => {
    const NameValidity = name.trim().length > 0;
    const passwordValidity = password.length >= 8 && password.length <= 16;
    const confirmPasswordValidity =
      password === confirmPassword && confirmPassword !== "";
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let emailValidity = false;
    if (email.match(validRegex)) {
      emailValidity = true;
    }
    setIsNameValid(NameValidity);
    setIsPasswordValid(passwordValidity);
    setIsEmailValid(emailValidity);
    setIsConfirmPasswordValid(confirmPasswordValidity);
    if (
      NameValidity &&
      passwordValidity &&
      confirmPasswordValidity &&
      emailValidity
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    try {
      const res = await axios.post("/api/v1/register", {
        name,
        email,
        password,
      });
      toast.success(res?.data?.message, {
        position: "bottom-left",
      });
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "bottom-left",
      });
    }
  };
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <form className="card-body p-5" onSubmit={handleSubmit}>
                <h3 className="mb-3 text-center">Register</h3>

                <div className="form-outline mb-3">
                  <label className="form-label " htmlFor="typeEmailX-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {!isNameValid && (
                    <div className="invalid">
                      <span>* Please enter a valid Name</span>
                    </div>
                  )}
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label " htmlFor="typeEmailX-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {!isEmailValid && (
                    <div className="invalid">
                      <span>* Please enter a valid Email .</span>
                    </div>
                  )}
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="typePasswordX-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!isPasswordValid && (
                    <div className="invalid">
                      <span>
                        {password.length === 0
                          ? "* Password is required field"
                          : password.length < 8
                          ? "* Password should contain atleast 8 characters"
                          : "* Password should contain less than 16 characters"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="typePasswordX-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />

                  {!isConfirmPasswordValid && (
                    <div className="invalid">
                      <span>
                        Confirm password does not match with current password
                      </span>
                    </div>
                  )}
                </div>
                <button className="btn btn-primary btn-lg btn-block w-100" type="submit">
                  Register
                </button>

                <hr className="my-4" />

                <p>
                  Already a user? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
