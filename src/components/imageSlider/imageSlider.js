import React, { Component } from 'react';
import Slider from 'react-slick'
import IconButton from 'material-ui/IconButton';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
import ProductInfo from '../../containers/Main/ProductInfo/ProductInfo';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import './imageSlider.css'

function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
        <div className={ className }>
            <IconButton onClick={ onClick } iconClassName="material-icons" iconStyle={ { color: 'black' } } >
                navigate_next
            </IconButton>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
        <div className={ className }>
            <IconButton onClick={ onClick } iconClassName="material-icons" iconStyle={ { color: 'black' } } >
                navigate_before
            </IconButton>
        </div>
    );
}


class SliderCarusel extends Component {
    state = {
        productsFirst: [],
        productsSecond: [],
        loading: true,
        mediaQuery: false,
    }
    componentWillMount() {
        const mediaQuery = window.matchMedia('(max-width: 768px)');

        if (mediaQuery.matches) {
            this.setState({
                mediaQuery: mediaQuery.matches,
            });
        }
        axios({
            method: 'get',
            url: 'https://enigmatic-refuge-63110.herokuapp.com/carousel'
        }).then(response => {
            let chnkeArr = _.chunk(response.data, 4);

            this.setState({
                productsFirst: chnkeArr[0],
                productsSecond: chnkeArr[1],
                loading: false,
            });
        });
    }

    render() {
        let settings = {
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };

        let productsFirst;
        let productsSecond;
        if (!this.state.loading) {
            productsFirst = [...this.state.productsFirst].map((product, i) => {
                return (
                    <Link
                        className="product-carousel link"
                        key={ i }
                        to={ {
                            pathname: `${this.props.match.url}/Clothing/${
                                product.brand
                                }${i}`,
                            state: { productID: product._id, type: 'sale', productType: product.type }
                        } }
                    >
                        <div >
                            <img src={ product.image } />
                            <p>{ product.brand.toUpperCase() }</p>
                        </div>
                    </Link>
                )
            })
            productsSecond = [...this.state.productsSecond].map((product, i) => {
                return (
                    <Link
                        className="product-carousel link"
                        key={ i }
                        to={ {
                            pathname: `${this.props.match.url}/Clothing/${
                                product.brand
                                }${i}`,
                            state: { productID: product._id, type: 'sale', productType: product.type }
                        } }
                    >
                        <div>
                            <img src={ product.image } />
                            <p>{ product.brand }</p>
                        </div>
                    </Link>
                )
            })

        }
        return (
            <div>
                <div className="carusel-container">
                    <div className="carusel">
                        <Slider { ...settings }>
                            <div style={ { display: 'flex' } }>
                                { productsFirst }
                            </div>
                            <div style={ { display: 'flex' } } >
                                { productsSecond }
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SliderCarusel);


