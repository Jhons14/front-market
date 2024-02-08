import { useRoutes, BrowserRouter } from 'react-router-dom';
import { Home } from '../Home';
import { NavBar } from '../../Components/NavBar';
import { MainMenu } from '../../Components/MainMenu';
import { ScreenError } from '../../common/ScreenError';
import { ScreenLoading } from '../../common/ScreenLoading';
function AppRoutes() {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/bebidas', element: <MainMenu /> },
    { path: '/error', element: <ScreenError /> },
  ]);

  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
    </BrowserRouter>
  );
}
export { App };
