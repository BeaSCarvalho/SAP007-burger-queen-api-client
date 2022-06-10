import Button from "../Button";

import "./style.css"

function Product({name, flavor, image, complement, price, onClick}){
  return (
    <li className='card-product'>
      <p className='name-product'>{name} {flavor}</p>
      <img className='img-product' src={image} alt={name}></img>
      <section className="complement-section">
        <p className='complement-product'>{complement}</p>
      </section>  
      <p className='price-product'>{price}</p>
      <Button className='product-button' text='Adicionar' onClick={onClick}/>
    </li>
  )
}

export default Product;