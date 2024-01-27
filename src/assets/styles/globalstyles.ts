import styled, { createGlobalStyle } from "styled-components";
import { colors } from "./colors";

export const GlobalStyle = createGlobalStyle`
@layer primereact {
  
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root,
  .App {
    height: 100%;
    width: 100%;
    color: #333;
  }

  .p-card-body {
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    min-height: auto;
  }
  .p-card .p-card-content {
    padding: 0;
}
}
`;
interface PropsFlex {
  justifyContent?: "start" | "center" | "end" | "space-between";
}

export const Column = styled.div<PropsFlex>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || "start"};
`;

export const Row = styled.div<PropsFlex>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent || "start"};
`;

export const RowReponsive = styled.div<PropsFlex>`
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  justify-content: ${(props) => props.justifyContent || "start"};
`;

interface PropsPadding {
  padding?: string;
}

export const Padding = styled.div<PropsPadding>`
  padding: ${(props: any) => props.padding || "4px"};
`;

export const Container = styled.div`
  min-height: 100%;
  height: auto;
  overflow-y: auto;
  width: 100%;
  padding: 4%;
  background-color: ${colors.backgroundcolor};
`;

export const ButtonFloating = styled.div`
  position: fixed;
  bottom: 20px; 
  right: 20px; 
  z-index: 999;
`;
