import React, { useState } from 'react';
import './paypal.css';
import axios from 'axios';
import paypal from '../image/paypal.webp'

const Paypal = () => {
  const [email, setEmail] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = (e)=>{
    setLoading(true)
    e.preventDefault()
    axios.post('api/orders', {amount, productInfo, email})
    .then(res => {  
      // return console.log(res.data)
      window.open(res.data, '_blank');
      setLoading(false)
    })
    .catch(error => {
      setLoading(false)
      console.error(error);
    });   
  }
  return (
    <>
    <div className='main'>
      <img width={300} src={paypal} alt="" />
      <div className='card px-5 py-4 mt-5'>
        <form className='' onSubmit={handlePayment}>
          <label htmlFor="#" className='mt-2'>Email:</label>
          <div className='col-12 center'>
            <input required type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
          <label htmlFor="#" className='mt-2'>Product:</label>
          <div className='col-12 center'>
            <input required type="text" onChange={(e)=>{setProductInfo(e.target.value)}}/>
          </div>
          <label htmlFor="#" className='mt-2'>Amount:</label>
          <div className='col-12 center'>
            <input required type="text"  onChange={(e)=>{setAmount(e.target.value)}}/>
          </div>
          {!loading? <div className='col-12 center'>
            <button className='w-100' type="submit">Pay</button>
          </div>
          :
          <div className='col-12 center'>
            <button className='w-100 text-center' type="submit">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
          }
        </form>
      </div>
    </div>
    <p>@codesense24</p>
    </>
  )
}

export default Paypal
