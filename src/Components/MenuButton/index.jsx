import { useNavigate } from 'react-router-dom';
import './MenuButton.css';
import { isEnumDeclaration } from 'typescript';

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
  const AUTHENTICATION_URL =
    'http://localhost:2020/platzi-market/api/auth/authenticate';
  const UPDATE_CATEGORY_URL = `http://localhost:2020/platzi-market/api/category/update/${props.category[0].categoryId}`;

  const category = props.category[0];
  async function authenticate(authURL) {
    const parsedToken = await fetch(authURL, credentials)
      .then((res) => res.json().then((res) => res.jwt))
      .catch((error) => {
        console.log(error);
      });
    return parsedToken;
  }

  async function updateCategory() {
    const parsedToken = await authenticate(AUTHENTICATION_URL);
    var formData = new FormData();
    var fileInput = document.getElementById(`fileInput${category.categoryId}`);

    formData.append('file', fileInput.files[0]);
    fetch(
      `http://localhost:2020/platzi-market/api/files/upload/image/category/${category.categoryId}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      }
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    const categoryBody = { img: fileInput.files[0].name };

    fetch(
      `http://localhost:2020/platzi-market/api/category/update/${category.categoryId}`,
      {
        method: 'POST',
        body: JSON.stringify(categoryBody),
        headers: {
          Authorization: `Bearer ${parsedToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(window.location.reload());
  }

  // const categoriesID = categories.map((category) => category.categoryId);
  return (
    <div>
      <div
        className={`MenuButton ${category.category}Button`}
        onClick={() => {
          navigate(category.categoryId.toString());
        }}
      >
        <img
          src={`http://localhost:2020/platzi-market/api/images/categories/${category.img}`}
          alt={category.img}
        />
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
                updateCategory(AUTHENTICATION_URL, UPDATE_CATEGORY_URL);
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
