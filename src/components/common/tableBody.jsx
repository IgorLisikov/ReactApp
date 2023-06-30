import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    // if content fucntion is present - call it
    if (column.content) return column.content(item);
    // else, return value from the 'item' by corresponding 'path'
    return _.get(item, column.path); // use lodash get() to be able to access nested properties of the 'item', that can't be accessed via 'column.path' when 'path' is nested (genre.name)
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns, onLike, onDelete } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          // 'key={item._id}' is required so that each item will have a unique key
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
