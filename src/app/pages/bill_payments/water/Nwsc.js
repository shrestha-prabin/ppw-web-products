import React, { Component } from 'react'
import { TextField, Button, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { formStyles } from '../../../configs/Styles'

export class Nwsc extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,

            detailsPage: false,
            customer_id: '',
            selected_office: '',
            officeList: [
                { OfficeCodes: "BNP", Office: "BANEPA" },
                { OfficeCodes: "BIN", Office: "POKHARA, BINDIYABASINI" },
                { OfficeCodes: "HEM", Office: "POKHARA, HEMJA" },
                { OfficeCodes: "POK", Office: "POKHARA, PARDI" }
            ]
        }
    }

    handleValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submitData = () => {

        this.setState({ isLoading: true })

        let url = 'GetNWSCBill'
        let params = {
            "CustomerId": this.state.customer_id,
            "OfficeCode": this.state.selected_office,
        }

        if (window.webkit) {
            window.webkit.messageHandlers.submitListener.postMessage({
                'url': url,
                'params': params,
                'OperatorName': 'NWSC',
                'showDetailsPage': true
            });
        }

    }

    showDetailsPage() {
        this.setState({
            detailsPage: true
        })

        return 'Success'
    }

    render() {

        if (this.state.detailsPage) {
            return <div>Details Page</div>
        }

        return (
            <div className='container'>
                <form className='form'>

                    <TextField style={formStyles.input}
                        label='Customer ID'
                        name='customer_id'
                        value={this.state.customer_id}
                        onChange={this.handleValueChange}
                    />


                    <FormControl  style={formStyles.input}>

                        <InputLabel>Counter</InputLabel>
                        <Select
                            name='selected_office'
                            label='Counter'
                            value={this.state.selected_office}
                            onChange={this.handleValueChange}
                        >
                            {
                                this.state.officeList.map(office => {
                                    return <MenuItem value={office.OfficeCodes}>{office.Office}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>

                    <Button style={formStyles.button}
                        variant='contained'
                        onClick={this.submitData}>
                        Proceed
                </Button>

                </form>
            </div>
        )
    }
}

export default Nwsc
