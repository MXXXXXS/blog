import React, { useState } from "react";
import ReactDOM from "react-dom";

import SideBar from "./SideBar";
import Article from "./Article";

import { scrollBar } from "../sharedStyle/scrollBar";

function App() {
  const [article, changeArticle] = useState("");
  const [closed, toggleBar] = useState(false);
  return (
    <div className="root">
      <Article article={article} closed={closed} toggleBar={toggleBar} />
      <SideBar
        changeArticle={changeArticle}
        closed={closed}
        toggleBar={toggleBar}
      />
      <style jsx global>{`
        body {
          margin: 0;
        }
        .root {
          display: flex;
          height: 100vh;
        }
      `}</style>
      <style jsx global>
        {scrollBar}
      </style>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
