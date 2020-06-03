import React, { Component } from 'react'
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import { formStyles } from '../../../../configs/Styles';

export class NwscDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            detailsData: {},
            amount: ''
        }
    }


    componentDidMount() {
        // componentDidMount -> JS Injection (from App) -> Get Injected Data

        setTimeout(() => {
            this.setState({
                detailsData: JSON.parse(document.getElementById('details-data-container').value)
            })
        }, 100);

    }

    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderDetails() {
        let { detailsData } = this.state
        let displayData = [
            { 'name': 'Customer Id', 'value': detailsData.CustomerId },
            { 'name': 'Customer Name', 'value': detailsData.CustomerName },
            { 'name': 'Office', 'value': detailsData.Office },
            { 'name': 'Total Service Charge (NPR)', 'value': detailsData.TotalServiceCharge },
            { 'name': 'TotalDueAmount (NPR)', 'value': detailsData.TotalDueAmount }
        ]

        return displayData.map((item, i) => {
            return <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <div style={{ fontWeight: 'bold', fontSize: 14 }}>{item.name}</div>
                    <div style={{ fontSize: 14}}>{item.value}</div>
                </div>
            </div>
        })
    }

    handleSubmit = () => {
        let { detailsData } = this.state

        if (window.webkit) {

            let url = 'BillPayment'
            let params = {
                "UserName": "",
                "Password": "",
                "OperatorCode": "40",
                "Subscriber": detailsData.CustomerId,
                "Amount": this.state.amount,
                "ExtraField1": detailsData.OfficeCode,
                "ExtraField2": detailsData.TotalServiceCharge,
                "ExtraField3": "",
                "ExtraField4": ""
            }

            let postMessage = {
                'url': url,
                'params': params,
                'showDetailsPage': false,
                'OperatorName': 'NWSC'
            }
            window.webkit.messageHandlers.submitListener.postMessage(postMessage);
        }
    }

    handleCancel() {

    }

    render() {
        return (
            <div>
                <input id='details-data-container' type='hidden' />

                <Card>
                    <CardContent>
                        {this.renderDetails()}
                    </CardContent>
                </Card>

                <br />

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size='small' color='secondary'>Show Bill Details</Button>
                </div>

                <br />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField style={formStyles.input}
                        label='Amount'
                        name='amount'
                        value={this.state.amount}
                        onChange={this.handleValueChange}
                    />

                    <br />

                    <Button style={formStyles.button} variant='contained' onClick={this.handleSubmit}>
                        Pay Now
                    </Button>

                    <Button style={{ marginTop: 16 }} onClick={this.handleCancel}>
                        Cancel
                    </Button>

                </div>

            </div>
        )
    }
}

export default NwscDetails
