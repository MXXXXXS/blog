import React, {useState} from "react";
import ReactDOM from "react-dom";

import SideBar from "./SideBar";
import Article from './Article'

function App() {
  const [article, changeArticle] = useState('')
  return (
    <>
      <SideBar changeArticle={changeArticle} />
      <Article article={article}/>
      <style jsx global>{`
        body {
          margin: 0;
        }
        #root {
          display: flex;
          height: 100vh;
        }
        `}</style>
      <style jsx>{`
      `}</style>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
