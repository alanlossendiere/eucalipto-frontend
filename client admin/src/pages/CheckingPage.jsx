import { ColorRing } from "react-loader-spinner";
export const CheckingPage = () => {
  return (
    <>
      <div className="center">
        <ColorRing
          visible={true}
          height="130"
          width="130"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    </>
  );
};
