import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import MakeProduct from './MakeProduct';
const Header = styled.header`
  font-family: "Akaya Telivigala", cursive;
  font-weight: 100;
  font-style: italic;
  font-size: 20px;
  text-align: center;
  padding: 0.25em 0;
  background: #033a8d;
  color: #fafafa;
`;
const Container = styled.header`
  background: #587cf5;
  color: #fafafa;
`;
const Products = ({userToken, allProducts, setAllProducts, setSelectedProduct, productID}) => {
  return ( 
    <Container>
      <Header><h1>All Products</h1></Header>
      <div className="allProducts">
        <div className="products">
          {userToken?
            (<div className="productContainer">
              <MakeProduct
                userToken={userToken}
                allProducts={allProducts}
                setAllProducts={setAllProducts}/>
            </div>)
            :
            (<div></div>)
          }
          {allProducts.map(prod=> {
            return (
              <div className="productContainer" key={prod.id}>
                <div className="productBody">
                  <div className="productHeader">
                    <div className="productDescription">
                      <div className='innerbox'>  
                        <div className='innerboxText' style={{fontWeight:"bolder", color:"black"}}
                            onClick={() => {
                            productID(prod.id)
                            setSelectedProduct(prod.id)
                            }}>
                          <Link to={`/product/${prod.id}`} className="prodLink">
                            {prod.name}
                          </Link>
                        </div>
                        <div className='prodPhoto'>{prod.photo}</div>
                        <div className='innerboxText'>{prod.description}</div>
                        <div className='innerboxText'>{prod.price}</div>
                      </div>
                    </div>  
                  </div>  
                </div>    
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
export default Products;