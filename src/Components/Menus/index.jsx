import { useEffect, useState } from 'react';
import { MenuButton } from '../MenuButton';
import './Menus.css';
import { getAllCategories } from '../../utils';

function Menus(props) {
  const [isEditActive, setIsEditActive] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      props.setLoading(true);
      try {
        const response = await getAllCategories();
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
            key={category.categoryId}
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
