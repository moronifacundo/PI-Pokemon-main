import React, { Component } from 'react';
import './FiltersBar.css'
import NameFilter from '../NameFilter/NameFilter';


class FiltersBar extends Component {

    render() {
        return (
            <div className="filtersBar">
                <ul>
                    <li>
                        <NameFilter/>
                    </li>
                    <li>
                       otro
                    </li>
                    <li>
                        otro mas
                    </li>
                  
                </ul>
            </div>
        );
    };
};

export default FiltersBar;