import React, { Component } from 'react'
import Topup from './bill_payments/topup/Topup';
import Nwsc from './bill_payments/water/Nwsc';

export class Form extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             opCode: props.match.params.opCode
        }
        
    }

    componentDidUpdate(oldProps) {
        if (oldProps.match.params.opCode !== this.props.match.params.opCode) {
            this.setState({
                opCode: this.props.match.params.opCode
            })
        }
    }

    renderForm() {
        switch (this.state.opCode) {
            case "1":
                return <Topup />
            case "2":
                return <Nwsc />
                
            default:
                break;
        }
    }
    
    
    render() {
        return (
            <div className='form-page'>
                {this.renderForm()}
            </div>
        )
    }
}

export default Form
