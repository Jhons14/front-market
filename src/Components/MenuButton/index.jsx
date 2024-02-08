import { useNavigate } from 'react-router-dom';
import './MenuButton.css';

function MenuButton(props) {
  const navigate = useNavigate();
  const IMG_DRINKS_URL =
    'src/assets/bebidas_espirituosas-alcohol-nutricion_388473428_119607645_1706x1280.webp';
  const IMG_FOOD_URL = 'src/assets/world-food-day-2020.png';
  const IMG_DESSERT_URL = 'src/assets/Classic-French-Macarons-490.jpg';
  const getCategoryImg = () => {
    if (props.category === 'Bebidas') {
      return IMG_DRINKS_URL;
    }
    if (props.category === 'Comidas') {
      return IMG_FOOD_URL;
    }
    if (props.category === 'Postres') {
      return IMG_DESSERT_URL;
    }
  };
  return (
    <div
      className={`MenuButton ${props.category}Button`}
      onClick={() => {
        props.setTypeProductActive(props.category);
        props.setLoading(true);
        navigate(props.category.toLowerCase());
      }}
    >
      <img
        className={`MenuImg MenuImg-${props.category}`}
        src={getCategoryImg()}
        alt={props.category}
      />
      <span to='/ProductMenu'>{props.category}</span>;
    </div>
  );
}

export { MenuButton };
