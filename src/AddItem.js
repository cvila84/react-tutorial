import React from "react";
import { Title } from "./App.js";

export default class AddItem extends React.Component {

    constructor(props) {
        super(props);
        this.defaultFruit = "banana";
        this.defaultItem = {
            kind: this.defaultFruit,
            price: 0,
            origin: ""
        }
        this.state = this.defaultItem
    }

    addButtonPressed() {
        this.props.addItem(this.state);
        this.setState(this.defaultItem);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Title color="coral">{this.props.title ? this.props.title : "Add something"}</Title>
                </div>
                <div className="row">
                    <label htmlFor="select-kind">Kind:</label>
                    <select className="form-select" name="select-kind" id="object-kind" value={this.defaultFruit} onChange={(event) => this.setState({ kind: event.target.value })}>
                        <option value="apple">🍏🍏🍏</option>
                        <option value="banana">🍌🍌🍌</option>
                        <option value="peach">🍑🍑🍑</option>
                        <option value="strawberry">🍓🍓🍓</option>
                    </select>
                    <label className="form-label" htmlFor="price-field">Price:</label>
                    <input className="form-control" id="price-field" type="number" value={this.state.price} onChange={event => this.setState({ price: +event.target.value})}/>
                    <label className="form-label" htmlFor="origin-field">Origin:</label>
                    <input className="form-control" id="origin-field" type="text" value={this.state.origin} onChange={event => this.setState({ origin: event.target.value})}/>
                </div>
                <br/>
                <div className="row">
                    <div className="col-4"/>
                    <button className="col-4 btn btn-primary" onClick={(event) => this.addButtonPressed()}>Add {this.state.kind}</button>
                </div>
            </div>
        )
    }
}
