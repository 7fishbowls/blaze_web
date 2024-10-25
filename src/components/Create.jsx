import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";

function Create() {
  const notToUse = [
    "Don't use harmful words.",
    "Avoid hate speech and discrimination.",
    "Refrain from using explicit.",
    "No personal attacks or harassment.",
    "Keep it respectful",
    "Do not share personal information.",
    "Stay on topic and relevant to the theme.",
    "Plagiarism is strictly prohibited",
    "Use proper grammar and punctuation.",
    "Limit the length to a reasonable size.",
  ];

  const min_lenght = 500;
  const navigate = useNavigate();
  const temp = useRef(null);

  const [class_change, setClass] = useState("");
  const [input_story, setInput] = useState("");
  const [send_indication, setIndication] = useState(false);
  const [sappa, setSappa] = useState(false);

  const handleSubmit = async () => {
    const data = {
      story: input_story,
      author: localStorage.getItem("username"),
    };
    try {
      setSappa(true);
      await axios.post(
        "https://blaze-api-w7cp.onrender.com/api/send_story",
        data
      );
      temp.current.value = "";
      setIndication(true);
      setTimeout(() => {
        navigate("/browse");
      }, 1000);
    } catch (err) {
      navigate("/");
      console.log(err);
    }
  };
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    setClass("active");
  }, []);

  return (
    <>
      <section
        className={`create_story ${
          send_indication ? "deactive" : ""
        } ${class_change}`}
      >
        <header>
          <h2>Create a story</h2>
          <Link to={"/"}>
            <span className="arrowIcon">
              <SlArrowLeft />
            </span>
          </Link>
        </header>
        <section className="create_story_bd">
          <textarea
            className="create_story_input"
            placeholder="Once upon a time..."
            onChange={handleInput}
            ref={temp}
          ></textarea>
          <div className="buttons">
            <button
              className="upload_btn"
              onClick={handleSubmit}
              disabled={input_story.length > min_lenght ? false : true}
            >
              Upload
              <span className="arrow_Icon">
                <FiArrowRight />
              </span>
            </button>
            <p className="indication">
              <span className="special">{input_story.length}</span>/{min_lenght}
            </p>
          </div>
          <div className="instructions">
            {notToUse.map((elem, index) => (
              <p key={index}>{elem}</p>
            ))}
          </div>
        </section>
      </section>
      <Logo />
      <div className={`story_sent ${sappa ? "active" : ""}`}>
        <p>Your story is being sent.</p>
        <p className="last">
          It may take a while if the server is experiencing high traffic.
        </p>
      </div>
    </>
  );
}

export default Create;
