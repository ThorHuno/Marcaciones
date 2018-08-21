import React, { Component } from 'react';

import '../loader/loader.css'

export default class Loader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    }
}