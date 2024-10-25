import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  useEffect(() => {
    if (localStorage.getItem("username")) navigate("/");
  });

  const navigate = useNavigate();

  const [userName, setUsername] = useState(null);
  const [lengthCheck, setLength] = useState(null);
  const [sameCheck, setSame] = useState(null);
  const [finallyman, setFinally] = useState(false);

  const username = useRef(null);
  const first_pass = useRef(null);
  const secondPassword = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName === false && lengthCheck >= 8 && sameCheck) {
      setFinally(true);
      await axios.post("https://blaze-api-w7cp.onrender.com/api/signup", {
        username: username.current.value,
        password: first_pass.current.value,
      });
      localStorage.setItem("username", username.current.value);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const handleValidUsername = async (e) => {
    const fetch_data = await axios.post(
      "https://blaze-api-w7cp.onrender.com/api/validUser",
      {
        username: e.target.value,
      }
    );
    setUsername(fetch_data.data);
  };

  const handleFirstPassword = (e) => {
    setLength(e.target.value.length);
  };

  const handleSecondPassword = (e) => {
    const second_pass = e.target.value;
    if (second_pass !== first_pass.current.value) setSame(false);
    else setSame(true);
  };

  return (
    <section className={`sign_up_form ${finallyman ? "active" : ""}`}>
      <header>
        <h2>Sign up for tales</h2>
      </header>
      <section className="content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Choose a username"
            onChange={handleValidUsername}
            ref={username}
            required
          />
          <input
            type="password"
            placeholder="New password"
            onChange={handleFirstPassword}
            ref={first_pass}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            onChange={handleSecondPassword}
            ref={secondPassword}
            required
          />
          <div id="down">
            <button type="submit">Signup</button>
            <p>
              Have an account?{" "}
              <span className="special">
                <Link to={"/login"}>Login</Link>
              </span>
            </p>
          </div>
        </form>
      </section>
      <section id="more_info">
        <p className={`${userName ? "active" : ""}`}>
          Must be a unique username.
        </p>
        <p
          className={`${
            lengthCheck !== null && lengthCheck < 8 ? "active" : ""
          }`}
        >
          Password should be at least 8 characters.
        </p>
        <p className={`${sameCheck !== null && !sameCheck ? "active" : ""}`}>
          Must be entered twice to confirm.
        </p>
      </section>
      <section className="password_info">
        <p>
          Please be aware that if you lose your password, there is currently no
          way to recover it. We recommend using a strong and memorable password
          to ensure the safety of your account.
        </p>
      </section>
    </section>
  );
}

export default SignUp;
