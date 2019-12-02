import React from "react";

import { Article } from "../interfaces/index";

import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

function Section({ title, content }: { title: string; content: string }) {
  return (
    <>
      <section>
        <div className="title">{title}</div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: md.render(content) }}
        ></div>
      </section>
      <style jsx global>{`
        pre {
          overflow: auto;
        }
      `}</style>
      <style jsx>{`
        .title {
          font-size: 1.4rem;
          color: white;
          background: linear-gradient(90deg, #0a4555, #e3e8e2);
          padding: 10px;
        }
        .content {
          word-wrap: break-word;
          font-size: 1rem;
          line-height: 1.5rem;
          padding: 10px;
        }
        .content::first-letter {
          font-size: 2rem;
          text-transform: capitalize;
        }
        section {
          color: #235865;
          box-shadow: 0 0 20px gainsboro;
          margin: 30px 5vw;
        }
      `}</style>
    </>
  );
}

export default function Sections({ articles }: { articles: Article[] }) {
  return (
    <>
      {articles.map(article => (
        <Section
          title={article.title}
          content={article.content}
          key={article.title}
        ></Section>
      ))}
    </>
  );
}
