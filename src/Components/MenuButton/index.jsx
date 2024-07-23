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

  async function authenticate(authURL) {
    const parsedToken = await fetch(authURL, credentials)
      .then((res) => res.json().then((res) => res.jwt))
      .catch((error) => {
        onSetError(error);
      });
    return parsedToken;
  }

  function updateCategory() {
    var formData = new FormData();
    var fileInput = document.getElementById(`fileInput${product.productId}`);

    formData.append('file', fileInput.files[0]);

    fetch(
      `http://localhost:2020/platzi-market/api/files/upload/${product.productId}`,
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    const productBody = { img_url: fileInput.files[0].name };

    fetch(
      `http://localhost:2020/platzi-market/api/products/update/${product.productId}`,
      {
        method: 'POST',
        body: JSON.stringify(productBody),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // const categoriesID = categories.map((category) => category.categoryId);

  return (
    <div>
      <div
        className={`MenuButton ${props.category[0].category}Button`}
        onClick={() => {
          navigate(props.category[0].categoryId.toString());
        }}
      >
        <img
          src={`http://localhost:2020/platzi-market/api/images/categories/${props.category[0].img}`}
          alt={props.category[0].category}
        />
        <span>{props.category[0].category}</span>
      </div>
      {!!props.isEditActive && (
        <div>
          <input type='file' />
          <button
            onClick={() => {
              updateCategory(AUTHENTICATION_URL, UPDATE_CATEGORY_URL);
            }}
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
}

export { MenuButton };
