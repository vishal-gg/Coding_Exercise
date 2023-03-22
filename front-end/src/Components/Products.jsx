import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [product, setProduct] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/products')
    .then(res=>setProduct(res.data))
    .catch(err=>console.log(err))
  },[])

  async function deleteData(id){
    let data = await axios.delete(`http://localhost:5000/product/${id}`)
    if(data){
      axios.get('http://localhost:5000/products')
      .then(res=>setProduct(res.data))
      .catch(err=>console.log(err))
    }
  }
  async function handleSearch(e){
    let key = e.target.value;
    if(key){
      let result = await fetch(`http://localhost:5000/search/${key}`)
    result = await result.json()
    if(result){
      setProduct(result)
    }
    }else {
      axios.get('http://localhost:5000/products')
    .then(res=>setProduct(res.data))
    .catch(err=>console.log(err))
    } 
  }
    console.log(product)

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input className="searchBox" type="text" placeholder="search product"
       onChange={handleSearch}/>
      <ul className="ul">
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {
        product.length>0 ? product.map((item, index) => (
          <ul className="ul" key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li><button onClick={()=>deleteData(item._id)}>Delete</button>
            <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        ))
        : <h1>No Record Found</h1>
      }
      
    </div>
  )
}

export default Products;
