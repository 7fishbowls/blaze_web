import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem("loginInProgress") &&
      localStorage.getItem("username")
    ) {
      navigate("/");
    }
  }, [navigate]);

  const [valid, setValid] = useState(false);
  const [submit, setSubmit] = useState(false);

  const username = useRef(null);
  const password = useRef(null);

  const handleLogin = async () => {
    if (valid) setValid(false);
    try {
      const response = await axios.post(
        "https://blaze-api-w7cp.onrender.com/api/login",
        {
          username: username.current.value,
          password: password.current.value,
        }
      );
      if (
        response.data.final_response &&
        username.current.value &&
        password.current.value
      ) {
        setSubmit(true);
        localStorage.setItem("loginInProgress", true);
        setTimeout(() => {
          localStorage.setItem("username", username.current.value);
          localStorage.removeItem("loginInProgress");
          navigate("/");
        }, 2000);
      } else {
        setValid(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setValid(true);
    }
  };

  return (
    <section
      className={`login_form ${valid ? "active" : ""} ${
        submit ? "success" : ""
      }`}
    >
      <header>
        <h2>Login for tales.</h2>
      </header>
      <section className="content login">
        <input type="text" placeholder="Username" ref={username} />
        <input type="password" placeholder="Password" ref={password} />
        <div id="down">
          <button onClick={handleLogin}>Login</button>
          <p>
            No account?{" "}
            <span className="special">
              <Link to={"/signup"}>Create one</Link>
            </span>
          </p>
        </div>
        <section className={`incorrect ${valid ? "active" : ""}`}>
          <p>Invalid password or username</p>
        </section>
        <section className="password_info">
          <p>
            Multiple unsuccessful login attempts will temporarily disable your
            account for security reasons. Please try again after a short
            cooldown.
          </p>
        </section>
      </section>
    </section>
  );
}

export default Login;
