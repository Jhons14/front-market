import { useContext } from 'react';
import '@fontsource/poppins';

import { useRoutes, BrowserRouter } from 'react-router-dom';

import { MainProvider, MainContext } from '../../Context';
import { Home } from '../Home';
import { ProductMenu } from '../ProductMenu';
import { EditPage } from '../EditPage';
import { SignIn } from '../SignIn';
import './index.css';

function AppRoutes() {
  const { userLogged } = useContext(MainContext);

  let appRoutes = useRoutes([
    {
      path: '/',
      element: userLogged ? <Home /> : <SignIn />,
      children: [{ path: ':productCategory', element: <ProductMenu /> }],
    },
    {
      path: 'product/edit/:id',
      element: <EditPage />,
    },
  ]);
  return appRoutes;
}

function App() {
  return (
    <MainProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MainProvider>
  );
}
export { App };
