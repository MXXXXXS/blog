import css from "styled-jsx/css";

export const scrollBar = css.global`
  *::-webkit-scrollbar {
    width: 1rem;
    background-color: #e3e8e2;
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    border: white 2px solid;
    background: #5c8793;
  }
`;
