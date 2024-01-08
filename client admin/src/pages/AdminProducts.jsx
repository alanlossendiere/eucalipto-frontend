import { FabAddNewProduct } from "../components/FabAddNewProduct";
import { TableProducts } from "../components/TableProducts";

export const AdminProducts = () => {
  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col-6">Ganancia total...</div>
          <div className="col-6">Gastos...</div>
        </div>
      </div>
      <div className="container">
        <TableProducts />
      </div>
      <FabAddNewProduct />
    </>
  );
};
