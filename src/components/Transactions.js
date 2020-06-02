import React, { useContext, useState, useEffect } from "react";
import Transaction from "./Transaction";
import { GlobalContext } from "../context/GlobalState";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import pako from "pako";

const Transactions = () => {
  const [expandedDates, setExpandedDates] = useState({
    [`${moment().format("MMM-YYYY")}`]: true,
  });
  const { transactions, imports } = useContext(GlobalContext);

  useEffect(() => {
    const listener = () => {
      window.localStorage.setItem("transactions", JSON.stringify(transactions));
      window.localStorage.setItem("imports", JSON.stringify(imports));
    };
    window.addEventListener("unload", listener);
    return () => window.removeEventListener("unload", listener);
  }, [transactions, imports]);

  const toggleExpandedDate = (date) => {
    setExpandedDates({
      ...expandedDates,
      [date]: expandedDates[date] ? undefined : true,
    });
  };

  const exportTransactions = () => {
    const keys = ["id", "date", "amount", "memo"];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        keys.join(","),
        ...transactions
          .sort((a, b) => moment(b.date).diff(moment(a.date)))
          .map((t) => keys.map((key) => t[key]).join(",")),
      ].join("\n");
    window.open(encodeURI(csvContent));
  };

  const transactionsByDate = transactions.reduce((acc, transaction) => {
    const date = moment(transaction.date).format("MMM-YYYY");
    acc[date]
      ? (acc[date] = [...acc[date], transaction])
      : (acc[date] = [transaction]);
    return acc;
  }, {});

  const sortedTransactionsByDate = Object.entries(
    transactionsByDate
  ).sort((a, b) => moment(b[0]).diff(moment(a[0])));

  return (
    <>
      <h3>
        History{" "}
        {!!transactions.length && (
          <button
            style={{ marginLeft: 25 }}
            onClick={() => exportTransactions()}
          >
            export
          </button>
        )}
      </h3>

      <AnimatePresence>
        {sortedTransactionsByDate.length ? (
          <motion.ul
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className="list"
          >
            {sortedTransactionsByDate.map(([date, transactions]) => {
              const monthlyTotal = transactions
                .map((t) => t.amount)
                .reduce((acc, curr) => (acc += curr), 0)
                .toFixed(2);
              return (
                <li key={date} className="transactions-container">
                  <span
                    onClick={() => toggleExpandedDate(date)}
                    style={{ display: "flex" }}
                  >
                    <span style={{ flex: 1 }}>{date}</span>
                    <span style={{ flex: 1 }}>
                      {transactions.length} transaction
                      {transactions.length > 0 ? "s" : ""}
                    </span>
                    <span style={{ flex: 1 }}>{monthlyTotal}</span>
                  </span>
                  {!!expandedDates[date] && (
                    <ul className="list transactions removable">
                      {transactions
                        .sort((a, b) => moment(b.date).diff(moment(a.date)))
                        .map((t) => (
                          <Transaction key={t.id} {...t} />
                        ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </motion.ul>
        ) : (
          <motion.p
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            iniital={{ opacity: 0 }}
          >
            No transactions recorded yet
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
};

export default Transactions;
