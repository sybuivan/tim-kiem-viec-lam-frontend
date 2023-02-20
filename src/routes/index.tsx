import { RouteObject } from 'react-router';
import MainLayout from 'src/layout/main_layout';
import Home from 'src/pages/home';

let routes: (isLogin: boolean) => RouteObject[] = (isLogin?: boolean) => [
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
