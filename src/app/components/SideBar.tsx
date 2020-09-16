import React, { useState, useEffect, useCallback } from 'react'

import { jsxIcons } from '../../../public/imgs/icons'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { State, actionCreators, HistoryState } from '../redux/store'
import color from '../sharedStyle/color'

const {
  fetchArticle,
  fetchArticleTitles,
  historyState,
  articleTitlesSidebarFolded,
} = actionCreators

function ItemEL({ str }: { str: string }) {
  const dispatch = useDispatch()
  const {articleTitle: activedArticleTitle, headingIndex: activedHeadingIndex} = useSelector(
    (state: State) => state.historyState
  )
  const openExternalLink = useCallback(() => {
    window.open('./articles/' + str)
  }, [])

  const loadArticle = useCallback(
    function (articleTitle, headingIndex = 0) {
      dispatch(historyState({
        headingIndex: activedHeadingIndex,
        articleTitle: 0
      }))
      dispatch(fetchArticle(articleTitle))
    },
    [str]
  )

  return (
    <div
      onClick={() => {
        const historyState = JSON.parse(
          localStorage.getItem('lastRead')
        ) as HistoryState
        loadArticle(
          historyState?.articleTitle || str,
          historyState?.headingIndex || 0
        )
      }}
      className={str === activedArticleTitle ? 'isActived' : 'unActived'}
    >
      {str}
      <span onClick={openExternalLink}>
        <jsxIcons.Exlink></jsxIcons.Exlink>
      </span>

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
          color: ${color.主题暗色};
        }

        div:hover {
          color: ${color.主题暗色};
          font-size: 1.2rem;
          box-shadow: 0 1px 2px gainsboro;
        }
      `}</style>
    </div>
  )
}

function Links() {
  const dispatch = useDispatch()
  const articleTitles = useSelector(
    (state: State) => state.articleTitles
  )
  const {articleTitle, headingIndex} = useSelector(
    (state: State) => state.historyState
  )

  const getArticle = useCallback((link: string) => {
    dispatch(historyState({
      headingIndex: 0,
      articleTitle: link
    }))
    dispatch(fetchArticle(link))
  }, [])

  // 加载上一次看到的文章
  const lastArticleTitle = decodeURI(window.location.pathname)
    .split('/')
    .slice(-1)[0]
  if (window.location.pathname) {
    if (/md$/.test(lastArticleTitle)) getArticle(lastArticleTitle)
  }

  return (
    <>
      {articleTitles.map((link) => (
        <ItemEL key={link} str={link}></ItemEL>
      ))}
    </>
  )
}

function SideBar() {
  const dispatch = useDispatch()

  const folded = useSelector(
    (state: State) => state.articleTitlesSidebarFolded
  )

  useEffect(() => {
    dispatch(fetchArticleTitles())
  }, [])

  return (
    <aside>
      <span
        className="switcher"
        onClick={() => {
          dispatch(articleTitlesSidebarFolded(!folded))
        }}
      >
        ✖
      </span>
      <a href="./">MXXXXXS's notes</a>
      <div className="links">
        <Links />
      </div>
      <style jsx>{`
        span {
          color: ${color.主题暗色};
          display: inline-block;
          text-align: center;
          width: 3rem;
          font-size: 1.5rem;
          line-height: 2;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
          transform: ${folded
            ? 'rotate(45deg)'
            : 'rotate(0deg)'};
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
          background: linear-gradient(
            to right,
            ${color.主题暗色},
            ${color.主题亮色}
          );
          line-height: 2;
        }
        a:hover {
          color: white;
        }
        aside {
          overflow: hidden;
          background: #ffffffe8;
          position: fixed;
          right: ${folded ? '-15rem' : '0'};
          top: 0;
          width: 18rem;
          transition: right 0.4s cubic-bezier(0.075, 0.82, 0.165, 1),
            color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
          box-sizing: border-box;
          height: ${folded ? '3rem' : '100%'};
        }
        .links {
          height: calc(100% - 3rem);
          overflow: auto;
        }
      `}</style>
    </aside>
  )
}

export default SideBar
