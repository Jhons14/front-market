import '@fontsource/poppins';

import { useRoutes, BrowserRouter, Route } from 'react-router-dom';

import { MainProvider } from '../../Context';
import { Home } from '../Home';
import { ProductMenu } from '../ProductMenu';
import { EditPage } from '../EditPage';
import { SignIn } from '../SignIn';
import './index.css';

function AppRoutes() {
  let appRoutes = useRoutes([
    {
      path: '/',
      element: sessionStorage.getItem('token') ? <Home /> : <SignIn />,
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
