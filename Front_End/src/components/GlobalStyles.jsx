import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Mulish', sans-serif;
    }
    
    body {
        padding: 0 10rem;
    }

    a {
        text-decoration: none;
    }

`;

export default GlobalStyle;
