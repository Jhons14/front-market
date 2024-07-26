import { useRoutes, BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainProvider } from '../../Context';
import { Home } from '../Home';
import { NavBar } from '../../Components/NavBar';
import { ScreenError } from '../../common/ScreenError';
import { ScreenLoading } from '../../common/ScreenLoading';
import { ProductMenu } from '../ProductMenu';
import { EditPage } from '../EditPage';

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
