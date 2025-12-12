async function getSession(){
  const token = JSON.parse(sessionStorage.getItem("token"));
  const cbid = JSON.parse(sessionStorage.getItem("cbid"));

   return {token,cbid};
}

export async function getUser(){
   const set = await getSession();
   const requestOption = {
      method: "GET",
      headers:{"Content-Type": "application/json",Authorization: `Bearer ${set.token}`}
   }

   const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${set.cbid}`,requestOption);
    if(!response.ok){ 
        throw new Error(`Error ${response.statusText}: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function getUserOrders(){
    const set = await getSession();
    const requestOption = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${set.token}`}
    } 

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${set.cbid}`,requestOption);
    if(!response.ok){
        throw new Error(`Error ${response.statusText}: ${response.status}`);
    }  
    const data = await response.json();
    return data;
}

export async function createOrder(cartList,total,user){
    const set = await getSession();

    const order = {
       cartList: cartList,
       amount_paid: total,
       quantity: cartList.length,
       user: {
         name: user.name,
         email: user.email,
         id: user.id
        }
      }
    const requestOption = {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${set.token}`},
        body: JSON.stringify(order) 
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`,requestOption);
    if(!response.ok){
        throw new Error(`Error ${response.statusText}: ${response.status}`);
    }
    const data = await response.json();
    return data;
}