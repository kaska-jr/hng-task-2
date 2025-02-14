import { createContext, useState } from "react";
import usePersistedState from "../hooks/usePersistedState";

const defaultValue = 0;

const StageContext = createContext(defaultValue);

export const StageContextProvider = ({ children }) => {
  const [stage, setState] = usePersistedState({
    key: "stage",
    defaultValue,
  });

  const gotoNext = () => {
    if (stage === 2) return;
    setState(stage + 1);
  };

  const goToPrevious = () => {
    if (stage === 0) return;
    setState(stage - 1);
  };

  const setStage = (stage) => setState(stage);

  return (
    <StageContext.Provider value={{ gotoNext, goToPrevious, stage, setStage }}>
      {children}
    </StageContext.Provider>
  );
};

export default StageContext;
