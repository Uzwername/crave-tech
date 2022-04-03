import React, { StrictMode } from 'react';
import { GlobalContextContainerProps } from "./GlobalContext.types";

const GlobalContext = ({ children }: GlobalContextContainerProps) => {
  return (
    <StrictMode>
      {children}
    </StrictMode>
  );
};

export default GlobalContext