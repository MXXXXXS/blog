import css from "styled-jsx/css";

export const fontStyle = css`
  .sideBarFontStyle:hover {
    color: rgb(255, 255, 255);
    font-size: 1.2rem;
  }
  .sideBarFontStyle {
    cursor: pointer;
    display: block;
    font-size: 1rem;
    line-height: 3rem;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    color: gainsboro;
    text-decoration: none;
    outline: none;
    transition: font-size 0.3s ease-out, box-shadow 0.6s ease-out,
      color 0.3s ease-out;
  }
`;
