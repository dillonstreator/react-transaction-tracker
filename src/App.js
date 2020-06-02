import React from "react";
import Totals from "./components/Totals";
import Transactions from "./components/Transactions";
import TransactionForm from "./components/TransactionForm";
import Imports from "./components/Imports";
import { GlobalProvider } from "./context/GlobalState";

const App = () => (
  <GlobalProvider>
    <div className="container">
      <h1>Transaction Tracker</h1>
      <Totals />
      <Transactions />
      <TransactionForm />
      <Imports />
    </div>
  </GlobalProvider>
);

export default App;
