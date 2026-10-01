const BASE_URL = "https://serve.faux-api.com/e8850af1285c303761fe9e7d";

export async function LoginUser(email, password){
    const res = await fetch(`${BASE_URL}/authlogin`,{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email, password})
    })

    if(!res.ok){
        throw new Error(errorData.message || 'Could not login');
    }
    return res.json();
}

export async function SignupUser( firstName, middleName, lastName, gender, sex, email, password ){
    const res = await fetch(`${BASE_URL}/authsignup`,{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({ firstName, middleName, lastName, gender, sex, email, password })
    })
    if(!res.ok){
        throw new Error("Failed to signup");
    }
    return res.json();
}

// Get posts
export async function getProducts(){
    const res = await fetch(`${BASE_URL}/products`,{
        method: 'GET',
        cache: 'no-store',
    })
    if(!res.ok){
      throw new Error(`Could not load products (Status: ${res.status})`);
    }
    return res.json();
}


export async function createProduct(productName, productDescription, price, department, product){
    const res = await fetch(`${BASE_URL}/products`,{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({productName, productDescription, price, department, product}),
    })
    if(!res.ok){
        throw new Error('Cannot create a new product');
    }
    return res.json();
}

export async function editProduct(id, updates){
    const res = await fetch(`${BASE_URL}/products/${id}`,{
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updates),
    })
    if(!res.ok){
          const body = await res.json().catch(() => ({}));
  throw new Error(body.message || `Update failed (${res.status})`);
    }
    return res.json();
}

export async function getProduct(id){
    const res = await fetch(`${BASE_URL}/products/${id}`);
     if(!res.ok){
        throw new Error('Failed to fetch single post')
    }
    return res.json();
}

export async function deleteProduct(id){
    const res = await fetch(`${BASE_URL}/products/${id}`,{
        method: 'DELETE',
    })

    if(!res.ok){
        throw new Error('Failed to delete product');
    }
    return res.json();
}

// Vehicle api

export async function getVehicles(){
    const res = await fetch (`${BASE_URL}/vehicles`,{
        method: "GET",
        cache: "no-store",
    })
    if(!res.ok){
        throw new Error('Could not load vehicles');
    }

    return res.json();
}

// Create a new vehicle

export async function createVehicle(vehicle, vin, color, model, type){
    const res = await fetch(`${BASE_URL}/vehicles`,{
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({vehicle, vin, color, model, type})
    })
    if(!res.ok){
        throw new Error('Failed to create a new vehicle');
    }
    return res.json();
}

export async function editVehicles(id,{vehicle, vin, color, model, type}){
    const res = await fetch(`${BASE_URL}/vehicles/${id}`,{
        method: 'PUT',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({vehicle, vin, color, model, type})
    })
    if(!res.ok){
        throw new Error('Failed to edit vehicle');
    }
    return res.json();
}

export async function getVehicle(id){
    const res = await fetch (`${BASE_URL}/vehicles/${id}`,{
        method: "GET",
        cache: "no-store",
    })
    if(!res.ok){
        throw new Error('Could not load vehicle with this id');
    }

    return res.json();
}

export async function deleteVehicle(id){
    const res = await fetch(`${BASE_URL}/vehicles/${id}`,{
        method: 'DELETE',
    })

    if(!res.ok){
        throw new Error('Failed to delete vehicle');
    }
    return res.json();
}
