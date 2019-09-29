import React from 'react';

export default class Item extends React.Component {
    buy_item = (option, option_price) => {
        this.props.addCart(this.props.itemName, option, option_price);
    };
    inline_style = {
        display: 'inline',
        marginRight: '1rem'
    }
    float_style = {
        float: 'right'
    }
    inner_wrapper_style = {
        overflow: 'auto'
    }
    render() {
        let purchase_options = this.props.options.map((option) => {
            return (
                <div style={this.inner_wrapper_style}>
                    <inline>
                    <p style={this.inline_style}>{option.type}</p>
                    </inline>
                    <inline>
                    <p style={this.inline_style}>{option.price}</p>
                    </inline>
                    <button type="button" onClick={() => {this.buy_item(option.type, option.price)}}>Buy</button>
                </div>
            );
        });
        return (
            <div>
                <img src={this.props.imageSrc} alt={this.props.itemName}></img>
                <p>Movie Title:</p>
                <p>{this.props.itemName}</p>
                <p>Purchase Options:</p>
                <p>{purchase_options}</p>
            </div>
        );
    }
}