import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useProductsStore } from "../hooks/useProductsStore";
import { Link, Navigate } from "react-router-dom";

export const TableProduct = (props) => {
  const { name, price, sold, _id } = props;

  const { setActiveProduct, startDeletingProduct } = useProductsStore();

  const handleEdit = () => {};

  const handleOnClick = () => {
    setActiveProduct(props);
  };

  const handleDelete = async () => {
    await startDeletingProduct(props);
  };
  return (
    <>
      <tr onClick={handleOnClick}>
        <th scope="row">{_id}</th>
        <td>{name}</td>
        <td>$ {price}</td>
        <td>{sold}</td>
        <td>
          <Link
            to={`/${_id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <AiOutlineEdit size={25} onClick={handleEdit} />
          </Link>
          &nbsp;&nbsp;
          <AiOutlineDelete size={25} onClick={handleDelete} />
        </td>
      </tr>
    </>
  );
};
