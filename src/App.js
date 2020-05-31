import React, { Component } from 'react';
import './App.css';
import { TextField, Button } from '@material-ui/core';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: '',
      mobileNo: '',
      amount: ''
    }
  }


  componentDidMount() {
    window.addEventListener('message', (data) => {
      this.setState({ data: data })
    })
  }

  handleValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitData = () => {

    this.setState({
      customerId: this.customerId.value
    })

    window.postMessage(this.state.amount, '*')
  }

  render() {
    return (
      <div className='App' ref={ref => this.rv = ref}>
        <form className='form'>
          <input ref={ref => this.customerId = ref} id='customerId' type='hidden' />

          <TextField style={styles.input}
            label='Mobile Number'
            name='mobileNo'
            value={this.state.mobileNo}
            onChange={this.handleValueChange}
          />

          <TextField style={styles.input}
            label='Amount'
            name='amount'
            value={this.state.amount}
            onChange={this.handleValueChange}
          />

          <Button style={styles.button}
            variant='contained'
            onClick={this.submitData}>
            Top Up Now
          </Button>

        </form>
        {this.state.customerId}
        <br />
        {this.state.data.data}
      </div>
    );
  }
}

export default App;

const styles = {
  input: {
    marginTop: 16,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#b71c23',
    color: '#fff'
  }
}