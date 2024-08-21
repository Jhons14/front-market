import { useEffect, useState } from 'react';
import { MenuButton } from '../MenuButton';
import './Menus.css';

function Menus(props) {
  const [isEditActive, setIsEditActive] = useState(false);
  const [categories, setCategories] = useState([]);

  const GET_ALL_CATEGORIES_URL = `http://localhost:2020/platzi-market/api/category/all`;

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
    props.setError();

    const parsedToken = await authenticate();
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    })
      .then((data) => (data = data.json()))
      .catch((error) => {
        props.setError(error);
      });
    return response;
  }

  useEffect(() => {
    const fetchCategories = async () => {
      props.setLoading(true);
      try {
        const response = await getAllCategories(GET_ALL_CATEGORIES_URL);
        setCategories(response);
      } catch (error) {
        setError(error);
      }
      props.setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <div className='Menus'>
      {categories?.map((category) => {
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
        type='button'
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
