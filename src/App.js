import './App.css';
import React from "react";
import AddItem from "./AddItem"
import SearchBar from "./SearchBar"
import ListItems from "./ListItems";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

const MainTitle = styled.h2`
color: ${(props) => props.color ? props.color : "black"};
`

export const Title = styled.h3`
color: ${(props) => props.color ? props.color : "black"};
`

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filters : {},
            items : []
        }
    }

    componentDidMount() {
        console.log("componentDidMount()");
        fetch("http://localhost:3000/items").then((response) => response.json()).then((data) => this.setState({items: data}));
    }

    componentWillUnmount() {
        console.log("componentWillUnmount()");
    }

    deleteItem(item) {
        console.log("deleteItem()");
        let items = this.state.items;
        const requestOptions = {
            method: "DELETE"
        }
        fetch(`http://localhost:3000/items/${item.id}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    const idx = items.indexOf(item);
                    items.splice(idx, 1);
                    console.log(items);
                    this.setState({ items: items });
                }
            })
    }

    addItem(item) {
        console.log("addItem()");
        let items = this.state.items;
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        }
        fetch("http://localhost:3000/items", requestOptions)
            .then((response) => response.json())
            .then((createdItem) => {
                items.push(createdItem);
                console.log(items);
                this.setState({items: items});
            });
    }

    updateFilters(filters) {
        console.log("updateFilters()");
        console.log(filters);
        this.setState({filters: filters});
    }

    filterItems(items) {
        console.log("filterItems()");
        console.log(items);
        console.log(this.state.filters);
        const filteredItems = [];
        for(const item of items) {
            if ("kind" in this.state.filters && this.state.filters.kind !== "" && item.kind !== this.state.filters.kind) {
                continue;
            }
            if ("maxPrice" in this.state.filters && item.price > this.state.filters.maxPrice) {
                continue;
            }
            if ("origin" in this.state.filters && this.state.filters.origin !== "" && item.origin !== this.state.filters.origin) {
                continue;
            }
            filteredItems.push(item);
        }
        return filteredItems;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <MainTitle color="red">MyApp</MainTitle>
                </div>
                <hr/>
                <div className="row">
                    <SearchBar title="Search it" callback={(filters) => this.updateFilters(filters)}/>
                </div>
                <hr/>
                <div className="row">
                    <Title color="coral">Last search</Title>
                </div>
                <div className="row">
                    <div className="col-4">
                        <p>Kind: {"kind" in this.state.filters ? this.state.filters.kind : "Not set"}</p>
                    </div>
                    <div className="col-4">
                        <p>Max price: {"maxPrice" in this.state.filters ? this.state.filters.maxPrice : "Not set"}</p>
                    </div>
                    <div className="col-4">
                        <p>Origin: {"origin" in this.state.filters ? this.state.filters.origin : "Not set"}</p>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <AddItem title="Add it" addItem={(item) => this.addItem(item)}/>
                </div>
                <hr/>
                <div className="row">
                    <ListItems items={this.filterItems(this.state.items)} deleteItem={(item) => this.deleteItem(item)}/>
                </div>
                <hr/>
            </div>
        );
    }
}
