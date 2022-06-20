import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Fib from './Fib';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Route exact path="/" component={Fib} />
        </div>
      </div>
    </Router>
  );
}

export default App;
