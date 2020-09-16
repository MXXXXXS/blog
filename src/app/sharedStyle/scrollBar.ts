import css from "styled-jsx/css";
import color from '../sharedStyle/color'

export const scrollBar = css.global`
  *::-webkit-scrollbar {
    width: 1rem;
    background-color: transparent;
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    border: ${color.正常字体色} 3px solid;
    background: ${color.主题暗色};
  }
`;
