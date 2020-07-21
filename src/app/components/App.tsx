import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import SideBar from "./SideBar";
import Article from "./Article";

import { scrollBar } from "../sharedStyle/scrollBar";

function App() {
  const [article, changeArticle] = useState("");
  const [closed, toggleBar] = useState(false);

  return (
    <div
      className="root"
      onClick={() => {
        if (!closed) {
          toggleBar(true);
        }
      }}
    >
      <div className="article"><Article article={article} closed={closed} /></div>
      <div className="sidebar"><SideBar
        changeArticle={changeArticle}
        closed={closed}
        toggleBar={toggleBar}
      /></div>
      
      
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <style jsx global>
        {scrollBar}
      </style>
      <style jsx>{`
        .root {
          display: flex;
          height: 100vh;
        }
        .article {
          flex: 4;
        }
        .sidebar {
          flex: 1;
        }
        `}</style>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
