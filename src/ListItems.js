import React from "react";
import { Title } from "./App.js";

export default class ListItems extends React.Component {

    constructor(props) {
        super(props);
//        this.state =
    }

    showItem(item) {
        return (
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.kind}</td>
                <td>{item.price}</td>
                <td>{item.origin}</td>
                <td>
                    <button className="btn btn-danger" onClick={(event) => this.deleteButtonPressed(item)}>Delete</button>
                </td>
            </tr>
        )
    }

    deleteButtonPressed(item) {
        this.props.deleteItem(item);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Title color="coral">{this.props.title ? this.props.title : "List of items"}</Title>
                </div>
                <div className="row">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Kind</th>
                            <th scope="col">Price</th>
                            <th scope="col">Origin</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.props.items.map((item) => this.showItem(item)) }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
