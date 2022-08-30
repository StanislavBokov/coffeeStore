import React from 'react';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { Loader } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<Loader />} >
        <Provider store={store}>
          <App />
        </Provider>  
      </Suspense>
    </Router>
  </React.StrictMode>
);
