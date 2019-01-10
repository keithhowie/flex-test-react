import React, { Component } from 'react';
import './App.css';
import { Signup } from './signup';
import { Candidates } from './candidates';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const Index = () => <h2>Welcome</h2>;

class App extends Component {
  render() {
    return (
      <div>
        <h2>Flex Test React</h2>
        <Router>
          <div>
            <nav>
              <Button component={Link} to="/signup/">New Candidate Signup</Button>
              <Button component={Link} to="/candidates/">Candidates</Button>
            </nav>

            <Route path="/" exact component={Index} />
            <Route path="/signup/" component={Signup} />
            <Route path="/candidates/" component={Candidates} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
