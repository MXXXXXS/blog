import React from "react";
export default function Hierarchy({headers = [], jumpToIndex}: {headers: Element[], jumpToIndex: (_: number) => void}) {
  return (
    <div>
      {headers.reduce(
        (indexes, element, i) => {
          const title = element.textContent;
          const hierarchyNum = parseInt(element.tagName[1]);
          indexes.push(
            <div key={title}
              style={{
                paddingLeft: `${hierarchyNum * 20}px`,
              }}
              onClick={() => jumpToIndex(i)}
            >
              <p>{title}
              <style jsx>{`
                p {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                }
                `}</style>
              </p>
            </div>
          );
          return indexes;
        }, [])}
    </div>
  );
}
