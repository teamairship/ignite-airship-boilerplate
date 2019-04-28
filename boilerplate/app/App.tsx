import React from "react";
import { RootNavigator } from "./navigation";
import GlobalContextProvider from "./context/GlobalContextProvider";

const App: React.FC = () => (
  <GlobalContextProvider>
    <RootNavigator />
  </GlobalContextProvider>
);

export default App;
