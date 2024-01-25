import { useProductsStore } from "../hooks/useProductsStore";

export const ImageForm = ({ props }) => {
  const id = props.public_id;
  const url = props.secure_url;

  const { startDeletingImage } = useProductsStore();

  const formData = { public_id: id };

  const handleExitImage = async () => {
    startDeletingImage(formData);
  };

  return (
    <>
      <div className="exitImage" onClick={handleExitImage}>
        <span>X</span>
      </div>
      <img className="card-img" key={id} src={url}></img>
    </>
  );
};
