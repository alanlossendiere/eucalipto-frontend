import { FabAddNewProduct } from "../components/FabAddNewProduct";
import { NavBar } from "../components/NavBar";
import { TableProducts } from "../components/TableProducts";

export const AdminProducts = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <TableProducts />
      </div>
      <FabAddNewProduct />
    </>
  );
};
