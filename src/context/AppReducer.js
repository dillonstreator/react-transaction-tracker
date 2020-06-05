const createAction = (type) => (dispatch) => (payload) =>
  dispatch({
    type,
    payload,
  });

const ADD_TRANSACTION = "ADD_TRANSACTION";
export const addTransaction = createAction(ADD_TRANSACTION);

const ADD_TRANSACTIONS = "ADD_TRANSACTIONS";
export const addTransactions = createAction(ADD_TRANSACTIONS);

const REMOVE_TRANSACTION = "REMOVE_TRANSACTION";
export const removeTransaction = createAction(REMOVE_TRANSACTION);

const ADD_IMPORT = "ADD_IMPORT";
export const addImport = createAction(ADD_IMPORT);

const REMOVE_IMPORT = "REMOVE_IMPORT";
export const removeImport = createAction(REMOVE_IMPORT);

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
