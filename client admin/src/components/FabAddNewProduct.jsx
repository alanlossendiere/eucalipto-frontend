import { Link } from "react-router-dom";
import { useProductsStore } from "../hooks/useProductsStore";

export const FabAddNewProduct = () => {
  const { setActiveProduct } = useProductsStore();

  const handleClick = () => {
    setActiveProduct({
      image: [],
      name: "",
      description: "",
      type: "",
      price: null,
      sku: null,
      sizes: [],
      outstanding: undefined,
      sold: undefined,
      active: undefined,
    });
  };

  return (
    <>
      <Link to={"/nuevo-producto"}>
        <button onClick={handleClick} className="btn btn-primary fab">
          <i className="fas fa-plus"></i>
        </button>
      </Link>
    </>
  );
};
