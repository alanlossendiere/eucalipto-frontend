import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useProductsStore } from "../hooks/useProductsStore";
import { Link } from "react-router-dom";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";

export const TableProduct = (props) => {
  const { name, price, sold, _id } = props;

  const { setActiveProduct, startDeletingProduct } = useProductsStore();

  const handleOnClick = () => {
    setActiveProduct(props);
  };

  const handleDelete = async () => {
    await startDeletingProduct(_id);
  };
  return (
    <>
      <tr onClick={handleOnClick}>
        <td className="listComponent">{name}</td>
        <td className="listComponent">$ {price}</td>
        <td className="listComponent">
          {sold ? (
            <RxCheckCircled color="green" size={20} />
          ) : (
            <RxCrossCircled color="red" size={20} />
          )}
        </td>
        <td className="listComponent">
          <Link
            to={`/${_id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <AiOutlineEdit size={25} />
          </Link>
          &nbsp;&nbsp;
          <AiOutlineDelete
            style={{ cursor: "pointer" }}
            size={25}
            onClick={handleDelete}
          />
        </td>
      </tr>
    </>
  );
};
