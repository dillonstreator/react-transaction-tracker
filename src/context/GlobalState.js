import React, { createContext, useReducer } from "react";
import AppReducer, {
  addTransaction,
  addTransactions,
  removeTransaction,
  addImport,
  removeImport,
} from "./AppReducer";
import pako from "pako";

const transactions = (() => {
  try {
    const t = window.localStorage.getItem("transactions");
    if (!t) return [];
    return JSON.parse(t);
  } catch (error) {
    return [];
  }
})();
const imports = (() => {
  try {
    const i = window.localStorage.getItem("imports");
    if (!i) return [];
    return JSON.parse(i);
  } catch (error) {
    return [];
  }
})();

const initialState = {
  transactions,
  imports,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const { transactions, imports } = state;
  return (
    <GlobalContext.Provider
      value={{
        transactions,
        imports,
        addTransaction: addTransaction(dispatch),
        addTransactions: addTransactions(dispatch),
        removeTransaction: removeTransaction(dispatch),
        addImport: addImport(dispatch),
        removeImport: removeImport(dispatch),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
