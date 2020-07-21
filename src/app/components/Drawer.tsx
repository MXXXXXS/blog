import React, { useState, useCallback, useRef } from "react";
import { fontStyle } from "../sharedStyle/sideBarFontStyle";
import color from "../sharedStyle/color"

function Panel({
  text,
  toggleCollapsing
}: {
  text: string;
  toggleCollapsing: () => void;
}) {
  return (
    <div
      onClick={() => {
        toggleCollapsing();
      }}
      className="sideBarFontStyle"
    >
      {text}
      <style jsx>{``}</style>
      <style jsx>{fontStyle}</style>
    </div>
  );
}
function Detail({ text, collapsed }: { text: string; collapsed: boolean }) {
  const childTextRef = useRef(null);
  return (
    <div className="container">
      <div ref={childTextRef}>{text}</div>
      <style jsx>{`
        .container {
          transition: height 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
          overflow: hidden;
          height: ${collapsed ? "0" : childTextRef.current.offsetHeight + 10}px;
        }
        .container>div {
          color: ${color.正常字体色};
        }
      `}</style>
    </div>
  );
}

export default function Drawer({
  panelText,
  detailText
}: {
  panelText: string;
  detailText: string;
}) {
  const [collapsed, collapse] = useState(true);
  const toggleCollapsing = useCallback(() => {
    collapse(!collapsed);
  }, [collapsed]);
  return (
    <div>
      <Panel text={panelText} toggleCollapsing={toggleCollapsing}></Panel>
      <Detail text={detailText} collapsed={collapsed}></Detail>
    </div>
  );
}
