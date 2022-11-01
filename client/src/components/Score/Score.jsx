import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";






const Score = () => {

    const dispatch = useDispatch()
 
  return (
    <div>Score
    <select name="score" id="score">
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
    </select>
    </div>
  )
}

export default Score