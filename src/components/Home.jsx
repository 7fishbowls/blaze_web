import React, { useEffect, useState } from "react";
import Button from "./Button";
import Footer from "./Footer";
import StoryBox from "./StoryBox";
import About from "./About";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import Security from "./Security";

function Home() {
  const navigate = useNavigate();
  if (!localStorage.getItem("username")) navigate("/login");
  const [active, setActive] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setActive(true);
    const tl = gsap.timeline({ repeat: -1 });
    // Show .texts and then hide it
    tl.from(".texts", {
      opacity: 0,
      duration: 1,
    }).to(".texts", {
      opacity: 0,
      duration: 1,
    });

    // Show .texts1 and then hide it
    tl.from(".texts1", {
      opacity: 0,
      duration: 2,
    }).to(".texts1", {
      opacity: 0,
      duration: 2,
    });

    // Show .texts2 and then hide it
    tl.from(".texts2", {
      opacity: 0,
      duration: 2,
    }).to(".texts2", {
      opacity: 0,
      duration: 2,
    });
    tl.from(".texts3", {
      opacity: 0,
      duration: 2,
    }).to(".texts3", {
      opacity: 0,
      duration: 2,
    });
    tl.from(".texts4", {
      opacity: 0,
      duration: 2,
    }).to(".texts4", {
      opacity: 0,
      duration: 2,
    });
    tl.from(".texts5", {
      opacity: 0,
      duration: 2,
    }).to(".texts5", {
      opacity: 0,
      duration: 2,
    });
  }, []);
  return (
    <>
      <StoryBox />
      <section className={`main_page ${active ? "active" : ""}`}>
        <h2>Share Your Story.</h2>
        <h4 className="japanese_text home">- 書き込み 共有 探索 -</h4>
        <div className="buttons">
          <Link to="/create">
            <Button content="Create" active={false} />
          </Link>
          <Link to="/browse">
            <Button content="Browse stories" active={false} />
          </Link>
        </div>
        <section className="texts">
          <p>Create a story</p>
        </section>
        <section className="texts1">
          <p>Share a story</p>
        </section>
        <section className="texts2">
          <p>Receive a story</p>
        </section>
        <section className="texts3">
          <p>書く</p>
        </section>
        <section className="texts4">
          <p>共有</p>
        </section>
        <section className="texts5">
          <p>探検する</p>
        </section>
      </section>
      <About />
      <Security />
      <Footer />
    </>
  );
}

export default Home;
