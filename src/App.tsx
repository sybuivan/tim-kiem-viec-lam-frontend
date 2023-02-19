import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from 'src/routes';

function App() {
  // const isLogin: boolean = true;
  console.log('dasd');
  return useRoutes(routes);
}

export default App;
