import { createContext, useEffect, useReducer } from 'react';

export const MainContext = createContext();

export function MainProvider({ children }) {
  const AUTHENTICATION_URL =
    'http://localhost:2020/platzi-market/api/auth/authenticate';

  const [state, dispatch] = useReducer(reducer, initialState());

  const onSetProducts = (products) =>
    dispatch({ type: actionTypes.setProducts, payload: products });

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

  const onSetOrderList = (products) =>
    dispatch({ type: actionTypes.setOrderList, payload: products });

  const onSetTableActive = (tableActive) =>
    dispatch({ type: actionTypes.setTableActive, payload: tableActive });

  const onOpenModal = () =>
    dispatch({ type: actionTypes.isModalOpen, payload: true });

  const onCloseModal = () =>
    dispatch({ type: actionTypes.isModalOpen, payload: false });

  const categoryHomologation = [
    {
      name: 'bebidas',
      categoryId: 5,
    },
    {
      name: 'comidas',
      categoryId: 3,
    },
    {
      name: 'postres',
      categoryId: 2,
    },
  ];

  const getActiveCategory = () => {
    const category = categoryHomologation.find(
      (category) => category.name === state.typeProductActive
    );
    return category?.categoryId;
  };

  const PRODUCT_BY_CATEGORY_URL = `http://localhost:2020/platzi-market/api/products/category/${getActiveCategory()}`;

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

  async function getProducts() {
    const parsedToken = await authenticate();
    await fetch(PRODUCT_BY_CATEGORY_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    })
      .then((data) => (data = data.json()))
      .then((data) => {
        onSetProducts(data);
      })
      .catch((error) => {
        onSetError(error);
      });
    onSetLoading(false);
    onSetProductsActive();
  }

  useEffect(() => {
    onSetLoading(true);
    setTimeout(() => {
      if (state.typeProductActive !== '') {
        try {
          getProducts();
        } catch (error) {
          onSetError(error);
        }
      }
      onSetLoading(false);
    }, 1000);
  }, [state.typeProductActive]);

  return (
    <MainContext.Provider
      value={{
        error: state.error,
        loading: state.loading,
        products: state.products,
        productsActive: state.productsActive,
        typeProductActive: state.typeProductActive,
        orderList: state.orderList,
        tableActive: state.tableActive,
        setProductsActive: onSetProductsActive,
        setError: onSetError,
        setLoading: onSetLoading,
        setProducts: onSetProducts,
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
    products: [],
    typeProductActive: '',
    orderList: [],
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
  [actionTypes.setProducts]: {
    ...state,
    products: payload,
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
  setProducts: 'SET_PRODUCTS',
  setProductsActive: 'SET_PRODUCTS_ACTIVE',
  setOrderList: 'SET_ORDER_LIST',
  setTableActive: 'SET_TABLE_ACTIVE',
  isModalOpen: 'IS_MODAL_OPEN',
};

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};
