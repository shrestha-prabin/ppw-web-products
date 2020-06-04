import React, { Component } from 'react'
import { TextField, Button, Container, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { formStyles } from '../../../configs/Styles'
import axios from 'axios'
import Colors from '../../../configs/Colors';


export class Topup extends Component {

    interval = null

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,

            mobileNo: '',
            amount: '',

            paymentType: 'topup',
            packages: [],
            selected_package_code: '',
            selected_package: {},

            operatorName: null,
            operatorCode: -1
        }
    }

    componentDidMount() {

        this.requestFormMetadata()
    }

    requestFormMetadata() {

        if (window.webkit) {
            window.webkit.messageHandlers.apiRequestListener.postMessage({
                'url': 'GetProductPackage',
                'params': {
                    'OperatorCode': 77
                }
            });
        }
        var metadata = null
        this.interval = setInterval(() => {
            metadata = document.getElementById('json-data-container').value
            console.log(metadata);

            if (metadata && metadata != '') {
                try {
                    let json = JSON.parse(metadata)
                    clearInterval(this.interval)

                    this.setState({
                        packages: json.Packages || []
                    })

                } catch (err) {
                    console.log('Cannot parse JSON');
                }
            }
        }, 500);

    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    handleValueChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        var { operatorCode, operatorName } = this.state

        if (name == 'mobileNo') {
            if (value.length > 10) return

            if (value.length > 2) {
                switch (value.slice(0, 3)) {
                    case '984':
                    case '986':
                        operatorName = 'NT Prepaid'
                        operatorCode = 1
                        break;
                    case '985':
                        operatorName = 'NT Postpaid'
                        operatorCode = 14
                        break;
                    case '974':
                    case '976':
                        operatorName = 'NT CDMA Prepaid'
                        operatorCode = 9
                        break;
                    case '975':
                        operatorName = 'NT CDMA Postpaid'
                        operatorCode = 10
                        break;
                    case '980':
                    case '981':
                    case '982':
                        operatorName = 'Ncell'
                        operatorCode = 2
                        break;
                    case '972':
                        operatorName = 'United Telecom (UTL) Mobile'
                        operatorCode = 3
                        break;
                    case '961':
                    case '988':
                        operatorName = 'Smart Cell (STPL) Topup'
                        operatorCode = 4
                        break;
                    default:
                        operatorName = 'Invalid Number'
                        operatorCode = -1
                }
            } else {
                operatorName = null
                operatorCode = -1
            }
        }

        this.setState({
            [name]: value, operatorName, operatorCode
        })
    }

    handlePackageSelection = (e) => {
        let { selected_package, selected_package_code } = this.state
        selected_package_code = e.target.value

        for (const item of this.state.packages) {
            if (item.Code == selected_package_code) {
                selected_package = item
            }
        }

        this.setState({ selected_package, selected_package_code, amount: selected_package.Amount })
    }



    submitData = () => {

        if (!this.state.mobileNo || !this.state.amount) {
            return
        }

        // axios.post('http://202.51.95.56:36001/x/Token/RequestTokenForCustomer', {
        //     'Username': this.state.mobileNo,
        //     'Password': this.state.amount
        // }, {
        //     headers: {
        //         'content-type':'application/json'
        //     }
        // }).then(res=>{
        //     console.log(res);

        // }).catch(err=>{
        //     console.log(err);

        // })

        this.setState({ isLoading: true })

        if (window.webkit) {

            let url = 'MobileTopup'
            let params = {
                "UserName": "",
                "Password": "",
                "OperatorCode": this.state.operatorCode,
                "MobileNumber": this.state.mobileNo,
                "Amount": this.state.amount,
                "ExtraField1": ""
            }

            if (this.state.paymentType == 'package' && this.state.operatorName == 'Ncell') {
                params['OperatorCode'] = 77
                params['Amount'] = this.state.selected_package.Amount + ''
                params['ExtraField1'] = this.state.selected_package_code
            }

            let postMessage = {
                'url': url,
                'params': params,
                'showDetailsPage': false,
                'OperatorName': this.state.operatorName
            }
            window.webkit.messageHandlers.submitListener.postMessage(postMessage);
        } else if (window.android) {

            let url = 'MobileTopUp'

            let params = {
                "operatorId": 1,
                "amount": this.state.amount,
                "customerId": "",
                "topUpNumber": this.state.mobileNo,
                "planId": "",
                "planName": "",
                "planDesc": "",
                "planValidity": "",
            }

            let postMessage = {
                'url': url,
                'params': params,
                'showDetailsPage': false,
                'OperatorName': this.state.operatorName
            }
            window.android.submitForm(JSON.stringify(postMessage))
        }
    }

    renderSelectedPackageInfo() {
        let { selected_package, amount } = this.state
        return <div>
            <p style={{fontSize: 14, color: '#777777'}}>{selected_package.Description}</p>

            {
                amount
                    ? <div style={{ fontSize: 20, fontWeight: 'bold', color: Colors.primary }}>
                        Rs.{amount}
                    </div>
                    : null
            }

        </div>
    }

    handlePaymentTypeToggle = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
            amount: null,
            selected_package: {},
            selected_package_code: -1
        })
    }

    render() {
        return (
            <Container maxWidth='sm'>
                <input id='json-data-container'  type='hidden'/>
                <form className='form'>

                    <TextField style={formStyles.input}
                        label='Mobile Number'
                        name='mobileNo'
                        value={this.state.mobileNo}
                        onChange={this.handleValueChange}
                    />

                    <div>{this.state.operatorName}</div>

                    {
                        this.state.operatorName == 'Ncell' && this.state.packages.length > 0
                            ? <div style={formStyles.input}>
                                <RadioGroup row name='paymentType' value={this.state.paymentType} onChange={this.handlePaymentTypeToggle}>
                                    <FormControlLabel value='topup' control={<Radio />} label='Topup Amount' />
                                    <FormControlLabel value="package" control={<Radio />} label='Select Package' />
                                </RadioGroup>
                            </div>
                            : null
                    }
                    {
                        this.state.paymentType == 'topup'
                            ? <TextField style={formStyles.input}
                                label='Amount'
                                name='amount'
                                value={this.state.amount}
                                onChange={this.handleValueChange}
                            />
                            : <div>

                                <FormControl style={formStyles.input}>

                                    <InputLabel>Select a Package</InputLabel>
                                    <Select
                                        name='selected_package_code'
                                        label='Select a Package'
                                        value={this.state.selected_package_code}
                                        onChange={this.handlePackageSelection}
                                    >
                                        {
                                            this.state.packages.map(item => {
                                                return <MenuItem value={item.Code}>{item.Name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                { this.renderSelectedPackageInfo() }
                            </div>
                    }

                    <Button style={formStyles.button}
                        variant='contained'
                        onClick={this.submitData}>
                        {
                            this.state.paymentType == 'topup'
                            ? 'Top up Now'
                            : 'Purchase Package'
                        }
                    </Button>
                </form>
            </Container>
        )
    }
}

export default Topup