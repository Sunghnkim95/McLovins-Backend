import React, {useState, useEffect} from 'react';
import { BASE_URL} from '../api'
import EditProduct from './EditProduct';



const IndividualProd = ({userToken, allProducts, setAllProducts, selectedProd, productName, productDescript, setProductName, setProductDescript, productPrice, setProductPrice, productCategory, setProductCategory, productQuantity, setProductQuantity, productPhoto, setProductPhoto}) => {
    const ToggleClass = () => {
        setActiveEdit(!isActiveEdit);
    };
    
    
    return (
        <> 
            <div className="ip">
                {allProducts.map(prod => {
                    const {id, name, description, price, quantity, photo} = prod;
                    if(id === selectedProd) {   
                        return (
                        <div className="individualContainer" key={id}>
                                <div className="showbox">
                                <div className="ipText">
                                    <h2 className="innerboxText"> {name}</h2>
                                    <p className="innerText">{description}</p>
                                    <p className="innerText">{price}</p>
                                    <p className="innerText">{quantity}</p>
                                    <img src={photo} alt="a picture of ${name}" />
                                </div> 
                            {/* Admin feature? */}
                                {userToken
                                ?
                                (<div>
                                    <button className="edit button" onClick={ToggleClass}>
                                        Edit
                                    </button>
                                </div>)
                                :
                                (<div></div>)
                                }
                                
                                {userToken
                                ?
                                (<div className="iaInteractiveBox">
                                        <div className={`editFeild-${isActiveEdit ? "inactive" : "active"}`}>
                                            <EditProduct 
                                                userToken={userToken} 
                                                allProducts={allProducts} 
                                                setAllProducts={setAllProducts} 
                                                selectedProd={selectedProd}
                                                ToggleClass={ToggleClass}                             
                                                setProductName={setProductName}                                             
                                                setProductDescript={setProductDescript}
                                                setProductPrice={setProductPrice} 
                                                setProductCategory={setProductCategory} 
                                                setProductQuantity={setProductQuantity} 
                                                setProductPhoto={setProductPhoto}
                                            />
                                        </div>
                                </div>)
                                :
                                (<div></div>)
                                }
                            </div> 
                        </div>)  
                    }
                })}
            </div>
        </>
    )
} 
export default IndividualProd; 