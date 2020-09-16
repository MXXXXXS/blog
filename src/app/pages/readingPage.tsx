import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { State, storeOfReadingPage, actionCreators } from '../redux/store'

import SideBar from '../components/SideBar'
import Article from '../components/Article'
import Hierarchy from '../components/Hierarchy'

import { scrollBar } from '../sharedStyle/scrollBar'
import { fromPairs } from 'lodash'
const { articleTitlesSidebarFolded } = actionCreators

function Root() {
  return (
    <Provider store={storeOfReadingPage}>
      <ReadingPage />
    </Provider>
  )
}

function ReadingPage() {
  const dispatch = useDispatch()
  const folded = useSelector((state: State) => state.articleTitlesSidebarFolded)
  return (
    <div className="root">
      <div className="hierarchy">
        <Hierarchy></Hierarchy>
      </div>
      <div className="article">
        <Article />
      </div>
      <div
        className="mask"
        onClick={() => {
          dispatch(articleTitlesSidebarFolded(true))
        }}
      ></div>
      <div className="sidebar">
        <SideBar />
      </div>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <style jsx global>
        {scrollBar}
      </style>
      <style jsx>{`
        .root {
          display: flex;
          height: 100vh;
        }
        .hierarchy {
          flex: 1;
        }
        .article {
          flex: 5;
          display: flex;
          justify-content: center;
        }
        .mask {
          display: ${folded ? 'none' : 'unset'};
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: ${folded ? 'transparent' : 'rgba(0,0,0,0.4)'};
          transition: background-color 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        @media (max-width: 1023px) {
          .hierarchy {
            display: none;
          }
      `}</style>
    </div>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
