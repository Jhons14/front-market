import { useState } from 'react';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { getProductsByCategory } from '../utils';

export const MainContext = createContext();

export function MainProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState());

  //STATE UPDATERS
  useEffect(() => {
    sessionStorage.getItem('token') && onSetUserLogged(true);
  }, []);
  ////USER LOGIN
  const onSetUserLogged = (userLogged) =>
    dispatch({
      type: actionTypes.setUserLogged,
      payload: userLogged,
    });

  ////ProductsByCategory
  const onSetProductsByCategory = (productsByCategory) =>
    dispatch({
      type: actionTypes.setProductsByCategory,
      payload: productsByCategory,
    });

  const onSetLoading = (isActive) =>
    dispatch({ type: actionTypes.setLoading, payload: isActive });

  const onSetError = (error) =>
    dispatch({ type: actionTypes.setError, payload: error });

  const onSetTypeProductActive = (typeProductActive) =>
    dispatch({
      type: actionTypes.setTypeProductActive,
      payload: typeProductActive,
    });

  const onSetOrderList = (productsByCategory) =>
    dispatch({ type: actionTypes.setOrderList, payload: productsByCategory });

  const onSetTableActive = (tableActive) =>
    dispatch({ type: actionTypes.setTableActive, payload: tableActive });

  return (
    <MainContext.Provider
      value={{
        userLogged: state.userLogged,
        error: state.error,
        loading: state.loading,
        productsByCategory: state.productsByCategory,
        typeProductActive: state.typeProductActive,
        orderList: state.orderList,
        tableActive: state.tableActive,
        setUserLogged: onSetUserLogged,
        setError: onSetError,
        setLoading: onSetLoading,
        setProductsByCategory: onSetProductsByCategory,
        setTypeProductActive: onSetTypeProductActive,
        setOrderList: onSetOrderList,
        setTableActive: onSetTableActive,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

const initialState = () => {
  return {
    userLogged: false,
    isModalOpen: false,
    error: false,
    loading: false,
    productsByCategory: [],
    typeProductActive: '',
    orderList: [],
    tableActive: 1,
  };
};
const reducerObject = (state, payload) => ({
  [actionTypes.setUserLogged]: {
    ...state,
    userLogged: payload,
  },
  [actionTypes.setError]: {
    ...state,
    error: payload,
  },
  [actionTypes.setLoading]: {
    ...state,
    loading: payload,
  },
  [actionTypes.setTypeProductActive]: {
    ...state,
    typeProductActive: payload,
  },
  [actionTypes.setProductsByCategory]: {
    ...state,
    productsByCategory: payload,
  },
  [actionTypes.setOrderList]: {
    ...state,
    orderList: payload,
  },
  [actionTypes.setTableActive]: {
    ...state,
    tableActive: payload,
  },
  [actionTypes.isModalOpen]: {
    ...state,
    isModalOpen: payload,
  },
});

const actionTypes = {
  setUserLogged: 'SET_USER_LOGGED',
  setError: 'SET_ERROR',
  setLoading: 'SET_LOADING',
  setTypeProductActive: 'SET_TYPE_PRODUCT_ACTIVE',
  setProductsByCategory: 'SET_PRODUCTS_BY_CATEGORY',
  setOrderList: 'SET_ORDER_LIST',
  setTableActive: 'SET_TABLE_ACTIVE',
  isModalOpen: 'IS_MODAL_OPEN',
};

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export const authContext = createContext();
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
}
