import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (sortBy) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.sortBy === sortBy)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.sortBy = sortBy;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.sortBy !== sortColumn.sortBy) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.sortBy || column.key}
              onClick={() => this.raiseSort(column.sortBy)}
              scope="col"
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
