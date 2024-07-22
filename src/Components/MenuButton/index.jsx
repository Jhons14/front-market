import { useNavigate } from 'react-router-dom';
import './MenuButton.css';

function MenuButton(props) {
  const navigate = useNavigate();

  const imgUrls = [
    {
      productCategory: 'bebidas',
      url: 'src/assets/bebidas_espirituosas-alcohol-nutricion_388473428_119607645_1706x1280.webp',
    },
    {
      productCategory: 'comidas',
      url: 'src/assets/world-food-day-2020.png',
    },
    {
      productCategory: 'postres',
      url: 'src/assets/Classic-French-Macarons-490.jpg',
    },
  ];
  const getCategoryImg = (category) => {
    const img = imgUrls.find((imgUrl) => imgUrl.productCategory === category);
    return img?.url;
  };

  // const categoriesID = categories.map((category) => category.categoryId);

  return (
    <div
      className={`MenuButton ${props.category[0].category}Button`}
      onClick={() => {
        navigate(props.category[0].categoryId.toString());
      }}
    >
      <img
        className={`MenuImg MenuImg-${props.category[0].category}`}
        src={getCategoryImg(props.category[0].category)}
        alt={props.category[0].category}
      />
      <span to='/ProductMenu'>{props.category[0].category}</span>
    </div>
  );
}

export { MenuButton };
