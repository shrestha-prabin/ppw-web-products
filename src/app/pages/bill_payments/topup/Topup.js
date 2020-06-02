import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import {formStyles} from '../../../configs/Styles'

export class Topup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,

            mobileNo: '',
            amount: ''
        }
    }

    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submitData = () => {

        this.setState({ isLoading: true })

        let url = 'MobileTopup'
        let params = {
            "UserName": "",
            "Password": "",
            "OperatorCode": 1,
            "MobileNumber": this.state.mobileNo,
            "Amount": this.state.amount,
            "ExtraField1": ""
        }

        if (window.webkit) {
            window.webkit.messageHandlers.submitListener.postMessage({
                'url': url,
                'params': params,
                'showDetailsPage': false,
                'OperatorName': 'NTC Prepaid'
            });
        }
    }

    render() {
        return (
            <div className='container'>
                <form className='form'>

                    <TextField style={formStyles.input}
                        label='Mobile Number'
                        name='mobileNo'
                        value={this.state.mobileNo}
                        onChange={this.handleValueChange}
                    />

                    <TextField style={formStyles.input}
                        label='Amount'
                        name='amount'
                        value={this.state.amount}
                        onChange={this.handleValueChange}
                    />

                    <Button style={formStyles.button}
                        variant='contained'
                        onClick={this.submitData}>
                        Top Up Now
                    </Button>

                </form>
            </div>
        )
    }
}

export default Topup