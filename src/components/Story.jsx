import React from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";

function Story({ story, author }) {
  const formatted = story.replace(/\n/g, "<br>");
  return (
    <section className="sbox">
      <header className="author">
        <MdOutlineStarPurple500 />
        <h2> {author}</h2>
      </header>
      <section className="browse_story">
        <p dangerouslySetInnerHTML={{ __html: formatted }} />
      </section>
    </section>
  );
}

export default Story;
