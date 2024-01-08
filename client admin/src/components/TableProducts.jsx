import { useProductsStore } from "../hooks/useProductsStore";
import { useEffect } from "react";
import { TableProduct } from "./TableProduct";
import { useDispatch } from "react-redux";

export const TableProducts = () => {
  const { products, startLoadingProducts } = useProductsStore();


  useEffect(() => {
    startLoadingProducts();
  }, []);

  return (
    <>
      <table className="table table-striped" >
        <thead >
          <tr >
            <th className="col">ID</th>
            <th className="col">Name</th>
            <th className="col">Price</th>
            <th className="col">Vendido</th>
            <th className="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableProduct  key={product._id} {...product}/>
          ))}
        </tbody>
      </table>
    </>
  );
};
