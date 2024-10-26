import { FaSearch } from 'react-icons/fa';

import { useContext, useEffect, useState } from 'react';
import { getAllProducts, signOut } from '../../utils';
import { MainContext } from '../../Context';
import './NavBar.css';
function NavBar() {
  const [searchField, setSearchField] = useState('');
  const [products, setProducts] = useState([]);
  const { setProductsByCategory, setError } = useContext(MainContext);

  useEffect(() => {
    if (searchField.length >= 0) {
      const fetch = async () => {
        await getAllProducts()
          .then((data) => setProducts(data))
          .catch((e) => console.log(e));
      };
      fetch();
    }
  }, []);

  function useSearch(searchField) {
    const newFilteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchField.toLowerCase())
    );
    if (newFilteredProducts.length === 0) {
      setError('No products found');
    } else {
      setProductsByCategory(newFilteredProducts);
    }
    setSearchField('');
  }

  const onSearchingChange = (textToSearch) => setSearchField(textToSearch);

  return (
    <nav className='NavBar'>
      <span>KHD</span>
      <section id='Search-section'>
        <input
          id='Search-input'
          onChange={(e) => onSearchingChange(e.target.value)}
          value={searchField}
          type='text'
          placeholder='Search a product'
        />
        <span
          id='Search-button'
          type='button'
          onClick={() => useSearch(searchField)}
        >
          <FaSearch />
        </span>
      </section>
      <div>Go to perfil</div>
      <div className='signOut' onClick={() => signOut()}>
        <span>Sign Out</span>
      </div>
    </nav>
  );
}
export { NavBar };
