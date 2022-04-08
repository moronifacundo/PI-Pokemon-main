import React, { Component } from 'react';
import './FiltersBar.css'
import NameFilter from '../NameFilter/NameFilter';
import TypeFilter from '../TypeFilter/TypeFilter';


class FiltersBar extends Component {

    render() {
        return (
            <div className="filtersBar">
                <ul>
                    <li>
                        <NameFilter />
                    </li>
                    <li>
                        <TypeFilter />
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