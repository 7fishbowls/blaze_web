import React, { useEffect, useState } from "react";
import Story from "./Story";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function BrowseStories() {
  const navigate = useNavigate();
  const [stories, setStory] = useState([]);
  const [classA, setClass] = useState(false);
  const [temp, setTemp] = useState(false);
  const url = "https://blaze-api-w7cp.onrender.com/api/fetch_stories";
  useEffect(() => {
    setTemp(true);
    const fetch_data = async () => {
      try {
        const stories = await axios.get(url);

        setClass(true);
        setStory(stories.data);
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    };
    fetch_data();
  }, [navigate]);
  return (
    <>
      <section className={`supnoob ${temp ? "active" : ""}`}>
        <header className="browse_title">
          <h2>Browse stories</h2>
          <span className="back_icon">
            <Link to="/">
              <IoIosArrowBack />
            </Link>
          </span>
        </header>
        <header
          className={`indication_stories ${temp ? "active" : ""} ${
            stories.length === 0 ? "hide" : ""
          }`}
        >
          <h2>Found {stories.length} stories.</h2>
        </header>
        <section className={`best_of stories ${classA ? "active" : ""}`}>
          {stories.map((elem, index) => {
            return (
              <Story author={elem.author} story={elem.story} key={index} />
            );
          })}
        </section>
      </section>
      <div
        className={`loader_buddy ${temp ? "light" : ""} ${
          classA ? "active" : ""
        }`}
      >
        <p className="actual_">
          This project is hosted on a free-tier server, which provides basic
          resources at no cost. As a result, response times might be slower. It
          may take a while load.
        </p>
      </div>
    </>
  );
}

export default BrowseStories;
