import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
    collaborator: PropTypes.object.isRequired
}

export default class Colaborador extends React.Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.collaborator.firstName}
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