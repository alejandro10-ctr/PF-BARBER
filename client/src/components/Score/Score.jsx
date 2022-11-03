import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearDetail, getProducts, getProductsDetail, pushScore, updateProducts } from "../../redux/actions";

const Score = () => {

  const {id} = useParams()

    const dispatch = useDispatch()
    const products = useSelector((state) => state.products)
    const detail = useSelector((state) => state.detail)
    const scorees= useSelector((state) => state.score)
    const productDetail = getProductsDetail(id)

    const [score, setScore] = useState([])




  let handleChange = (e) =>{
    e.preventDefault()
    setScore(
   e.target.value
      
    )
    
    dispatch(getProducts())
   
  }
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getProductsDetail(id))
    return () => { dispatch(clearDetail([])) }
  }, [score])




// for (let i = 0; i < array.length; i++) {
//   for (let j = 1; j < array.length; j++) {

    
//   }
// }
const [contador, setContador] = useState(1)
const [arrayScores, setarrayScores] = useState([])
const [arrays, setArrays] = useState({contador})

// console.log("soy el producto", detail)
const saveHandle = (e) => {
  setScore(e.target.value)
  setContador(contador+1)
  console.log(contador)

  let initialState= 0

  let total = scorees.reduce((a, b) => Number(a) + Number(b), initialState);
  console.log('total',total)
  let promedio = total / contador
  console.log("promedio", promedio)
  let promedioRedondeado = Math.round(promedio)
  console.log("promedioRedondeado", promedioRedondeado);
  dispatch(pushScore(score))
  dispatch(updateProducts(id, {score:promedioRedondeado}))

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