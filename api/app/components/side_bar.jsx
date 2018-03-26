import React from 'react';
import {Redirect, Link} from 'react-router-dom';

class SideBar extends React.Component {
    render() {
        return (
            <div>
                <ul className='nav nav-pills nav-stacked'>
                    <li className='active'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/foo'>Reporte</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideBar;