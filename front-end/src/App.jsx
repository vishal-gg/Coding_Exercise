import React from 'react'
import Navbar from './Components/Navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import SignUp from './Components/SignUp'
import PrivateComp from './Components/PrivateComp'
import Login from './Components/Login'
import AddProduct from './Components/AddProduct'
import Products from './Components/Products'
import UpdateProduct from './Components/UpdateProduct'
import Home from './Components/Home'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route element={<PrivateComp />}>
        <Route path='/' element={<Home />} /> 
        <Route path='/product'element={<Products />} />
        <Route path='/add-product'element={<AddProduct />} />
        <Route path='/update/:id' element={<UpdateProduct />} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
