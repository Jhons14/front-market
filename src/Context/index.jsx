import { createContext, useEffect, useReducer } from 'react';
import { getProductsByCategory } from '../utils';

export const MainContext = createContext();

export function MainProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState());

  const onSetProductsByCategory = (productsByCategory) =>
    dispatch({
      type: actionTypes.setProductsByCategory,
      payload: productsByCategory,
    });

  const onSetLoading = (isActive) =>
    dispatch({ type: actionTypes.setLoading, payload: isActive });

  const onSetError = (error) =>
    dispatch({ type: actionTypes.setError, payload: error });

  const onSetProductsActive = () =>
    dispatch({ type: actionTypes.setProductsActive });

  const onSetTypeProductActive = (typeProductActive) =>
    dispatch({
      type: actionTypes.setTypeProductActive,
      payload: typeProductActive,
    });

  const onSetOrderList = (productsByCategory) =>
    dispatch({ type: actionTypes.setOrderList, payload: productsByCategory });

  const onSetTableActive = (tableActive) =>
    dispatch({ type: actionTypes.setTableActive, payload: tableActive });

  useEffect(() => {
    if (state.typeProductActive !== '') {
      const fetchProducts = async () => {
        onSetLoading(true);
        const response = await getProductsByCategory(
          onSetProductsActive,
          onSetLoading,
          onSetError
        );
        onSetProductsByCategory(response);
        onSetLoading(false);
        onSetProductsActive();
      };
      fetchProducts();
    }
  }, [state.typeProductActive]);

  return (
    <MainContext.Provider
      value={{
        error: state.error,
        loading: state.loading,
        productsByCategory: state.productsByCategory,
        productsActive: state.productsActive,
        typeProductActive: state.typeProductActive,
        orderList: state.orderList,
        tableActive: state.tableActive,
        setProductsActive: onSetProductsActive,
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
    isModalOpen: false,
    error: false,
    loading: false,
    productsActive: '',
    productsByCategory: [],
    typeProductActive: '',
    orderList: [],
    tableActive: 1,
  };
};
const reducerObject = (state, payload) => ({
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
  [actionTypes.setProductsActive]: {
    ...state,
    isActive: true,
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
  setError: 'SET_ERROR',
  setLoading: 'SET_LOADING',
  setTypeProductActive: 'SET_TYPE_PRODUCT_ACTIVE',
  setProductsByCategory: 'SET_PRODUCTS_BY_CATEGORY',
  setProductsActive: 'SET_PRODUCTS_ACTIVE',
  setOrderList: 'SET_ORDER_LIST',
  setTableActive: 'SET_TABLE_ACTIVE',
  isModalOpen: 'IS_MODAL_OPEN',
};

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};
