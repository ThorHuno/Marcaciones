import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from 'SideBar';
import Collaborators from 'Collaborators';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import openSocket from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        // const SOCKET = openSocket('/');
        this.state = {
            collaborators: [],
            isFetchingData: true
        };

        $.get({ url: '/api/collaborator', headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidU5hbWUiOiJhdG9ydW5vIiwiaWF0IjoxNTM1MzE3NzM5LCJleHAiOjE1MzU0MDQxMzl9.a6KiBkBo5irmfW0GkuOpyLoT0l5GJ5Cg5lwKofRSIo8' } }, response => {
            this.setState({
                collaborators: [
                    ...this.state.collaborators,
                    ...response.data
                ],
                isFetchingData: false
            });
        }).fail(err => {
            if (err.status === 401)
                window.location.replace('/auth/login');
        });

        // SOCKET.on('nuevoColaborador', (colaborador) => {
        //     this.setState({
        //         colaboradores: [
        //             ...this.state.colaboradores,
        //             colaborador
        //         ]
        //     });
        // });
    }
    render() {
        return (
            <div
                className='container'
                style={{
                    padding: '10px 0'
                }}>
                <div className="row">
                    <div className='col-lg-2'>
                        <SideBar />
                    </div>
                    <div className='col-lg-10'>
                        <Switch>
                            <Route
                                exact
                                path='/panel'
                                render={() => < Collaborators isFetchingData={this.state.isFetchingData} items={
                                    this.state.collaborators
                                } />} />
                            <Route path='/foo' />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('app'));