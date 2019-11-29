import React from "react";

import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default function Article({article}: {article: string}) {
  return (
    <div id="main">
      <article dangerouslySetInnerHTML={{__html: md.render(article)}}></article>
      <style jsx>{`
        #main {
          padding: 0 10px;
        }
        article {
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
