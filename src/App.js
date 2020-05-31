import React, { Component } from 'react';
import './App.css';
import { TextField, Button } from '@material-ui/core';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,

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

    this.setState({ isLoading: true })

    // window.postMessage(this.state.amount, '*')


    let url = 'https://testsys.prabhupay.com/api/BillPayment/MobileTopUp'
    let params = {
      "customerId": this.customerId.value,
      "topUpNumber": this.state.mobileNo,
      "operatorId": 1,
      "amount": this.state.amount,
      "planId": "",
      "planName": "",
      "planDesc": "",
      "planValidity": "",
      "requestFromFlag": 0
    }

    fetch(url, {
      method: "POST",
      cache: 'no-cache',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.token.value
      },
      body: JSON.stringify(params)
    }).then(res => res.json())
      .then(result => {
        this.setState({ isLoading: false, response: 'Success' })
      }, error => {
        this.setState({isLoading: false, response: error.message })
      })

  }

  render() {
    return (
      <div className='App' ref={ref => this.rv = ref}>
        <form className='form'>
          <input ref={ref => this.token = ref} id='token' /*type='hidden'*/ />
          <input ref={ref => this.customerId = ref} id='customerId' /*type='hidden'*/ />

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

        {
          this.state.isLoading
            ? 'Loading'
            : this.state.response
        }

        <br />
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