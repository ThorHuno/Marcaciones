import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
    collaborator: PropTypes.object.isRequired
}

export default class Colaborador extends React.Component {
    constructor(props) {
        super(props);
    }

    get fullName() {
        return `${this.props.collaborator.firstName} ${this.props.collaborator.secondName || ''} ${this.props.collaborator.surName} ${this.props.collaborator.secondSurName || ''}`;
    }
    
    render() {
        return (
            <tr>
                <td>
                    {this.fullName}
                </td>
                <td>
                    <span style={{ fontSize: '18px' }}>
                        <a href={`mailto:${this.props.collaborator.email}`}>
                            {this.props.collaborator.email}
                        </a>
                    </span>
                </td>
                <td>
                    <Link className="btn btn-outline-primary btn-sm" to={`collaborator/${this.props.collaborator.id}`}>Editar</Link>
                </td>
            </tr>
        );
    }
}

Colaborador.propTypes = propTypes;