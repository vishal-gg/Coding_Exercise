import { React, useState } from "react";

function AddProduct() {
  // there is professional way to reset form after submiting, by creating initialState like below
  // const initialState = {
  //   name: "",
  //   price: "",
  //   category: "",
  //   company: "",
  //   error: false,
  // }
  // const [state, setState] = useState(initialState)
  // keep this in mind you have to use ...state when needed

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  async function addProduct() {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: { "Content-Type": "application/json" }
    });
    // result = await result.json();
    // console.log(result);
    alert('product added successfully')
    resetForm()
  }
  const resetForm = () => {
    setName('')
    setPrice('')
    setCategory('')
    setCompany('')
    setError(false)
  }

  return (
    <div>
      <div className="form">
        <h1>Add Product</h1>
        <input
          type="text"
          placeholder="enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="enter company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="input"
        />
        <button onClick={addProduct} className="input btn">
          ADD
        </button>
      </div>
      <div className="errorBox">
        {error && !name ? <p className="error">enter valid name</p> : null}
        {error && !price ? <p className="error">enter valid price</p> : null}
        {error && !category ? <p className="error">enter valid category</p> : null}
        {error && !company ? <p className="error">enter valid company</p> : null}
      </div>
    </div>
  );
}

export default AddProduct;