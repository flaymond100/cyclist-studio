// src/context/state.js
import { createContext, Dispatch, useState, useContext } from "react";

type AppContextType = {
  lastfmUser: string;
  setLastfmUser: Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [lastfmUser, setLastfmUser] = useState<string>("");

  return (
    <AppContext.Provider value={{ lastfmUser, setLastfmUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
