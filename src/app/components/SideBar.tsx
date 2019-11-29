import React, { useState, useEffect } from "react";

function Links({
  links,
  sendArticle
}: {
  links: string[];
  sendArticle: React.Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {});
  const getArticle = (link: string) => {
    fetch(`articles/${link}`)
      .then(async response => {
        const text = await response.text();
        console.log(text);
        sendArticle(text);
      })
      .catch(err => {
        console.error(err);
      });
  };
  const itemEL = (str: string) => (
    <div key={str} onClick={() => getArticle(str)}>
      {str}
      <style jsx>{`
        div {
          height: 2rem;
          line-height: 2rem;
          text-align: center;
          width: 230px;
          cursor: pointer;
          color: grey;
          transition: font-size 0.3s ease-out, box-shadow 0.6s ease-out,
            color 0.3s ease-out;
        }
        div:hover {
          color: black;
          font-size: 1.2rem;
          box-shadow: 0 1px 2px gainsboro;
        }
      `}</style>
    </div>
  );

  return <>{links.map(link => itemEL(link))}</>;
}

export default function SideBar({
  changeArticle
}: {
  changeArticle: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [noteLinks, setNoteLinks] = useState([]);
  useEffect(() => {
    fetch("articles/index.json")
      .then(async response => {
        const index = await response.json();
        console.log(index);
        setNoteLinks(index.articles);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <aside>
      <a href="/">MXXXXXS's notes</a>
      <Links links={noteLinks} sendArticle={changeArticle} />
      <style jsx>{`
        a {
          text-decoration: none;
          display: block;
          color: whitesmoke;
          transition: color 0.3s ease-out;
          text-align: center;
          font-size: 1.5rem;
          background-color: lightskyblue;
          line-height: 2;
        }
        a:hover {
          color: white;
        }
        aside {
          box-sizing: border-box;
          box-shadow: 2px 0 2px gainsboro;
          height: 100%;
        }
      `}</style>
    </aside>
  );
}
