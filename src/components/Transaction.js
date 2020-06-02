import React, { useContext } from "react";
import { motion } from "framer-motion";
import { GlobalContext } from "../context/GlobalState";

const Transaction = ({ id, amount, memo }) => {
  const { removeTransaction } = useContext(GlobalContext);

  return (
    <>
      <motion.li
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: -50, opacity: 0 }}
        exit={{ x: 200, opacity: 0 }}
        className={amount < 0 ? "minus" : "plus"}
      >
        <button className="delete-btn" onClick={() => removeTransaction(id)}>
          remove
        </button>
        {memo}{" "}
        <span>
          {amount < 0 ? "-" : "+"}${Math.abs(amount)}
        </span>
      </motion.li>
    </>
  );
};

export default Transaction;
