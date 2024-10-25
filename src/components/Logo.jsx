import React from "react";

function Logo() {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <header className="main_logo" onClick={handleLogout}>
      <h2>作成する</h2>
    </header>
  );
}

export default Logo;
