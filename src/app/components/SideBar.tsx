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
          padding-left: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          color: grey;
          transition: font-size 0.3s cubic-bezier(0.075, 0.82, 0.165, 1), box-shadow 0.6s cubic-bezier(0.075, 0.82, 0.165, 1),
            color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        div:hover {
          color: #235865;
          font-size: 1.2rem;
          box-shadow: 0 1px 2px gainsboro;
        }
      `}</style>
    </div>
  );

  return <>{links.map(link => itemEL(link))}</>;
}

export default function SideBar({
  changeArticle,
  closed,
  toggleBar
}: {
  changeArticle: React.Dispatch<React.SetStateAction<string>>,
  closed: boolean,
  toggleBar: React.Dispatch<React.SetStateAction<boolean>>
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
      <span
        className="switcher"
        onClick={() => {
          if (closed) {
            toggleBar(false);
          } else {
            toggleBar(true);
          }
        }}
      >
        ✖
      </span>
      <div className="links">
        <Links links={noteLinks} sendArticle={changeArticle} />
      </div>
      <style jsx>{`
        span {
          color: #235865;
          display: inline-block;
          text-align: center;
          width: 3rem;
          font-size: 1.5rem;
          line-height: 2;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
          transform: ${closed ? "rotate(45deg)" : "rotate(0deg)"};
        }
        a {
          box-sizing: border-box;
          width: 15rem;
          text-decoration: none;
          padding: 0 10px;
          display: inline-block;
          color: whitesmoke;
          transition: color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
          text-align: center;
          font-size: 1.5rem;
          background-color: #235865;
          line-height: 2;
        }
        a:hover {
          color: white;
        }
        aside {
          overflow: hidden;
          background: #ffffffe8;
          position: fixed;
          width: 18rem;
          transition: height 0.4s cubic-bezier(0.075, 0.82, 0.165, 1), left 0.4s cubic-bezier(0.075, 0.82, 0.165, 1),
            color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
          box-sizing: border-box;
          box-shadow: 2px 0 2px gainsboro;
          height: ${closed ? "3rem" : "100%"};
          left: ${closed ? "-15rem" : "0"};
          top: 0;
        }
        .links {
          height: calc(100vh - 3rem);
          overflow: auto;
        }
      `}</style>
    </aside>
  );
}
