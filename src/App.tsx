import React from 'react';
import GlobalContext from "./containers/GlobalContext/GlobalContext";
import StartupForm from "./containers/StartupForm/StartupForm";

const App = () => {
  return (
    <GlobalContext>
      <StartupForm />
    </GlobalContext>
  );
}

export default App;
