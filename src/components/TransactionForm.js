import React, { useState, useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import CSVReader from "react-csv-reader";
import moment from "moment";
import { v4 as uuid } from "uuid";
import sha256 from "js-sha256";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
};

const requiredTransactionsKeys = ["date", "amount", "memo"];
const TransactionForm = () => {
  const [memo, setMemo] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(moment());
  const { addTransactions, addTransaction, addImport, imports } = useContext(
    GlobalContext
  );
  const memoInputRef = useRef();
  const amountInputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!memo || !amount || !date) return;

    addTransaction({ id: uuid(), memo, amount: +amount, date });
    setMemo("");
    setAmount("");
    memoInputRef.current.focus();
  };

  const handleImport = (transactions) => {
    const keys = Object.keys(transactions[0]);
    const hasEveryRequiredKey = requiredTransactionsKeys.every((key) =>
      keys.includes(key)
    );
    if (!hasEveryRequiredKey) {
      alert(`
      There was an issue with that file
      Your file must contain the following headers: ${requiredTransactionsKeys.join(
        ", "
      )}
      `);
      return;
    }
    const checksum = sha256(JSON.stringify(transactions));
    const matchingChecksum = imports.some((i) => i.checksum === checksum);
    if (
      matchingChecksum &&
      !window.confirm(
        "You've imported this file already it seems. Are you sure you want to import this file?"
      )
    )
      return;

    const importId = uuid();
    const importPayload = {
      id: importId,
      checksum,
      date: moment(),
      total: transactions.reduce((acc, { amount }) => (acc += amount), 0),
    };
    addImport(importPayload);
    addTransactions(transactions.map((t) => ({ id: uuid(), importId, ...t })));
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <input
            type="date"
            value={date.format(moment.HTML5_FMT.DATE)}
            onChange={(e) => setDate(moment(e.target.value))}
          />
        </div>
        <div className="form-control">
          <label htmlFor="text">Memo</label>
          <input
            ref={memoInputRef}
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            ref={amountInputRef}
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
      <CSVReader onFileLoaded={handleImport} parserOptions={papaparseOptions} />
    </>
  );
};

export default TransactionForm;
