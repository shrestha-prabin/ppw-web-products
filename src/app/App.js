import React, { Component } from 'react';
import './css/App.css';
import { Switch, HashRouter as Router, Redirect, Link } from 'react-router-dom';

import Routes from './Routes'


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      opCode: ''
    }

  }


  componentDidMount() {

  }

  handleOpCodeChange = (e) => {
    this.setState({
      opCode: e.target.value
    })
  }

  handleRedirect() {
    switch (this.state.opCode) {
      case "1":
        return <Redirect to='/topup' />

      case "2":
        return <Redirect to='/nwsc' />

      default:
        break;
    }
  }

  render() {

    return (
      <div>
        <Router>
          <Switch>
            <Routes />
          </Switch>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to='/1'>Topup</Link>
            <Link to='/2'>NWSC</Link>
            <Link to='/details/2'>NWSC Details</Link>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
