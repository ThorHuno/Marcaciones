import React, { Component } from 'react';
import Loader from 'Loader';

const withLoading = () => (WrappedComponent) => {
    return class WithLoading extends React.Component {
        render() {
            return this.props.isFetchingData ? <Loader /> : <WrappedComponent {...this.props} />
        }
    }
}

export default withLoading;