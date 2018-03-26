import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from 'side_bar';
import Colaboradores from 'colaboradores';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';
import openSocket from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        const SOCKET = openSocket('/');
        this.state = {
            colaboradores: []
        };

        $.get('/api/colaboradores', response => {
            this.setState({
                colaboradores: [
                    ...this.state.colaboradores,
                    ...response
                ]
            });
        }).fail(err => {
            console.log(err);
        });

        SOCKET.on('nuevoColaborador', (colaborador) => {
            this.setState({
                colaboradores: [
                    ...this.state.colaboradores,
                    colaborador
                ]
            });
        });
    }
    render() {
        return (
            <div
                className='row-fluid'
                style={{
                padding: '10px 0'
            }}>
                <div className='col-lg-2'>
                    <SideBar/>
                </div>
                <div className='col-lg-10'>
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() =>< Colaboradores items = {
                            this.state.colaboradores
                        } />}/>
                        <Route path='/foo'/>
                    </Switch>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
    <App/>
</BrowserRouter>, document.getElementById('app'));