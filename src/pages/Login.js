import React, { useState } from "react";
import axios from "../utils/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context";
const Login = () => {
  const { setIsAuthenticated } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // validation hooks
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const navigate = useNavigate();

  const isFormValid = () => {
    const passwordValidity = password.length >= 8 && password.length <= 16;
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let emailValidity = false;
    if (email.match(validRegex)) {
      emailValidity = true;
    }
    setIsPasswordValid(passwordValidity);
    setIsEmailValid(emailValidity);
    if (passwordValidity && emailValidity) {
      return true;
    }
    return false;
  };

  const onFormFill = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    try {
      const res = await axios.post("/api/v1/login", {
        email,
        password,
      });
      toast.success(res?.data?.message, {
        position: "bottom-left",
      });
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "bottom-left",
      });
      setIsAuthenticated(false);
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <form className="card-body p-5 " onSubmit={onFormFill}>
                <h3 className="mb-5 text-center">Login</h3>

                <div className="form-outline mb-4">
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

                <div className="form-outline mb-4">
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

                <button className="btn btn-primary btn-lg btn-block w-100" type="submit">
                  Login
                </button>

                <hr className="my-4" />
                <p>
                  Not a user? <Link to="/register">Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
