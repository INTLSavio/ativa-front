import { GlobalStyle } from "./styles/globalStyles";
import { Routes } from "./routes";
import { ThemeProvider } from "@emotion/react";
import { Theme } from "./themes";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </Provider>
  )
}

export default App;