import React from 'react';
import { Link } from 'react-router-dom';

class SideBar extends React.Component {
    render() {
        return (
            <div>

                <ul class="nav flex-column">
                    <li class="nav-item">
                    <Link to='/'>Home</Link>
                    </li>
                    <li class="nav-item">
                    <Link to='/foo'>Reporte</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideBar;