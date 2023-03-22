import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function UpdateProduct() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        fetchProductData()
    },[])

    async function fetchProductData(){
        console.log(params)
        let result = await axios.get(`http://localhost:5000/product/${params.id}`)

        setName(result.data.name)
        setPrice(result.data.price)
        setCategory(result.data.category)
        setCompany(result.data.company)
    }

    async function updateProduct(){

        try{
          let result = await axios.put(`http://localhost:5000/product/${params.id}`,{
          name,
          price,
          category,
          company, 
          headers: {"Content-Type": "application/json"}
        })
        navigate('/product')
        }catch(err) {
          console.log(err)
        }
    }
  return (
    <div className='form'>
      <h1>Update Product</h1>
       <input type="text" value={name} className='input'
       onChange={e=>setName(e.target.value)}/> 
       <input type="text" value={price} className='input'
       onChange={e=>setPrice(e.target.value)}/> 
       <input type="text" value={category} className='input'
       onChange={e=>setCategory(e.target.value)}/> 
       <input type="text" value={company} className='input'
       onChange={e=>setCompany(e.target.value)}/> 
       <button onClick={updateProduct} type="button" className='input btn'>Update</button>
    </div>
  )
}

export default UpdateProduct
