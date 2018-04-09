import React, { Component } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Clear from 'material-ui/svg-icons/content/clear';
import Edit from 'material-ui/svg-icons/image/edit';
import Done from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import './Table.css'

class table extends Component {

    state = {
        products: [],
        editable: false,
        numberOfItems: 0,
        loading: true,
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://enigmatic-refuge-63110.herokuapp.com/allProducts'
        }).then(response => {
            let counter = (response.data).length
            this.setState({
                products: response.data,
                numberOfItems: counter,
                loading: false,
            });
        });
    }
    deleteAndEditRowHandler = (row, cell) => {
        if (cell === 5) {
            let rowArr = this.state.products;
            rowArr.splice(row, 1)
            this.setState({
                products: rowArr,
                editable: false,
            })
        } else if (cell === 6) {
            if (this.state.editable) {
                this.setState({
                    editable: false,
                })
            } else {
                this.setState({
                    editable: row + 1,
                })
            }

        }
    }

    editHandler = (event, value) => {
        let edited = this.state.products;
        let row = this.state.editable - 1;
        let type = event.target.name;
        if (type === 'price' || type === 'discount') {
            if (isNaN(value)) {
                return
            }
        }
        edited[row][type] = value;
        this.setState({
            products: edited,
        })
    }


    render() {
        let editRow;
        let rows;
        const styles = {
            underlineStyle: {
                borderColor: '#3F7FEB',
            },
        }
        if (this.state.products) {
            rows = (this.state.products).map((product, i) => {
                return (
                    <TableRow key={ i } >
                        <TableRowColumn>{ i += 1 }</TableRowColumn>
                        <TableRowColumn>
                            { this.state.editable === i ?
                                <TextField
                                    underlineFocusStyle={ styles.underlineStyle }
                                    name='brand'
                                    defaultValue={ (product.brand) }
                                    onChange={ this.editHandler.bind(this) }
                                />
                                :
                                product.brand }
                        </TableRowColumn>
                        <TableRowColumn>
                            { this.state.editable === i ? <TextField
                                name='type'
                                underlineFocusStyle={ styles.underlineStyle }
                                defaultValue={ (product.type) }
                                onChange={ this.editHandler.bind(this) }
                            /> : (product.type).toUpperCase() }
                        </TableRowColumn>
                        <TableRowColumn style={ { fontWeight: 700 } }>
                            { this.state.editable === i ? <TextField
                                name='price'
                                underlineFocusStyle={ styles.underlineStyle }
                                defaultValue={ (product.price) }
                                onChange={ this.editHandler.bind(this) }
                            /> : product.price + '$' }
                        </TableRowColumn>
                        <TableRowColumn style={ { fontWeight: 700 } }>
                            { this.state.editable === i ? <TextField
                                name='discount'
                                underlineFocusStyle={ styles.underlineStyle }
                                defaultValue={ (product.discount) }
                                onChange={ this.editHandler.bind(this) }
                            /> : product.discount + '$' }
                        </TableRowColumn>
                        <TableRowColumn style={ { width: '24px', } }  >
                            <Clear style={ { width: '15px', } } />
                        </TableRowColumn>
                        <TableRowColumn style={ { width: '24px', } } >
                            { this.state.editable && this.state.editable === i ? <Done style={ { width: '15px' } } /> : <Edit style={ { width: '15px' } } /> }
                        </TableRowColumn>
                    </TableRow>

                )
            })
        }

        const style = {
            maxWidth: '800px',
            marginTop: '40px',
            overflowX: 'auto',

        }
        const headerStyle = {
            color: '#880E4F',
            width: '20px'
        }

        return (
            <div className={ this.props.sideBar ? "table-container-sideBarOpen" : "table-container" }>
                { this.state.loading ? <CircularProgress color={ '#607d8b' } className="spinner" size={ 80 } thickness={ 5 } /> :
                    <Table className="table" multiSelectable={ true } onCellClick={ this.deleteAndEditRowHandler } fixedHeader={ true }
                    >
                        <TableHeader style={ { background: ' linear-gradient(60deg,#3F7FEB,#448AFF)', border: 'none' } } displaySelectAll={ false }>
                            <TableRow >
                                <TableHeaderColumn style={ { color: 'white' } }>ID</TableHeaderColumn>
                                <TableHeaderColumn style={ { color: 'white' } }>Brand</TableHeaderColumn>
                                <TableHeaderColumn style={ { color: 'white' } }>Type</TableHeaderColumn>
                                <TableHeaderColumn style={ { color: 'white' } }>Price</TableHeaderColumn>
                                <TableHeaderColumn style={ { color: 'white' } }>Discount</TableHeaderColumn>
                                <TableHeaderColumn style={ { color: 'white', width: '24px' } }></TableHeaderColumn>
                                <TableHeaderColumn style={ { color: 'white', width: '24px' } }></TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="table" >
                            { rows }
                        </TableBody>
                    </Table> }
            </div >
        );
    }
}

export default table;
