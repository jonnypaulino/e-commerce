import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { GlobalStyle } from "./assets/styles/globalstyles";
import AplicationProvider from "./context/context";
import RoutesApp from "./router/router";
import "/node_modules/primeflex/primeflex.css"

import 'primeicons/primeicons.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import queryClient from "./service/queryClient";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>

    <AplicationProvider>
      <GlobalStyle />
      <RoutesApp />
    </AplicationProvider>
    </QueryClientProvider>
  );
};

export default App;
