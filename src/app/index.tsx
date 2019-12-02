import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Sections from "./components/Sections";

import { Article, Index } from "./interfaces/index";

import _ from "lodash";

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
          <h3>MXXXXXS</h3>
          <h5>记录, 放松</h5>
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
      <style jsx>{`
        main {
          display: flex;
        }
        article {
          flex-grow: 1;
          width: 70vw;
        }
        aside {
          text-align: center;
          flex: 20vw;
          align-self: stretch;
          box-shadow: -5px 0px 5px #c7c7c7;
          background: linear-gradient(#0a4555, #e3e8e2);
        }
        a:hover {
          color: rgb(255, 255, 255);
          font-size: 1.2rem;
          box-shadow: 0 1px 2px gainsboro;
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
          transition: font-size 0.3s ease-out, box-shadow 0.6s ease-out,
            color 0.3s ease-out;
        }
        nav {
          display: flex;
          padding-left: 20px;
          font-size: 2rem;
          color: #235865;
        }
        header {
          position: relative;
          background-size: cover;
          height: 500px;
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
