import "./App.css";
import { GlobalStyle } from "./assets/styles/globalstyles";
import AplicationProvider from "./context/context";
import RoutesApp from "./router/router";
import "/node_modules/primeflex/primeflex.css"

import 'primeicons/primeicons.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";

const App = () => {
  return (
    <AplicationProvider>
      <GlobalStyle />
      <RoutesApp />
    </AplicationProvider>
  );
};

export default App;
