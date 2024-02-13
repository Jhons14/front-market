import { useRoutes, BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainProvider } from '../../Context';
import { Home } from '../Home';
import { NavBar } from '../../Components/NavBar';
import { ScreenError } from '../../common/ScreenError';
import { ScreenLoading } from '../../common/ScreenLoading';
import { ProductMenu } from '../ProductMenu';

function AppRoutes() {
  let appRoutes = useRoutes([
    {
      path: '/',
      element: <Home />,
      children: [{ path: ':bebidas', element: <ProductMenu /> }],
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
