const ADD_TRANSACTION = "ADD_TRANSACTION";
export const addTransaction = (dispatch) => (transaction) =>
  dispatch({
    type: ADD_TRANSACTION,
    payload: transaction,
  });

const ADD_TRANSACTIONS = "ADD_TRANSACTIONS";
export const addTransactions = (dispatch) => (transactions) =>
  dispatch({
    type: ADD_TRANSACTIONS,
    payload: transactions,
  });

const REMOVE_TRANSACTION = "REMOVE_TRANSACTION";
export const removeTransaction = (dispatch) => (id) =>
  dispatch({
    type: REMOVE_TRANSACTION,
    payload: id,
  });

const ADD_IMPORT = "ADD_IMPORT";
export const addImport = (dispatch) => (payload) =>
  dispatch({
    type: ADD_IMPORT,
    payload,
  });

const REMOVE_IMPORT = "REMOVE_IMPORT";
export const removeImport = (dispatch) => (id) =>
  dispatch({
    type: REMOVE_IMPORT,
    payload: id,
  });

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
      };
    case ADD_TRANSACTIONS:
      return {
        ...state,
        transactions: [...payload, ...state.transactions],
      };
    case REMOVE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== payload),
      };
    case ADD_IMPORT:
      return {
        ...state,
        imports: [payload, ...state.imports],
      };
    case REMOVE_IMPORT:
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.importId !== payload),
        imports: state.imports.filter((i) => i.id !== payload),
      };
    default:
      return state;
  }
};
