import React, { useState } from "react";
import ReactDOM from "react-dom";

function App() {
  console.log("Welcome to MXXXXXS's notes!")
  return (
    <>
      <nav>
        <div>MXXXXXS's notes</div>
        <div className="links">
          <a href="/articles.html">看笔记</a>
        </div>
      </nav>
      <header>
        <div></div>
      </header>
      <style jsx>
        {`
          a {
            text-decoration: none;
            color: black;
          }
          nav {
            display: flex;
          }
          .links {
            margin-left: 200px;
          }
          header {
            background-size: cover;
            height: 500px;
            background-image: url("imgs/background/background.jpg");
          }
        `}
      </style>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
