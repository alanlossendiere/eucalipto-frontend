import { useProductStore } from "../hooks/useProductsStore";

export const ChooseSize = () => {

  const {
    startFilteredProducts,
  } = useProductStore();

  const handleChange = ({target}) => {
    startFilteredProducts(target.value);
  };

  const talles = ["S", "M", "L", "XL"];

  // const { selectedSize } = useSelector((state) => state.products);

  return (
    <>
      <div className="sizeTitle mb-3 d-flex justify-content-center">
        Elegir Talle:
      </div>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <div className="my-2">
          <input
            onChange={handleChange}
            className="btn-check"
            type="checkbox"
            value={undefined}
            name=""
            id={`exampleAll`}
          />
          <label className="btn btn-outline-secondary" htmlFor={`exampleAll`}>
            All
          </label>
        </div>
        {talles.map((talle) => (
          <div className="my-2">
            <input
              onChange={handleChange}
              className="btn-check"
              type="checkbox"
              value={talle}
              name=""
              id={`example${talle}`}
            />
            <label
              className="btn btn-outline-secondary"
              htmlFor={`example${talle}`}
            >
              {talle}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
