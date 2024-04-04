export const Carousel = ( images ) => {
  return (
    <>
      <div className="slider-container">
        {images.map((props, index) =>
          console.log(props)
          // <div>
          //   <img src={props.secure_url} key={index} />
          // </div>
        )}
      </div>
    </>
  );
};
