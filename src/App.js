import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';

function App() {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
    document.body.style.backgroundColor = mode === 'light' ? '#121212' : 'white';
  };

  const pageSize = 6;
  const apikey = process.env.NEWS_API_KEY;

  return (
    <Router>
      <Navbar mode={mode} toggleMode={toggleMode} />

      <Routes>
        <Route
          path="/"
          element={<News key="general" category="general" pageSize={pageSize} apikey={apikey} />}
        />
        <Route
          path="/business"
          element={<News key="business" category="business" pageSize={pageSize} apikey={apikey} />}
        />
        <Route
          path="/sports"
          element={<News key="sports" category="sports" pageSize={pageSize} apikey={apikey} />}
        />
        <Route
          path="/technology"
          element={<News key="technology" category="technology" pageSize={pageSize} apikey={apikey} />}
        />
        <Route
          path="/entertainment"
          element={<News key="entertainment" category="entertainment" pageSize={pageSize} apikey={apikey} />}
        />
        <Route
          path="/pakistan"
          element={<News key="pakistan" category="general" pageSize={pageSize} apikey={apikey} country="pk" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
