import React from 'react'


export const ProductPage = () => {
  return (
    <>
    <div className="row">
      <div className="col-2">
        <ChooseSize />
      </div>
      <div className="col-10">
        <ProductList />
      </div>
    </div>
    </>
  )
}
