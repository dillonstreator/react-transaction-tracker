import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import AnimatedNumber from "animated-number-react";

export const ExpenseTotal = ({ amount }) => {
  return (
    <div>
      <h4>Expenses</h4>
      <p className="money minus">
        <AnimatedNumber
          value={amount}
          formatValue={(v) => `-$${Math.abs(v).toFixed(2)}`}
        />
      </p>
    </div>
  );
};
export const IncomeTotal = ({ amount }) => {
  return (
    <div>
      <h4>Income</h4>
      <p className="money plus">
        <AnimatedNumber
          value={amount}
          formatValue={(v) => `+$${v.toFixed(2)}`}
        />
      </p>
    </div>
  );
};

const Totals = () => {
  const { transactions } = useContext(GlobalContext);

  const { total, expense, income } = transactions.reduce(
    (acc, { amount }) => {
      acc.total += amount;
      if (amount < 0) acc.expense += amount;
      else acc.income += amount;

      return acc;
    },
    { total: 0, expense: 0, income: 0 }
  );

  return (
    <div>
      <h2>
        Your Balance:{" "}
        <AnimatedNumber
          value={total}
          formatValue={(v) => `${v < 0 ? "-" : ""}$${Math.abs(v).toFixed(2)}`}
        />
      </h2>
      <div className="inc-exp-container">
        <IncomeTotal amount={income.toFixed(2)} />
        <ExpenseTotal amount={expense.toFixed(2)} />
      </div>
    </div>
  );
};

export default Totals;
