import React, { Component } from 'react';
import './FiltersBar.css'
import NameFilter from './NameFilter/NameFilter';
import TypeFilter from './TypeFilter/TypeFilter';
import SourceFilter from './SourceFilter/SourceFilter';
import Sorter from './Sorter/Sorter';


class FiltersBar extends Component {

    render() {
        return (
            <div className="filtersBar">

                <li>
                    <NameFilter />
                </li>
                <li>
                    <TypeFilter />
                </li>
                <li>
                    <SourceFilter />
                </li>
                <li>
                    <Sorter />
                </li>
            </div>
        );
    };
};

export default FiltersBar;