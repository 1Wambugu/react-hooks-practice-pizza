import React from "react";

function Pizza({ pizza, onEditClick }) {
  return (
    <tr>
      <td>{pizza.topping}</td>
      <td>{pizza.size}</td>
      <td>{pizza.vegetarian ? "Vegetarian" : "Not Vegetarian"}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onEditClick(pizza)}
        >
          Edit Pizza
        </button>
      </td>
    </tr>
  );
}

export default Pizza;
