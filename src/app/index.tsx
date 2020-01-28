import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Sections from "./components/Sections";

import { Article, Index } from "./interfaces/index";

import _ from "lodash";

import { scrollBar } from "./sharedStyle/scrollBar";

function App() {
  const randomSelect = (arr: any[], num: number): any[] => {
    const length = arr.length;
    if (length === 0) return [];
    const shuffled = _.shuffle(arr);
    return shuffled.slice(0, Math.min(length, num));
  };

  const [articles, changeArticles] = useState([] as Article[]);

  useEffect(() => {
    const index = fetch("articles/index.json")
      .then(async response => {
        const index: Index = await response.json();
        console.log(index);
        return index;
      })
      .catch(err => {
        console.error(err);
      });
    const articles = index.then(index => {
      if (index) {
        const partial: string[] = randomSelect(index.articles, 3);

        const articles = partial.map(article => {
          return fetch(`articles/${article}`)
            .then(async response => {
              const content = await response.text();
              return { title: article, content: content } as Article;
            })
            .catch(err => {
              console.error(`Failed to fetch ${article}\n${err}`);
            });
        });
        return Promise.all(articles);
      }
    });
    articles.then(articles => {
      if (articles) {
        const notVoid: Article[] = [];
        articles.forEach(article => {
          if (article) notVoid.push(article);
        });
        changeArticles(notVoid);
      }
    });
  }, []);

  console.log("Welcome to MXXXXXS's notes!");
  return (
    <>
      <nav>MXXXXXS's notes</nav>
      <header>
        <div>
          <a href="https://github.com/MXXXXXS">MXXXXXS</a>
          <p>记录, 放松</p>
        </div>
      </header>
      <main>
        <article>
          <Sections articles={articles}></Sections>
        </article>
        <aside>
          <a href="/articles.html">看笔记</a>
        </aside>
      </main>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <style jsx global>
        {scrollBar}
      </style>
      <style jsx>{`
        main {
          display: flex;
        }
        article {
          flex: 4;
          min-width: 0;
        }

        @media (max-width: 500px) {
          main {
            flex-direction: column-reverse;
          }
        }

        aside {
          margin: 30px;
          text-align: center;
          flex: 1;
          align-self: stretch;
          box-shadow: 0 0 20px gainsboro;
          background: linear-gradient(#0a4555, #e3e8e2);
        }
        a:hover {
          color: rgb(255, 255, 255);
          font-size: 1.2rem;
        }
        a {
          display: block;
          font-size: 1rem;
          line-height: 3rem;
          width: 100%;
          padding: 5px;
          box-sizing: border-box;
          color: gainsboro;
          text-decoration: none;
          outline: none;
          transition: font-size 0.3s ease-out, box-shadow 0.6s ease-out,
            color 0.3s ease-out;
        }

        p {
          text-align: center;
          font-size: 0.8rem;
        }

        nav {
          display: flex;
          padding-left: 20px;
          font-size: 2rem;
          color: #235865;
        }

        @media (max-width: 500px) {
          header {
            display: none;
          }
        }
        header {
          position: relative;
          background-size: cover;
          height: 500px;
          box-shadow: inset 0px 8px 200px #000000;
          background-image: url("imgs/background/background.jpg");
        }
        header > div {
          position: absolute;
          right: 20px;
          bottom: 20px;
          border: 2px solid;
          padding: 0 16px;
          border-radius: 10%;
          background-color: rgba(50, 50, 50, 0.3);
          color: white;
        }
      `}</style>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
