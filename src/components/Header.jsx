import React from "react";

const Header = ({ text, bg, count }) => {
  return (
    <>
      <div
        className="header"
        style={{
          backgroundColor: bg,
        }}
      >
        <div>
          {text}: {count}
        </div>
      </div>
    </>
  );
};

export default Header;
