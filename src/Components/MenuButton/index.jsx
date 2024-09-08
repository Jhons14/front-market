import { useNavigate } from 'react-router-dom';
import './index.css';
import { authenticate } from '../../utils';

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

  const UPDATE_CATEGORY_URL = `${SERVER_URL}/platzi-market/api/category/update/${props.category.categoryId}`;
  const UPLOAD_CATEGORY_IMG_URL = `${SERVER_URL}/platzi-market/api/category/update/${props.category.categoryId}`;

  async function updateCategory(UPLOAD_IMG_URL, UPDATE_CATEGORY_URL) {
    const parsedToken = await authenticate();
    var formData = new FormData();
    var fileInput = document.getElementById(`fileInput${category.categoryId}`);

    formData.append('file', fileInput.files[0]);
    fetch(UPLOAD_IMG_URL, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    const categoryBody = { img: fileInput.files[0].name };

    fetch(UPDATE_CATEGORY_URL, {
      method: 'POST',
      body: JSON.stringify(categoryBody),
      headers: {
        Authorization: `Bearer ${parsedToken}`,
        'Content-Type': 'application/json',
      },
    })
      .catch((error) => console.log(error))
      .finally(window.location.reload());
  }

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
                updateCategory(UPLOAD_CATEGORY_IMG_URL, UPDATE_CATEGORY_URL);
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
