import '@fontsource/poppins';

import { useRoutes, BrowserRouter } from 'react-router-dom';
import { MainProvider } from '../../Context';
import { Home } from '../Home';
import { NavBar } from '../../Components/NavBar';
import { ProductMenu } from '../ProductMenu';
import { EditPage } from '../EditPage';

import './index.css';

function AppRoutes() {
  let appRoutes = useRoutes([
    {
      path: '/',
      element: <Home />,
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
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </MainProvider>
  );
}
export { App };
