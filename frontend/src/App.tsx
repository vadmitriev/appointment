import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

import '@/styles/App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
};

export default App;
