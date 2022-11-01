import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getProducts, getProductsDetail, updateProducts } from "../../redux/actions";

const Score = () => {


    const dispatch = useDispatch()
    const products = useSelector((state) => state.products)

    const [score, setScore] = useState({score: ""})



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
    dispatch(getProductsDetail(1))
    return () => { dispatch(clearDetail([])) }
  }, [score])


  const saveHandle = (e) => {
    
    
    setScore({
      score: e.target.value
    })
    
    dispatch(updateProducts(1, score), getProducts())

  }


  return (
    <div>Score
    <select name="score" id="score" onChange={(e) => handleChange(e)}>
    <option hidden value="">select score</option>
        <option value={1} name="score">1</option>
        <option value={2} name="score">2</option>
        <option value={3} name="score">3</option>
        <option value={4} name="score">4</option>
        <option value={5} name="score">5</option>
    </select>
    <button type="submit" onClick={(e) => saveHandle(e)}>Submit</button>
    </div>
  )
}

export default Score