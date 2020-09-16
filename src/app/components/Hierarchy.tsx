import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State, actionCreators } from '../redux/store'

import color from '../sharedStyle/color'

const {historyState} = actionCreators

function HierarchyItem({ headingEl, i }) {
  const dispatch = useDispatch()
  const headingElText = headingEl.textContent
  const hierarchyNum = parseInt(headingEl.tagName[1])
  const {headingIndex, articleTitle} = useSelector(
    (state: State) => state.historyState
  )

  useEffect(() => {
    if (headingIndex === i && headingEl instanceof HTMLElement) {
      headingEl.scrollIntoView()
    }
  }, [headingEl, headingIndex, i])

  return (
    <div
      style={{
        paddingLeft: `${hierarchyNum * 20}px`,
      }}
      onClick={() => dispatch(historyState({
        articleTitle,
        headingIndex: i
      }))}
    >
      <p>{headingElText}</p>
      <style jsx>{`
        div {
          cursor: pointer;
          
        }
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: ${headingIndex === i ? color.高亮字体色 : color.正常字体色};
        }
      `}</style>
    </div>
  )
}

function Hierarchy() {
  const headingEls = useSelector((state: State) => state.headingEls)
  return (
    <div className="root">
      {headingEls.map((headingEl, i) => (
        <HierarchyItem
          key={headingEl.innerText}
          headingEl={headingEl}
          i={i}
        />
      ))}
      <style jsx>{`
        .root {
          height: 100vh;
          overflow-y: auto;
          padding: 0 10px;
          box-sizing: border-box;
          left: 0;
          top: 0;
          width: 240px;
          background: ${color.主题暗色};
        }
      `}</style>
    </div>
  )
}

export default Hierarchy
