import { NavLink } from 'react-router-dom';
import './NavBar.css';
function NavBar() {
  return (
    <nav className='NavBar'>
      <span>KHD</span>
      <section className='searchField'>
        <input
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
