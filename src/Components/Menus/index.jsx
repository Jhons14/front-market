import { useEffect, useState } from 'react';
import { MenuButton } from '../MenuButton';
import './Menus.css';

function Menus(props) {
  const [products, setProducts] = useState([]);
  const [isEditActive, setIsEditActive] = useState(false);
  const [categories, setCategories] = useState([]);

  const GET_ALL_CATEGORIES = `http://localhost:2020/platzi-market/api/category/all`;

  const GET_ALL_PRODUCTS = `http://localhost:2020/platzi-market/api/products/all`;
  const AUTHENTICATION_URL =
    'http://localhost:2020/platzi-market/api/auth/authenticate';
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
  async function getAllCategories(URL) {
    const parsedToken = await authenticate();
    await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    })
      .then((data) => (data = data.json()))
      .then((data) => setCategories(data))
      .catch((error) => {
        onSetError(error);
      });
  }

  async function getAllProducts() {
    const parsedToken = await authenticate();
    await fetch(GET_ALL_PRODUCTS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    })
      .then((data) => (data = data.json()))
      .then((data) => setProducts(data))
      .catch((error) => {
        onSetError(error);
      });
  }

  useEffect(() => {
    getAllProducts();
    getAllCategories(GET_ALL_CATEGORIES);
  }, []);
  return (
    <div className='Menus'>
      {categories.map((category) => {
        const categoryArray = [category];

        return (
          <MenuButton
            setProductsActive={props.setProductsActive}
            category={categoryArray}
            setLoading={props.setLoading}
            isEditActive={isEditActive}
          />
        );
      })}
      <button
        onClick={() => {
          setIsEditActive((prevState) => !prevState);
        }}
      >
        Edit
      </button>
    </div>
  );
}

export { Menus };
