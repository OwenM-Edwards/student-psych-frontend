import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
   body {
      background: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.text};
      transition: color 0.50s linear, background 0.50s linear;
   }
`