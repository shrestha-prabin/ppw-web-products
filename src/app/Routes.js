import React, {Component} from 'react'
import { Route } from 'react-router-dom';
import Form from './pages/Form'
import DetailsPage from './pages/DetailsPage'
import ComponentsTest from './pages/ComponentsTest';

class Routes extends Component {

    render() {
        return (
            <div>
                <Route exact path='/' />

                <Route key='form' path='/:opCode' component={Form} />
                <Route key='details' path='/details/:opCode' component={DetailsPage} />

                <Route key='test' path='/test' component={ComponentsTest} />
                
            </div>
        )
    }
}

export default Routes