import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import moment from "moment";

const Imports = () => {
  const { imports, removeImport } = useContext(GlobalContext);

  if (!imports.length) return null;

  const _removeImport = (id) => {
    if (
      !window.confirm(
        `Are you sure you want to remove import ${id} and it's associated transactions?`
      )
    )
      return;

    removeImport(id);
  };

  return (
    <>
      <h3>Imports</h3>
      <ul className="list transactions removable">
        {imports.map(({ id, date, checksum, total }) => (
          <li key={id} style={{ display: "flex" }}>
            <button
              className="delete-btn"
              onClick={() => _removeImport(id)}
            >
              remove
            </button>
            <span style={{ flex: 1 }}>{moment(date).format("YYYY-MM-DD")}</span>
            <span style={{ flex: 1 }} title={checksum}>
              {checksum.slice(0, 5)}
            </span>
            <span style={{ flex: 1 }}>{total.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Imports;
