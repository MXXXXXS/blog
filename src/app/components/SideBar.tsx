import React, { useState, useEffect, useCallback } from "react";

import externalLink from "../../../public/imgs/icons/external-link.svg";

function ItemEL({
  str,
  activedStr,
  setActived
}: {
  str: string;
  activedStr: string;
  setActived: (_: string) => void;
}) {
  const clickHandler = useCallback(() => setActived(str), []);
  const openExternalLink = useCallback(() => {
    window.open("./articles/" + str);
  }, []);

  return (
    <div
      onClick={clickHandler}
      className={str === activedStr ? "isActived" : "unActived"}
    >
      {str}
      <span
        dangerouslySetInnerHTML={{ __html: externalLink }}
        onClick={openExternalLink}
      ></span>

      <style jsx>{`
        span {
          position: absolute;
          width: 2rem;
          right: 0;
          visibility: hidden;
        }

        span {
          fill: rgb(233, 233, 233);
          transition: fill 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        span:hover {
          fill: rgb(122, 122, 122);
        }

        div:hover span {
          visibility: visible;
        }

        div {
          position: relative;
          height: 2rem;
          line-height: 2rem;
          padding-left: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          transition: font-size 0.3s cubic-bezier(0.075, 0.82, 0.165, 1),
            box-shadow 0.6s cubic-bezier(0.075, 0.82, 0.165, 1),
            color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        .unActived {
          color: grey;
        }

        .isActived {
          box-shadow: inset 4px 0 #5c8793;
          color: #235865;
        }

        div:hover {
          color: #235865;
          font-size: 1.2rem;
          box-shadow: 0 1px 2px gainsboro;
        }
      `}</style>
    </div>
  );
}

function Links({
  links,
  sendArticle
}: {
  links: string[];
  sendArticle: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [activedStr, setActivedStr] = useState("");
  const getArticle = useCallback((link: string) => {
    setActivedStr(link);
    fetch(`articles/${link}`)
      .then(async response => {
        if (response.ok) {
          const text = await response.text();
          sendArticle(text);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (activedStr) {
      window.location.hash = activedStr;
    }
  }, [activedStr]);

  useEffect(() => {
    if (window.location.hash) {
      getArticle(decodeURI(window.location.hash).slice(1));
    }
  }, []);

  return (
    <>
      {links.map(link => (
        <ItemEL
          key={link}
          str={link}
          activedStr={activedStr}
          setActived={getArticle}
        ></ItemEL>
      ))}
    </>
  );
}

export default function SideBar({
  changeArticle,
  closed,
  toggleBar
}: {
  changeArticle: React.Dispatch<React.SetStateAction<string>>;
  closed: boolean;
  toggleBar: React.Dispatch<React.SetStateAction<boolean>>;
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
      <a href="./">MXXXXXS's notes</a>
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
          background: linear-gradient(to right, #0a4555, #e3e8e2);
          line-height: 2;
        }
        a:hover {
          color: white;
        }
        aside {
          overflow: hidden;
          background: #ffffffe8;
          position: fixed;
          right: ${closed ? "-15rem" : "0"};
          top: 0;
          width: 18rem;
          transition: right 0.4s cubic-bezier(0.075, 0.82, 0.165, 1),
            color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
          box-sizing: border-box;
          height: ${closed ? "3rem" : "100%"};
        }
        .links {
          height: calc(100% - 3rem);
          overflow: auto;
        }
      `}</style>
    </aside>
  );
}
