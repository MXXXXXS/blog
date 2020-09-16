import { createStore, applyMiddleware, Reducer, Action, combineReducers, compose } from 'redux'
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { configureStore } from "@reduxjs/toolkit"
import { createSelector } from "reselect"

import { camelCase } from 'change-case'
import { type } from 'os'

export interface HistoryState {
  headingIndex: number
  articleTitle: string
}

// 路由变化处理
window.onpopstate = function (e) {
  console.log(JSON.stringify(e.state))
}

window.onbeforeunload = function (e) {
  localStorage.setItem('lastRead', JSON.stringify(history.state))
}

export interface State {
  headingEls: Array<HTMLHeadingElement>
  articleContent: string
  articleTitlesSidebarFolded: boolean
  articleTitles: Array<string>
  articleContentFetchingState: number
  historyState: HistoryState
}

// Chrome 里的 redux 可视化插件支持
// https://github.com/zalmoxisus/redux-devtools-extension#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const actionTypes = {
  HEADING_ELS: 'HEADING_ELS',
  HISTORY_STATE: 'HISTORY_STATE',
  ARTICLE_CONTENT: 'ARTICLE_CONTENT',
  ARTICLE_TITLES: 'ARTICLE_TITLES',
  ARTICLE_CONTENT_FETCHING_STATE: 'ARTICLE_CONTENT_FETCHING_STATE',
  ARTICLE_TITLES_SIDEBAR_FOLDED: 'ARTICLE_TITLES_SIDEBAR_FOLDED'
}

const actionCreators = {
  headingEls: (payload) => ({
    type: actionTypes.HEADING_ELS,
    payload
  }),
  historyState: (payload) => ({
    type: actionTypes.HISTORY_STATE,
    payload
  }),
  articleContent: (payload = '') => ({
    type: actionTypes.ARTICLE_CONTENT,
    payload
  }),
  articleTitles: (payload = '') => ({
    type: actionTypes.ARTICLE_TITLES,
    payload
  }),
  articleContentFetchingState: (payload = 0) => ({
    type: actionTypes.ARTICLE_CONTENT_FETCHING_STATE,
    payload
  }),
  articleTitlesSidebarFolded: (payload = false) => ({
    type: actionTypes.ARTICLE_TITLES_SIDEBAR_FOLDED,
    payload
  }),
  fetchArticle: (articleTitle) => {
    return function (dispatch) {
      dispatch(actionCreators.articleContentFetchingState(0))
      return fetch(`articles/${articleTitle}`)
        .then(async (response) => {
          // 网络正常, 内容正常
          if (response.ok) {
            const text = await response.text()
            dispatch(actionCreators.articleContentFetchingState(1))
            dispatch(actionCreators.articleContent(text))
          }
          // 网络正常, 内容错误
          dispatch(actionCreators.articleContentFetchingState(2))
        })
    }
  },
  fetchArticleTitles: () => {
    return function (dispatch) {
      return fetch('articles/index.json')
        .then(async (response) => {
          const index = await response.json()
          console.log(index)
          return dispatch(actionCreators.articleTitles(index.articles))
        })
    }
  }
}

const headingEls = (state = [], action) => {
  switch (action.type) {
    case actionTypes.HEADING_ELS:
      return action.payload
  }

  return state
}

const historyState = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.HISTORY_STATE:
      return action.payload
  }

  return state
}

const articleContent = (state = '', action) => {
  switch (action.type) {
    case actionTypes.ARTICLE_CONTENT:
      return action.payload
  }

  return state
}

const articleTitles = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ARTICLE_TITLES:
      return action.payload
  }

  return state
}

const articleContentFetchingState = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.ARTICLE_CONTENT_FETCHING_STATE:
      return action.payload
  }

  return state
}

const articleTitlesSidebarFolded = (state = false, action) => {
  switch (action.type) {
    case actionTypes.ARTICLE_TITLES_SIDEBAR_FOLDED:
      return action.payload
  }

  return state
}

const rootReducer = combineReducers({
  headingEls,
  historyState,
  articleContent,
  articleTitles,
  articleContentFetchingState,
  articleTitlesSidebarFolded,
})

const storeOfReadingPage = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk)))

export {
  storeOfReadingPage,
  actionTypes,
  actionCreators,
}
