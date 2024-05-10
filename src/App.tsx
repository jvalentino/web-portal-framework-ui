import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppState from './AppState'; // Correct import path for AppState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageTemplate from './view/page-template/PageTemplate'; // Correct import path for PageTemplate

interface Page {
  uri: string;
}

function App() {
  // Assuming AppState.getConfig() returns a valid configuration object
  const config = AppState.getConfig();
  console.log(config);

  return (
    <Router>
      <Routes>
        {config.pages.map((page: Page, index: number) => (
          <Route key={index} path={page.uri} element={<PageTemplate />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
