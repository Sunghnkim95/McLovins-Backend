export const BASE_URL = 'localhost:3000';

export async function fetchRegisterUser(url, username, password) {
    try {
        const response = await fetch(`${url}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    "username": username,
                    "password": password
            })
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}
export async function fetchLoginUser(url, username, password) {
    try {
        const response = await fetch(`${url}/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
               "username": username,
               "password": password
        })
    })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}
export async function fetchAllProducts(){
    try{
        const response = await fetch(`${BASE_URL}/products`)
        const results = await response.json()
        const products = await results
        return products
    } catch (error) {
        console.error(error);
    }
}

//isAdmin?
export async function createProduct( url, userToken, name, description, category, quantity, price, photo) {
    const actObj = {
        "name": name,
        "description": description,
        "category": category,
        "quantity": quantity,
        "price": price,
        "photo": photo
    }
    try {
        const response = await fetch(`${url}/products`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userToken
            },
            body: JSON.stringify(
                actObj
            )
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}

export async function fetchUsersCart(username, userToken){
      try{
          const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        const response = await fetch(`${BASE_URL}/users/${username}/cart`, headers)
        const results = await response.json()
        return results
    }catch(error){
        console.error(error)
    }
}
export async function editThisProduct( url, SelectedProduct, userToken, name, description, category, quantity, price, photo) {
    const actObj = { }
    if(name) {
        actObj["name"] = name;
    }
    if(description) {
        actObj["description"] = description;
    }
    if(category) {
        actObj["category"] = category;
    }
    if(quantity) {
        actObj["quantity"] = quantity;
    }
    if(price) {
        actObj["price"] = price;
    }
    if(photo) {
        actObj["photo"] = photo;
    }
    try {
        const response = await fetch(`${url}/activities/${SelectedProduct}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + userToken
            },
            body: JSON.stringify(
                actObj
            )
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}

/*
export async function fetchOrderHistory(url, selectedAct) {
    try {
        const response = await fetch(`${url}/activities/${selectedAct}/routines`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}
*/




















