import React, { Component } from 'react';
import './App.css';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios'

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
    // window.addEventListener('message', (data) => {
    //   this.setState({ data: data })
    // })
  }

  handleValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitData = () => {

    // setTimeout(() => {
    //   window.postMessage('message', '*')

    // }, 1000);
    // return

    this.setState({ isLoading: true })

    // window.postMessage(this.state.amount, '*')
    window.Android.showToast()


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
        this.setState({ isLoading: false, response: error.message })
      })

  }

  submitData2 = () => {
    

    this.setState({ isLoading: true })

    if (window.webkit) {
      window.webkit.messageHandlers.clickListener.postMessage('message');
    }

    let url = 'https://testmerchant.prabhupay.com/ApiMobile/MobileService.svc/MobileTopup'
    let params = {
      "UserName": this.token.value,
      "Password": this.customerId.value,
      "OperatorCode": 1,
      "MobileNumber": this.state.mobileNo,
      "Amount": this.state.amount,
      "ExtraField1": ""
    }

    this.request.value = JSON.stringify(params)
    
    axios.post(url, params, {
      headers: {
        "x-token": "fyZbT@r6_Rx$HGfNKyUL",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
      body: params
    }).then(res => {
      console.log(res);
      this.response.value = JSON.stringify(res)
      this.setState({ isLoading: false })
    }).catch(err => {
      console.log(err);
      this.response.value = err
      this.setState({ isLoading: false })
    })

  }

  render() {

    return (
      <div className='App' ref={ref => this.rv = ref}>
        <form className='form'>
          <input ref={ref => this.token = ref} id='username' /*type='hidden'*/ />
          <input ref={ref => this.customerId = ref} id='password' /*type='hidden'*/ />

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
            onClick={this.submitData2}>
            Top Up Now
          </Button>

        </form>

        {
          this.state.isLoading
            ? 'Loading'
            : this.state.response
        }

        <textarea style={{width: 300, height: 200}} ref={ref => this.request = ref} />
        <textarea  style={{width: 300, height: 200}} ref={ref => this.response = ref} />

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