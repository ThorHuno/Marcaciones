import React from 'react';
import Colaborador from 'colaborador';

class Colaboradores extends React.Component {
    render() {

        return (
            <div>
                {this
                    .props
                    .items
                    .map((element, index) => {
                        console.log(element, index);
                        return <Colaborador key={index} nombre={element}/>
                    })
}
            </div>
        );
    }
}

export default Colaboradores;