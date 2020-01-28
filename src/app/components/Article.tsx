import React from "react";

import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export default function Article({
  article,
  closed,
  toggleBar
}: {
  article: string;
  closed: boolean;
  toggleBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      id="main"
      onClick={() => {
        if (!closed) {
          toggleBar(true);
        }
      }}
    >
      <article
        dangerouslySetInnerHTML={{ __html: md.render(article) }}
      ></article>
      <style jsx global>{`
        img {
          width: 80vw;
        }
        pre {
          overflow: auto;
        }
      `}</style>
      <style jsx>{`
        #main {
          padding: 0 15px;
          flex: 1;
          min-width: 0;
        }
        article {
          margin: auto;
          max-width: 800px;
          word-break: break-all;
          overflow: auto;
          font-size: 1rem;
          line-height: 1.5rem;
        }
        article::first-letter {
          font-size: 2rem;
          text-transform: capitalize;
        }
      `}</style>
    </div>
  );
}
