import { useRoutes, BrowserRouter } from 'react-router-dom';
import { MainProvider } from '../../Context';
import { Home } from '../Home';
import { NavBar } from '../../Components/NavBar';
import { MainMenu } from '../../Components/MainMenu';
import { ScreenError } from '../../common/ScreenError';
import { ScreenLoading } from '../../common/ScreenLoading';
import { ProductMenu } from '../ProductMenu';
function AppRoutes() {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/bebidas', element: <ProductMenu /> },
    { path: '/error', element: <ScreenError /> },
  ]);

  return routes;
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
