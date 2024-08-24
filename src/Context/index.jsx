import { createContext, useEffect, useReducer } from 'react';

export const MainContext = createContext();

export function MainProvider({ children }) {
  //Environment server URL
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const AUTHENTICATION_URL = `${SERVER_URL}/platzi-market/api/auth/authenticate`;

  const categoryId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf('/') + 1
  );
  const GET_PRODUCTS_BY_CATEGORY_URL = `${SERVER_URL}/platzi-market/api/products/category/${categoryId}`;

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

  const credentials = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'jhon',
      password: 'Platzi#14',
    }),
  };

  async function authenticate() {
    const parsedToken = await fetch(AUTHENTICATION_URL, credentials)
      .then((res) => res.json().then((res) => res.jwt))
      .catch((error) => {
        onSetError(error);
      });
    return parsedToken;
  }

  async function getProductsByCategory() {
    onSetError();
    const parsedToken = await authenticate();
    const products = await fetch(GET_PRODUCTS_BY_CATEGORY_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    })
      .then((data) => (data = data.json()))
      .catch((error) => {
        onSetError(error);
      });
    onSetLoading(false);
    onSetProductsActive();
    return products;
  }

  useEffect(() => {
    if (state.typeProductActive !== '') {
      const fetchProducts = async () => {
        onSetLoading(true);
        try {
          const response = await getProductsByCategory();
          onSetProductsByCategory(response);
        } catch (error) {
          onSetError(error);
        }
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
        authenticate: authenticate,
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
