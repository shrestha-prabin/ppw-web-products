import React, { Component } from 'react'
import { Card, CardContent, TextField, Button, Container, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { formStyles } from '../../../../configs/Styles';
import Colors from '../../../../configs/Colors';
import BlockButton from '../../../../components/Button'
import FormInputView, { INPUT_TYPE } from '../../../../components/FormInputView';


export class NwscDetails extends Component {

    constructor(props) {
        super(props)

        this.state = {
            detailsData: {},
            amount: '',
            billDetailsVisible: false
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

    handleValueChange = (name, value) => {
        this.setState({
            [name]: value
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
                    <div style={{ fontSize: 14 }}>{item.value}</div>
                </div>
            </div>
        })
    }

    renderBillDetails() {
        let { detailsData } = this.state
        let billDetails = [
            {
                'BillFrom': "Jan",
                'BillTo': "Feb",
                'BillAmount': 100,
                'FineAmount': 20,
                'MeterRent': 50,
                'DiscountAmount': 5,
                'PayableAmount': 90,
            },
            {
                'BillFrom': "Jan",
                'BillTo': "Feb",
                'BillAmount': 100,
                'FineAmount': 20,
                'MeterRent': 50,
                'DiscountAmount': 5,
                'PayableAmount': 90,
            },
            {
                'BillFrom': "Jan",
                'BillTo': "Feb",
                'BillAmount': 100,
                'FineAmount': 20,
                'MeterRent': 50,
                'DiscountAmount': 5,
                'PayableAmount': 90,
            },
        ]

        return billDetails.map((item, i) => {
            return <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
                    {item.BillFrom}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ backgroundColor: Colors.background, flexDirection: 'column' }}>
                    {
                        [
                            { 'name': 'Bill Amount', 'value': item.BillAmount },
                            { 'name': 'Fine Amount', 'value': item.FineAmount },
                            { 'name': 'Meter Rent', 'value': item.MeterRent },
                            { 'name': 'Discount Amount', 'value': item.DiscountAmount },
                            { 'name': 'Payable Amount', 'value': item.PayableAmount },
                        ].map(item2 => {
                            return <Grid container justify='space-between'>
                                <div item style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>{item2.name}</div>
                                <div style={{ fontSize: 14 }}>{item2.value}</div>
                            </Grid>
                        })
                    }

                </ExpansionPanelDetails>
            </ExpansionPanel>
        })

    }

    toggleBillDetailsVisiblity = () => {
        this.setState({ billDetailsVisible: !this.state.billDetailsVisible })
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
        if (window.webkit) {
            window.webkit.messageHandlers.cancelListener.postMessage('')
        }
    }

    render() {
        return (
            <Container maxWidth='sm'>

                <input id='details-data-container' type='hidden' />

                <Card>
                    <CardContent>
                        {this.renderDetails()}
                    </CardContent>
                </Card>

                <br />

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size='small' style={{ fontSize: 11, fontWeight: 'bold', color: Colors.primary }} onClick={this.toggleBillDetailsVisiblity}>
                        {this.state.billDetailsVisible ? 'Hide Bill Details' : 'Show Bill Details'}
                    </Button>
                </div>

                {
                    this.state.billDetailsVisible
                        ? <div style={{ marginTop: 8 }}>
                            {this.renderBillDetails()}
                        </div>
                        : null
                }
                <br />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <FormInputView style={formStyles.input}
                        label='Amount'
                        name='amount'
                        value={this.state.amount}
                        inputType={INPUT_TYPE.number}
                        minValue={100}
                        maxValue={10000}
                        onChange={this.handleValueChange}
                    />

                    <br />

                    <BlockButton style={formStyles.button} onClick={this.handleSubmit}>
                        Pay Now
                    </BlockButton>

                    <Button style={{ marginTop: 16, height: 48 }} onClick={this.handleCancel}>
                        Cancel
                    </Button>

                </div>
            </Container>
        )
    }
}

export default NwscDetails
