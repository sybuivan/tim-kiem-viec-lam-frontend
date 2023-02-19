import { RouteObject } from 'react-router';
import MainLayout from 'src/layout/main_layout';
import Home from 'src/pages/home';

let routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
];

export default routes;
