
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import '../SingleProduct/SingleProduct.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearDetail, getProducts, getProductsDetail, updateProducts } from '../../../redux/actions';
import { Button } from "reactstrap";


const SingleProduct = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const detail = useSelector((state) => state.detail)
    const [edit, setEdit] = useState('false')
    const products = useSelector((state) => state.products)


    const [input, setInput] = useState({
        price: "",
        stock: "",
        quality: detail.quality,
        description: "",
    })



    useEffect(() => {
        dispatch(getProducts())
        dispatch(getProductsDetail(id))
        return () => { dispatch(clearDetail([])) }
    }, [])


    function handleChange(e) {
        e.preventDefault()
        setInput(({
            ...input,
            [e.target.name]: e.target.value

        }));


    }
    dispatch(updateProducts(id, input))

    const editHandle = (e) => {
        setEdit("true")
    }

    const saveHandle = (e) => {
        setEdit("false")
        setInput({
            price: e.target.value,
            stock: e.target.value,
            quality: e.target.value,
            description: e.target.value,
        })
        dispatch(getProductsDetail(id))

    }

    return (

        <div className='single'>
            <Sidebar />
            <div className='singleContainer'>
                <Navbar />
               
<Link to="/dash/products"> <button class='backButton'>Back</button> </Link>
                   
               
                <div className='top'>
                    <div className='left'> 
                        <h1 className='title'> {edit === "false" ? "Information" : "Edit information"}</h1>
                        {edit === "false" ?
                            <div className='item'>
                                <div >

                                    <button class='editButton' onClick={() => editHandle()}> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg></button>
                                </div>
                                <img src={detail.image}
                                    alt=""
                                    className='itemImg' />
                                <div className='details'>
                                    <h1 className="itemtitle">{detail.name}</h1>
                                    <div className="detailItem">
                                        <span className='itemKey'>Price:</span>
                                        <span className='itemValue'>{detail.price}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Stock:</span>
                                        <span className='itemValue'>{detail.stock}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Quality:</span>
                                        <span className='itemValue'>{detail.quality}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Description:</span>
                                        <span className='itemValue'>{detail.description}</span>
                                    </div>
                                </div>
                            </div>
                            : <div className='item'>
                                <div >

                                    <button class='editButton' onClick={(e) => saveHandle(e)}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
                                        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                                    </svg>
                                    </button>
                                </div>
                                <img src={detail.image}
                                    alt=""
                                    className='itemImg' />
                                <div className='details'>
                                    <h1 className="itemtitle">{detail.name}</h1>

                                    <div className="detailItem">
                                        <span className='itemKey'>Price:</span>
                                        <span className='itemValue'><input value={input.price} name={"price"} type="text" onChange={(e) => handleChange(e)}></input></span>
                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Stock:</span>
                                        <span className='itemValue'><input value={input.stock} name={"stock"} type="text" onChange={(e) => handleChange(e)}></input></span>
                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Quality:</span>
                                        <select defaultValue={"disable"} name="quality" onClick={(e) => handleChange(e)}>
                                            <option name="disable" value="disable" disabled hidden>Select</option>
                                            <option name="quality" value="basic" >Basic</option>
                                            <option name="quality" value="premium">Premium</option>
                                        </select>


                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Description:</span>
                                        <span className='itemValue'><input value={input.description} name={"description"} type="text" onChange={(e) => handleChange(e)}></input></span>
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                    <div className='right'></div>
                </div>
                <div className='bottom'>
                    <h1 className='title'> Last Transactions</h1>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct