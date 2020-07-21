import React, { useRef, useEffect, useCallback, useState } from "react";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import codeFont from "../sharedStyle/codeFont";
import hljsStyle from "../sharedStyle/atom-one-light.css?type=global";
import color from "../sharedStyle/color"

import Hierarchy from "../components/Hierarchy";

const md = new MarkdownIt();

export default function Article({
  article,
  closed,
}: {
  article: string;
  closed: boolean;
}) {
  const [headers, setHeaders] = useState<Element[]>();
  const articleEl = useRef(null);
  const highlight = useCallback(() => {
    const preEls = articleEl.current.querySelectorAll("pre");
    if (preEls && preEls.length > 0) {
      preEls.forEach((preEl) => {
        hljs.highlightBlock(preEl);
      });
    }
  }, []);
  useEffect(() => {
    highlight();
    setHeaders(Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")));
  }, [article]);

  const jumpToIndex = useCallback((indexOfHeader) => {
    headers[indexOfHeader].scrollIntoView()
  }, [headers])

  return (
    <div className="root">
      <div className="index">
        <Hierarchy headers={headers} jumpToIndex={jumpToIndex} ></Hierarchy>
      </div>
      <article
        ref={articleEl}
        dangerouslySetInnerHTML={{
          // 这里有个对图片路径的处理, 内容是从public开始的
          __html: md.render(article.replace(/\.\/imgs/g, "./articles/imgs")),
        }}
      ></article>
      <style jsx global>{`
        img {
          object-fit: contain;
        }
        pre {
          overflow: auto;
        }
        table {
          word-break: break-word;
        }
        p {
          overflow: auto;
        }
      `}</style>
      <style jsx>{`
        .root {
          display: flex;
          padding: 0 15px;
          min-width: 0;
          pointer-events: ${closed ? "unset" : "none"};
          filter: ${closed ? "unset" : "blur(10px)"};
          transition: filter 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          justify-content: space-between;
        }
        .index {
          height: 100vh;
          overflow-y: auto;
          padding: 0 10px;
          box-sizing: border-box;
          left: 0;
          top: 0;
          color: white;
          text-shadow: white 0 0 10px;
          width: 320px;
          background: linear-gradient(to bottom, ${color.主题暗色}, ${color.主题亮色});
        }
        article {
          height: 100vh;
          padding: 0 15px;
          width: min(80%, 800px);
          word-break: break-all;
          overflow: auto;
          font-size: 1rem;
          line-height: 1.5rem;
        }
        @media (max-width: 900px) {
          .root {
            flex-direction: column;
          }
        }
      `}</style>
      <style jsx global>
        {codeFont}
      </style>
      <style jsx global>
        {hljsStyle}
      </style>
    </div>
  );
}
