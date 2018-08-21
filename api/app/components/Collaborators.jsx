import React from 'react';
import PropTypes from 'prop-types';
import Colaborador from 'colaborador';
import WithLoading from 'WithLoading';

const propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
}

class Collaborators extends React.Component {
    render() {

        return (
            <table className="table table-hover table-sm">
                <tbody>
                    {this
                        .props
                        .items
                        .map(element => {
                            return <Colaborador key={element.id} collaborator={element} />
                        })
                    }
                </tbody>
            </table>
        );
    }
}

Collaborators.propTypes = propTypes;

export default WithLoading()(Collaborators);