import React from "react";

const ListGroup = ({
  items,
  valueProperty,
  textProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

// Set default property names to make it less coupled to our current implementation of 'items'
// If names in 'items' don't match this defaults, pass 'valueProperty' or 'textProperty' in input parameters
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
