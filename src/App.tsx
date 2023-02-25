import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from 'src/routes';

function App() {
  const isLogin: boolean = true;
  return useRoutes(routes(isLogin));
}

export default App;
