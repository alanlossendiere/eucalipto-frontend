import { BsCart4 } from "react-icons/bs";
import { useCartUiStore } from "../hooks/useCartUiStore";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const { startClosingCart, products } = useCartUiStore();

  const handleExitCart = () => {
    startClosingCart();
  };


  return (
    <>
      <div className="cartBody">
        <button className="exitCart" onClick={handleExitCart}>
          <span>X</span>
        </button>
        <div className="cartContent">
          <div className="cartHeader">
            <BsCart4 size={60} color="white" />
            <span>Carro</span>
          </div>
          <div className="cartProducts">
            {products.length === 0 ? (
              <div className="addProductCart">Añade productos al carrito</div>
            ) : (
              products.map((product) => (
                <CartItem key={product._id} {...product}>
                  {" "}
                </CartItem>
              ))
            )}
          </div>
        </div>
        <div className="cartFooter">
          <div className="cartTotal">TOTAL</div>
          <div className="cartCheckoutPrice">
            <p>$ Precio total</p>
          </div>
          <button className="cartCheckout">Comprar</button>
        </div>
      </div>
    </>
  );
};
