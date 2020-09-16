import React, { useRef, useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State, actionCreators } from '../redux/store'

import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import codeFont from '../sharedStyle/codeFont'
import hljsStyle from '../sharedStyle/atom-one-light.css?type=global'
import icon from '../../../public/imgs/icons'
import { stat } from 'fs'

const { 
  headingEls, 
  articleTitlesSidebarFolded,
  historyState
 } = actionCreators

const md = new MarkdownIt()

export default function Article() {
  const dispatch = useDispatch()
  const articleContent = useSelector((state: State) => state.articleContent)
  const folded = useSelector((state: State) => state.articleTitlesSidebarFolded)
  const {headingIndex, articleTitle} =  useSelector((state: State) =>state.historyState)

  const articleEl = useRef(null)
  const highlight = useCallback(() => {
    const preEls = articleEl.current.querySelectorAll('pre')
    if (preEls && preEls.length > 0) {
      preEls.forEach((preEl) => {
        hljs.highlightBlock(preEl)
      })
    }
  }, [])
  useEffect(() => {
    highlight()

    dispatch(
      headingEls(
        Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(
          (el: HTMLElement, i) => {
            const anchorEl = icon.anchor
            anchorEl.href = '#' + el.innerText
            anchorEl.addEventListener('click', () => {
              dispatch(historyState({
                articleTitle,
                headingIndex: i
              }))
            })
            el.insertAdjacentElement('afterbegin', anchorEl)
            
            return el
          }
        )
      )
    )
  }, [articleContent])

  return (
    <div
      className="root"
      onClick={() => {
        dispatch(articleTitlesSidebarFolded(true))
      }}
    >
      <article
        ref={articleEl}
        dangerouslySetInnerHTML={{
          // 这里有个对图片路径的处理, 内容是从public开始的
          __html: md.render(
            articleContent.replace(/\.\/imgs/g, './articles/imgs')
          ),
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
          justify-content: center;
        }
        article {
          height: 100vh;
          padding: 0 2rem;
          width: min(80vw,720px);
          word-break: break-all;
          overflow: auto;
          font-size: 1rem;
          line-height: 1.5rem;
        }
        }
      `}</style>
      <style jsx global>
        {codeFont}
      </style>
      <style jsx global>
        {hljsStyle}
      </style>
      <style jsx global>{`
        svg {
          width: 1rem;
        }

        h1 > a,
        h2 > a,
        h3 > a,
        h4 > a,
        h5 > a,
        h6 > a {
          position: absolute;
          left: -1.5rem;
          padding-right: 0.5rem;
          display: none;
          cursor: pointer;
        }
        h1:hover > a,
        h2:hover > a,
        h3:hover > a,
        h4:hover > a,
        h5:hover > a,
        h6:hover > a {
          display: unset;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          position: relative;
        }
      `}</style>
    </div>
  )
}
