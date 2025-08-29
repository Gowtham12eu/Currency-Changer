import React, { useEffect, useState } from 'react'
import Current from "../assets/currency.png"
import axios from "axios";
export const Currency = () => {
  const [Amount,setAmount]=useState(1);
  const [fromCurrency,setFromCurrency]=useState("JPY");
  const [toCurrency,setToCurrency]=useState("EUR");
  const [exchanges,setExchanges]=useState(null);
  const[convertAmount,SetConvertAmount]=useState(null);
  const[userError,setUserError]=useState("ERRO OCCURED");
  useEffect(()=>{
    const getExchangeRate =async ()=>
    {
      try{
        let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response=await axios.get(url)
        setExchanges(response.data.rates[toCurrency])
        // console.log(response)
      }
      catch(error){
        console.error("Error fetching exchange rate:",error)
      }
      finally{

      }
    }
    getExchangeRate();
  },[fromCurrency,toCurrency])
  useEffect(()=>
  {
    if(exchanges !==null && Amount!==0)
    {
      SetConvertAmount((Amount*exchanges).toFixed(2))
    }     
  },[Amount,exchanges])
  const handleAmountEvent=(e)=>
  {
    const value=parseFloat(e.target.value);
    setAmount(isNaN(value)?0:value)
  }
  const handleFromCurrencyChange=(e) =>
  {
    setFromCurrency(e.target.value)
  }
  const handleToCurrencyChange=(e)=>
  {
    setToCurrency(e.target.value)
  }
  return (
    <>
    <div className='container'>
      <div className='body-container'>
          <img src={Current} alt='currencts' className='img1'></img>
          {Amount==0?<p className='Error'>{userError}</p>:null}
          <h1 className='Heading'>CURRENCY CONVERTER</h1>
      <div className='amount'>
        Amount:
      </div>
      <div className='int'>
        <input type='text' className='int2' value={Amount} onChange={handleAmountEvent}></input>
      </div>


      <div className='From'>
        From Currency:
      </div>
      <div className='int3'>
        <select id='int4' value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="USD">USD -United States Dollar</option>
          <option value="EUR">EUROP Dollar</option>
          <option value="GBP">GBP -British Pound SterLine</option>
          <option value="JPY">JPY -Japanese Yen</option>
          <option value="AUD">AUD -Australian Dollar</option>
          <option value="CAD">CAD -Canadian Dollar</option>
          <option value="CNY">CNY -Chinese Yuvan</option>
          <option value="INR">INR -Indian Dollar</option>
          <option value="BRL">BRL -Brazilian Dollar</option>
          <option value="ZAR">ZAR -South African Rand Dollar</option>
        </select>
      </div>
      <div className='to'>
        TO Currency:
      </div>
      <div className='int5'>
        <select id='int6' value={toCurrency} onChange={handleToCurrencyChange}>
           <option value="USD">USD -United States Dollar</option>
          <option value="EUR">EUROP Dollar</option>
          <option value="GBP">GBP -British Pound SterLine</option>
          <option value="JPY">JPY -Japanese Yen</option>
          <option value="AUD">AUD -Australian Dollar</option>
          <option value="CAD">CAD -Canadian Dollar</option>
          <option value="CNY">CNY -Chinese Yuvan</option>
          <option value="INR">INR -Indian Dollar</option>
          <option value="BRL">BRL -Brazilian Dollar</option>
          <option value="ZAR">ZAR -South African Rand Dollar</option>
        </select>
      </div>
       <div className='int7'>
        <p className='int8'>{Amount} {fromCurrency} is equal to {convertAmount} {toCurrency}</p>
      </div>
    </div>
    </div>
    </>
  )
}
