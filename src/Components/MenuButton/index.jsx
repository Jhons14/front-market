import { useNavigate } from 'react-router-dom';
import './index.css';
import { authenticate, updateCategory } from '../../utils';

function MenuButton(props) {
  const navigate = useNavigate();
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
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const category = props.category[0];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        className={`MenuButton ${category.category}Button`}
        onClick={() => {
          navigate(category.categoryId.toString());
        }}
      >
        <span>{category.category}</span>
      </div>
      {!!props.isEditActive && (
        <div>
          <form id='uploadForm' enctype='multipart/form-data'>
            <input
              type='file'
              name='file'
              id={`fileInput${category.categoryId}`}
            />
            <span
              onClick={() => {
                updateCategory(category.categoryId);
              }}
            >
              Upload
            </span>
          </form>
        </div>
      )}
    </div>
  );
}

export { MenuButton };
