import React from 'react';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import ModalController from './components/modal/modal_controller';
import { Toaster } from 'react-hot-toast';

import './index.css';
import App from './App';
import theme from 'src/theme';
import store from './redux_store';
import GlobalDndContext from './dnd-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <GlobalDndContext>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
          <ModalController />
        </BrowserRouter>
        <Toaster position="top-center" />
      </ThemeProvider>
    </GlobalDndContext>
  </Provider>
);

reportWebVitals();
