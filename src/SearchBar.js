import React from "react";
import { Title } from "./App.js";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kind: "",
            maxPrice: 0,
            origin: ""
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                    </div>
                </div>
                <div className="row">
                    <Title color="coral">{this.props.title ? this.props.title : "Search for something"}</Title>
                </div>
                <div className="row">
                    <div className="col">
                        <label className="form-label" htmlFor="kind-field">Kind:</label>
                        <input className="form-control" id="kind-field" type="text" value={this.state.kind} onChange={event => this.setState({ kind: event.target.value})}/>
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="price-field">Max Price:</label>
                        <input className="form-control" id="price-field" type="number" value={this.state.maxPrice} onChange={event => this.setState({ maxPrice: +event.target.value})}/>
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="origin-field">Origin:</label>
                        <input className="form-control" id="origin-field" type="text" value={this.state.origin} onChange={event => this.setState({ origin: event.target.value})}/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-4"/>
                    <button className="col-4 btn btn-primary" onClick={(event) => this.props.callback(this.state)}>Search</button>
                </div>
            </div>
        )
    }
}
