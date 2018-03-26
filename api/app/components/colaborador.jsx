import React from 'react';

class Colaborador extends React.Component {
    render() {
        return (
            <div>
                {this.props.nombre}
            </div>
        );
    }
}

export default Colaborador;