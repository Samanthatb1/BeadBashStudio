import React from 'react';
import ReactDOM from 'react-dom';
import './components/search.css';
import Search from './components/Search';
import Welcome from './components/Welcome';

// rendering both components onto index.html
ReactDOM.render(
  <React.StrictMode>
    <Welcome />
    <Search />
  </React.StrictMode>,
  document.getElementById('react-component')
);


