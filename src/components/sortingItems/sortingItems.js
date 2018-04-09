import React, { Component } from 'react';
import './sortingItems.css'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';



class sortingItems extends Component {
    state = {
        sortValues: [],
        price: '',
        brand: '',
        type: '',
        value: '',

    };

    componentWillMount() {
        this.setState({
            sortValues: this.props.sortvalues,
            price: '',
            brand: '',
            type: '',
            value: '',
        })
    }

    sortByPriceHandler = (event, index, value) => {
        this.props.sortVal(value, "price");
        this.setState({ price: value });
    }
    sortByBrandHandle = (event, index, value) => {
        this.props.sortVal(value, "brand");
        this.setState({ brand: value });
    }
    sortByTypeHandle = (event, index, value) => {
        this.props.sortVal(value, "type");
        this.setState({ type: value });
    }


    render() {
        let brandsNames;
        let itemsTypes;
        if (this.state.sortValues) {
            let values = this.state.sortValues
            brandsNames = _.map(values, 'brand');
            itemsTypes = _.map(values, 'type');
        }
        return (
            <div className="sorting-container" >
                <div className="fields">
                    <SelectField
                        style={ { width: '180px' } }
                        underlineStyle={ { color: 'black' } }
                        name="Sort"
                        hintText="Sort"
                        hintStyle={ { color: 'black' } }
                        value={ this.state.price }
                        onChange={ this.sortByPriceHandler }
                        selectedMenuItemStyle={ { fontWeight: 'bold', color: 'black' } }
                    >
                        <MenuItem value={ 'Price high to low' } label="Price high to low" primaryText="Price high to low" />
                        <MenuItem value={ "Price low to high" } label="Price low to high" primaryText="Price low to high" />

                    </SelectField>
                    <SelectField
                        style={ { width: '180px' } }
                        underlineStyle={ { color: 'black' } }
                        name="Brand"
                        hintText="Brand"
                        hintStyle={ { color: 'black' } }
                        value={ this.state.brand }
                        onChange={ this.sortByBrandHandle }
                        selectedMenuItemStyle={ { fontWeight: 'bold', color: 'black' } }
                    >
                        <MenuItem value={ "All" } label="All" primaryText="All" />
                        { this.state.sortValues ? _.uniq(brandsNames).map((item, i) => {
                            return <MenuItem key={ i } value={ item } label={ item } primaryText={ item } />
                        }) : null }

                    </SelectField>
                    <SelectField
                        style={ { width: '180px' } }
                        underlineStyle={ { color: 'black' } }
                        name="Type"
                        hintText="Type"
                        hintStyle={ { color: 'black' } }
                        onChange={ this.sortByTypeHandle }
                        selectedMenuItemStyle={ { fontWeight: 'bold', color: 'black' } }
                    >
                        <MenuItem value={ "All" } label="All" primaryText="All" />
                        { this.state.sortValues ? _.uniq(itemsTypes).map((item, i) => {
                            return <MenuItem key={ i } value={ item } label={ item } primaryText={ item } />
                        }) : null }

                    </SelectField>
                </div>
            </div>
        );
    }
}

export default sortingItems;