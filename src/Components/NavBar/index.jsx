import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getAllProducts } from '../../utils';
import { MainContext } from '../../Context';
import './NavBar.css';
function NavBar() {
  const [searchField, setSearchField] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { setProductsByCategory } = useContext(MainContext);

  useEffect(() => {
    const fetch = async () => {
      await getAllProducts()
        .then((data) => setProducts(data))
        .catch((e) => console.log(e));
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!!searchField) {
      const newFilteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchField.toLowerCase())
      );
      setFilteredProducts(newFilteredProducts);
      setProductsByCategory(newFilteredProducts);
    }
  }, [searchField]);

  const onSearchingChange = (textToSearch) => setSearchField(textToSearch);
  return (
    <nav className='NavBar'>
      <span>KHD</span>
      <section className='searchField'>
        <input
          onChange={(e) => onSearchingChange(e.target.value)}
          className='searchValue'
          type='text'
          placeholder='Search a product'
        />
      </section>
      <div>go to perfil</div>
    </nav>
  );
}
export { NavBar };
