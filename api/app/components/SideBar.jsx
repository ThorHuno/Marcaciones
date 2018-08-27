import React from 'react';
import { Link } from 'react-router-dom';

class SideBar extends React.Component {
    render() {
        return (
            <div>

                <ul className="nav flex-column">
                    <li className="nav-item">
                    <Link to='/'>Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/foo'>Reporte</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideBar;