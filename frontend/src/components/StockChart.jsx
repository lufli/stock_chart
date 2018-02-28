import React, { Component } from 'react';
import ReactTable from 'react-table';

import "react-table/react-table.css";

export default class StockChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset_data: null,
      current: 'AAPL',
    }
    this.record = {};
    this.makeColums = this.makeColums.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchDate = this.fetchDate.bind(this);
  }

  componentDidMount() {
    this.fetchDate();
  }

  fetchDate() {
    if(!this.record[this.state.current]) {
      fetch(`http://127.0.0.1:7777/api/?stock_code=${this.state.current}`).then(res => res.json())
      .then(res => {
        console.log("res", res.dataset_data)
        this.record[this.state.current] = res.dataset_data;
        this.setState({
          dataset_data: res.dataset_data
        })
      })
    } else {
      this.setState({
        dataset_data: this.record[this.state.current]
      })
    }
  }

  handleChange(event) {
    this.setState({
      dataset_data: null,
      current: event.target.value
    }, this.fetchDate)
  }

  makeColums() {
    return this.state.dataset_data.column_names.map((element, index) => {
      return {
        Header: element,
        accessor: index + ""
      }
    })
  }

  render() {
    console.log(this.state.current)
    if(!this.state.dataset_data) return <div>Loading...</div>
    return (
      <div>
        <label>Pick the Scock:
          <select value={this.state.current} onChange={this.handleChange}>
            <option value="AAPL">AAPL</option>
            <option value="FB">FB</option>
            <option value="GOOG">GOOG</option>
            <option value="YELP">YELP</option>
          </select>
        </label>
        <ReactTable
          columns={this.makeColums()}
          data={this.state.dataset_data.data}
          className="-striped -highlight"
          defaultPageSize={5}
        />
      </div>
    )
  }
}