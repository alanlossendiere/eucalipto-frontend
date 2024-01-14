import { BsCart4 } from "react-icons/bs";
import { useCartUiStore } from "../hooks/useCartUiStore";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const { startClosingCart, products, totalAmount, totalPrice } =
    useCartUiStore();

  const handleExitCart = () => {
    startClosingCart();
  };

  const handleBuyProducts = () => {
    const name = "Alan";

    const phoneNumber = "2255412818";
    const wppProductos = products.map(
      (product) =>
        `%0A%0A${product.quantity}+X+${product.name}+|+%24${product.price}%0ATalle%3A+${product.sizes}+|+SKU%3A+${product.sku}`

      // 1+x+Completo+%7C+%243.900
    );

    window.open(
      `https://api.whatsapp.com/send/?phone=549${phoneNumber}&text=Hola%2C+quiero+comprar+los+siguiente+productos%3A${wppProductos}%0A%0A+Cantidad+de+productos%3A+%2A${totalAmount}%2A%0ATotal%3A+%2A%24${totalPrice}%2A%0A&type=phone_number&app_absent=0`
    );
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
            <p>$ {totalPrice}</p>
          </div>
          <div className="cartTotal">PRODUCTOS</div>
          <div className="cartCheckoutPrice">
            <p>{totalAmount}</p>
          </div>
          <button className="cartCheckout" onClick={handleBuyProducts}>
            Comprar
          </button>
        </div>
      </div>
    </>
  );
};
