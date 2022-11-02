import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearDetail, getProducts, getProductsDetail, updateProducts } from "../../redux/actions";

const Score = () => {

  const {id} = useParams()

    const dispatch = useDispatch()
    const products = useSelector((state) => state.products)

    const [score, setScore] = useState({score: ""})

let arrayScore = {products: products}

let scorcito = (idProduct, score )=>{



}

  let handleChange = (e) =>{
    e.preventDefault()
    setScore(({
      ...score,
      [e.target.name]: e.target.value
      
    })
    );
    dispatch(getProducts())
   
  }
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getProductsDetail(id))
    return () => { dispatch(clearDetail([])) }
  }, [score])


  const saveHandle = (e) => {
    
    setScore({
      score: e.target.value
    })
    
    dispatch(updateProducts(id, score), getProducts())

  }


  return (
    <div>
    <select name="score" id="score" onChange={(e) => handleChange(e)}>
    <option hidden value="">select score</option>
        <option value={1} name="score">⭐️</option>
        <option value={2} name="score">⭐️⭐️</option>
        <option value={3} name="score">⭐️⭐️⭐️</option>
        <option value={4} name="score">⭐️⭐️⭐️⭐️</option>
        <option value={5} name="score">⭐️⭐️⭐️⭐️⭐️</option>
    </select>
    <button type="submit" onClick={(e) => saveHandle(e)}>Submit</button>
    </div>
  )
}

export default Score