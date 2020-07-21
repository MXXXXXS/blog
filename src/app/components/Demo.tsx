import React, { useState, useEffect } from "react";
import color from "../sharedStyle/color";
import {fontStyle} from "../sharedStyle/sideBarFontStyle";

type DemoIndex = Record<string, string>;

export function Content({name, items}:{name: string, items: Array<[string, string]>}) {
  return (
    <div className="root">
      <div className="text demo">
        <span>∨</span><span className="name">{name}</span><span>∨</span>
      </div>
      <ul>
        {items.map(([name, link]) => {
          return (
            <li key={name} className="text sideBarFontStyle">
              <a href={link} target="_blank" className="text">
                {name}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="text demo">
        <span>∧</span><span className="name">--------------</span><span>∧</span>
      </div>
      <style jsx>{fontStyle}</style>
      <style jsx>{`
        .demo {
          display: flex;
        }
        .root {
          padding: 0 10px;
        }
        .name {
          flex: 1;
        }
        .text {
          color: ${color.正常字体色};
          outline: none;
          text-decoration: none;
        }
        .text:hover {
          color: ${color.高亮字体色};
        }
        ul {
          padding: 0;
        }
        li {
          display: block;
          list-style: none;
          list-style-position: inside;
        }
        li:hover::before {
          content: ">";
        }
        li:hover::after {
          content: "<";
        }
      `}</style>
    </div>
  );
}

export default function Demo() {
  const [demoIndex, setDemoIndex] = useState<DemoIndex>({});
  useEffect(() => {
    fetch("./demo/index.json")
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        setDemoIndex(json as DemoIndex);
      })
      .catch((err) => {
        console.error("获取demo索引失败: ", err);
      });
  }, []);

  return <Content items={Object.entries(demoIndex)} name="Demo online"/>;
}
