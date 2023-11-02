import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle` 
    /* ROOT */
    :root {
      font-family: PyeongChang, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      font-weight: 400;
      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;

      --color-primary: #116616;
      --color-background: #C6D2BF;
      --color-light-gray: #f6f6f6;
      --color-gray: #d9d9d9;
      --color-theme: #ffffff;
      --color-text: #000000;
    }
    ${reset}
    *{
        box-sizing: border-box;
    }
    *:focus {
        outline: 2px solid var(--color-background);
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    button, input {
        font-family: inherit;
    }
    html, body, #root {
        height: 100%;
    }
    html,
    body,
    body > div { /* the react root */
        margin: 0;
        padding: 0;
        height: 100%;
    }
`;

export default GlobalStyles;
