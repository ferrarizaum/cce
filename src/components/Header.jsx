import React from "react";

const Header = ({ text, bg, count }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
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
