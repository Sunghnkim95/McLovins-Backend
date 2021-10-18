import React, {useState} from 'react';
import {
    createProduct, 
    BASE_URL
} from '../api'


const MakeProduct = ({userToken, allProducts, setAllProducts}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [photo, setPhoto] = useState('');
    
    function resetForm(){
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setQuantity('');
        setPhoto('');
    }
    async function post(e) {
        e.preventDefault();
        try {
            const results = await createProduct(BASE_URL, userToken, name, description,category, quantity, price, photo);
            if(results.id){
                setAllProducts([...allProducts, results])
                alert("New Product Has Been Made")
                resetForm();
            }else{
                alert(results.error)
            }
        } catch(error) {
            console.error(error)
        }
    }
    return (
    <section className="makeProdAside">
        <h1 className="makeProdTitle">Add A New Product</h1>
        <form className="makeProdForm"onSubmit={post}>
            <div className="makeProdContent">
                <div>
                    <label className="makeProdLabel"> Name</label>
                </div>  
                <div>
                    <input className="makeProdInput" 
                        type="text" 
                        placeholder="Name" 
                        value={name} 
                        required
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </div>        
            </div>
            <div className="makeProdContent">
                <div>
                    <label className="makeProdLabel"> Description</label>
                </div>
                <div>
                <input className="makeProdInput" 
                        type="text" 
                        placeholder="Description" 
                        value={description}
                        required
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    />
                </div>    
            </div>
            <div className="makeProdContent">
                <div>
                    <label className="makeProdLabel">Category</label>
                </div>
                <div>
                <input className="makeProdInput" 
                        type="text" 
                        placeholder="category" 
                        value={category}
                        required
                        onChange={(event) => {
                            setCategory(event.target.value);
                        }}
                    />
                </div>    
            </div>
            <div className="makeProdContent">
                <div>
                    <label className="makeProdLabel"> Quantity</label>
                </div>
                <div>
                <input className="makeProdInput" 
                        type="number" 
                        placeholder="Quantity" 
                        value={quantity}
                        required
                        onChange={(event) => {
                            setQuantity(event.target.value);
                        }}
                    />
                </div>    
            </div>
            <div className="makeProdContent">
                <div>
                    <label className="makeProdLabel"> Price </label>
                </div>
                <div>
                <input className="makeProdInput" 
                        type="number" 
                        min="1" 
                        step="any" 
                        placeholder="price" 
                        value={price}
                        required
                        onChange={(event) => {
                            setPrice(event.target.value);
                        }}
                    />
                </div>    
            </div>
            <div className="makeProdContent">
                <div>
                    <label className="makeProdLabel"> Photo </label>
                </div>
                <div>
                <input className="makeProdInput" 
                        type="image" 
                        placeholder="Photo" 
                        value={photo}
                        required
                        onChange={(event) => {
                            setPhoto(event.target.value);
                        }}
                    />
                </div>    
            </div>
                <button className="makeActSubmit"
                type="submit">Add Product
                </button>
        </form>
    </section>
    )
}
export default MakeProduct;