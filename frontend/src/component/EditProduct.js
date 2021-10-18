import React, {useState} from 'react';
import {
    editThisProduct, 
    BASE_URL
} from '../api'
const EditProduct = ({allProducts, setAllProducts, userToken, selectedProd, ToggleClass,  setProductName,  setProductDescript, setProductPrice,  setProductCategory,  setProductQuantity,  setProductPhoto}) => {
   
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    const [newPhoto, setNewPhoto] = useState('');
    function resetForm() {
        setNewName('');
        setNewDescription('');
        setNewPrice('');
        setNewCategory('');
        setNewQuantity('');
        setNewPhoto('');
    }
    async function edit(e) {
        e.preventDefault();
            try {
                const results = await editThisProduct(BASE_URL, selectedProd, userToken, newName, newDescription, newPrice, newCategory, newQuantity, newPhoto);
                if(results.id) {
                    setProductName(results.name)
                    setProductDescript(results.description)
                    setProductCategory(results.category)
                    setProductPrice(results.price)
                    setProductQuantity(results.quantity)
                    setProductPhoto(results.photo)
                    setAllProducts([...allProducts]);
                    location.reload()
                    ToggleClass();
                    resetForm();
                }
            } catch(error) {
                console.error(error)
            }
    }
    return (
        <section className="editProductAside">
            <h1 className="editProduct">Edit Product</h1>
                <form className="editProductForm" onSubmit={edit}>
                    <div className="editProductContent">
                        <label className="editProductLabel">Name</label>
                    </div>
                    <div className="editProductContent">
                        <input className="editProductInput" type="text" 
                            placeholder="Name" value={newName} 
                            onChange={(event) => {
                                setNewName(event.target.value);
                        }}/>
                    </div>
                    <div className="editProductContent">
                        <label className="editProductLabel">Description</label>
                    </div>
                    <div className="editPostContent">
                        <input className="editProductInput" type="text" 
                            placeholder="Description" value={newDescription}
                            onChange={(event) => {
                                setNewDescription(event.target.value);
                        }}/>
                    </div>



                    <div className="editProductContent">
                        <label className="editProductLabel">Price</label>
                    </div>
                    <div className="editPostContent">
                        <input className="editProductInput" 
                        type="number" 
                         min="1" 
                         step="any"
                         placeholder="Price" value={newPrice}
                         onChange={(event) => {
                            setNewDescription(event.target.value);
                        }}/>
                    </div>
                    <div className="editProductContent">
                        <label className="editProductLabel">Quantity</label>
                    </div>
                    <div className="editPostContent">
                        <input className="editProductInput" type="number" 
                            placeholder="Quantity" value={newQuantity}
                            onChange={(event) => {
                                setNewQuantity(event.target.value);
                        }}/>
                    </div>
                    <div className="editProductContent">
                        <label className="editProductLabel">Category</label>
                    </div>
                    <div className="editPostContent">
                        <input className="editProductInput" type="text" 
                            placeholder="Category" value={newCategory}
                            onChange={(event) => {
                                setNewCategory(event.target.value);
                        }}/>
                    </div>
                    <div className="editProductContent">
                        <label className="editProductLabel">Photo</label>
                    </div>
                    <div className="editPostContent">
                        <input className="editProductInput" type="image" 
                            placeholder="Photo" value={newPhoto}
                            onChange={(event) => {
                                setNewPhoto(event.target.value);
                        }}/>
                    </div>
                    <button className="editProdSubmit" type="submit">Update Product!</button>
                </form>
        </section>
    )
}
export default EditProduct;