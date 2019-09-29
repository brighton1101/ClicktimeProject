import React from 'react';
import Cart from './Cart';
import Item from './Item';
import '../styles/Main.css';
const api_calls = require('../api_calls/api_calls.js');


export default class Main extends React.Component {
    constructor(props) {
        super();
        this.state = {
            items: null,
            cart: {},
            view_cart: false,
            total_dvd: 0,
            total_br: 0
        };
        this.pull_data();
    }

    pull_data = async () => {
        let items = JSON.parse(await api_calls.get_data());
        let images = JSON.parse(await api_calls.get_images());
        let num_dvd = 0;
        let num_br = 0;
        let formatted_items = items.movie_choices.map((curr_item) => {
            curr_item.format_options.map((option) => {
                if (option.type === "DVD") {
                    num_dvd += 1;
                }
                else if (option.type === "Blu-Ray") {
                    num_br += 1;
                }
            })
            return {
                title: curr_item.title,
                media_options: curr_item.format_options,
                image: images[curr_item.title]
            };
        });
        this.setState({
            items: formatted_items,
            total_dvd: num_dvd,
            total_br: num_br
        });
    };

    toggle_cart = () => {
        this.setState({
            view_cart: !this.state.view_cart
        });
    };

    add_cart = (item_name, option, option_price, option_quantity=1) => {
        let curr_cart = this.state.cart;
        if (curr_cart.hasOwnProperty(item_name)) {
            if (curr_cart[item_name].hasOwnProperty(option)) {
                curr_cart[item_name][option]['option_quantity'] += option_quantity;
            }
            else {
                curr_cart[item_name][option] = {
                    'option_price': option_price,
                    'option_quantity': option_quantity
                };
            }
        }
        else {
            let option_object = {};
            option_object[option] = {
                'option_price': option_price,
                'option_quantity': option_quantity
            }
            curr_cart[item_name] = option_object;
        }
        this.setState({
            cart: curr_cart
        });
    };

    update_item = (item_name, option, quantity) => {
        if (quantity == 0) {
            this.remove_item(item_name, option);
            return;
        }
        let curr_cart = this.state.cart;
        curr_cart[item_name][option]['option_quantity'] = quantity;
        this.setState({
            cart: curr_cart
        });
    }

    remove_item = (item_name, option) => {
        let curr_cart = this.state.cart;
        delete curr_cart[item_name][option];
        this.setState({
            cart: curr_cart
        });
    };

    get_dvd_br_discounts = (total_br, total_dvd, total_price, total_quantity) => {
        let discounts = [];
        if (total_dvd === this.state.total_dvd) {
            total_price -= total_dvd*20*0.10;
            discounts.push(
                <div>
                    <p>You saved ${(total_dvd*20*0.10).toFixed(2)} on DVD items!</p>
                </div>
            )
        }
        if (total_br === this.state.total_br) {
            total_price -= total_br*25*0.15;
            discounts.push(
                <div>
                    <p>You saved ${(total_br*25*0.15).toFixed(2)} on Blu-Ray items!</p>
                </div>
            )
        }
        if (total_quantity >= 100) {
            total_price = total_price*0.95;
            discounts.push(
                <div>
                    <p>You saved ${(total_price*0.05).toFixed(2)} on your total cart!</p>
                </div>
            );
        }
        return {
            discounts: discounts,
            total_price: total_price
        };
    }

    render() {
        let items = [];
        if (this.state.view_cart) {
            let total_dvd = 0;
            let total_br = 0;
            let total_quantity = 0;
            let total_price = 0;
            let curr_movies = Object.keys(this.state.cart);
            curr_movies.map((movie) => {
                let curr_options = Object.keys(this.state.cart[movie]);
                curr_options.map((option) => {
                    let input_id = movie + option;
                    if (option === "Blu-Ray") {
                        total_br += 1;
                    }
                    else if (option === "DVD") {
                        total_dvd += 1;
                    }
                    total_price += this.state.cart[movie][option]['option_price']*this.state.cart[movie][option]['option_quantity'];
                    total_quantity += this.state.cart[movie][option]['option_quantity'];
                    items.push(
                        <div>
                            <inline>
                                <p>{movie}, {option}</p>
                            </inline>
                            <inline>
                                <p>Quantity: {this.state.cart[movie][option]['option_quantity']}</p>
                            </inline>
                            <inline>
                                <p>Price per: {this.state.cart[movie][option]['option_price']}</p>
                            </inline>
                            <inline>
                                <p>Total price: {this.state.cart[movie][option]['option_price']*this.state.cart[movie][option]['option_quantity']}</p>
                            </inline>
                            <inline>
                                <label>
                                Update Quantity:
                                <input type="text" name="update_quantity" id={input_id}/>
                                </label>
                                <button onClick={() => {this.update_item(movie, option, document.getElementById(input_id).value)}}>Update</button>
                            </inline>
                        </div>
                    );
                });
            });
            let discount_info = this.get_dvd_br_discounts(total_br, total_dvd, total_price, total_quantity);
            total_price = discount_info.total_price;
            let discounts = discount_info.discounts;
            return (
                <div id="mainContainer">
                    <button onClick={this.toggle_cart}>Hide Cart</button>
                    {items}
                    {discounts}
                    <p>Total: ${total_price.toFixed(2)}</p>
                </div>
            )
        };
        if (this.state.items) {
            items = this.state.items.map((item) => {
                return (
                    <div>
                        <Item
                            itemName={item.title}
                            key={item.title}
                            options={item.media_options}
                            imageSrc={item.image}
                            addCart={this.add_cart}
                        ></Item>
                    </div>
                );
            });
        }
        return (
            <div id="mainContainer">
            <button onClick={this.toggle_cart}>View Cart</button>
                {items}
            </div>
        );
    }
}