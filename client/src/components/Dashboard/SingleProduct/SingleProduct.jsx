
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import '../SingleProduct/SingleProduct.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearDetail, getProducts, getProductsDetail, updateProducts } from '../../../redux/actions';


const SingleProduct = () => {
    const detail = useSelector((state) => state.detail)
    const products = useSelector((state) => state.products)


    const { id } = useParams()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        price: "",
        stock: "",
        quality: detail.quality,
        description: "",
    })



    const [edit, setEdit] = useState('false')
    useEffect(()=>{
        dispatch(getProductsDetail(id))// accedo al id del detalle
        dispatch(getProducts())
        return()=>{dispatch(clearDetail([])); // despacha la accion de clean y retorna un array vacio
        } 
        },[])


    console.log(detail)
    const editTrueHandle = (e) => {
        setEdit("true")
    }
    const editFalseHandle = (e) => {
        setEdit("false")
        setInput({
            price: e.target.value,
            stock: e.target.value,
            quality: e.target.value,
            description: e.target.value,
    })
    
    // dispatch(updateProducts(id, input))
    // dispatch(getProducts())


    }
    function handleChange(e){ 
        e.preventDefault()
        dispatch(updateProducts(id, input))
        dispatch(getProducts())
        setInput(({
        ...input,
        [e.target.name]: e.target.value

        }));
    
    
     }

    return (

        <div className='single'>
            <Sidebar />
            <div className='singleContainer'>
                <Navbar />
                <Link to="/dash/products">

                <button>Back</button>
                </Link>
                <div className='top'>
                    <div className='left'>
                        <h1 className='title'> {edit === "false"? "Information" : "Edit information"}</h1>
                        {edit === "false" ?
                            <div className='item'>
                                <div className='editButton'>

                                    <button onClick={() => editTrueHandle()}>Edit</button>
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
                                <div className='editButton'>

                                    <button onClick={(e) => editFalseHandle(e)}>Save</button>
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
                                        <option  name="disable" value="disable" disabled hidden>Select</option>
                                        <option  name="quality" value="basic" >Basic</option>
                                        <option   name="quality" value="premium">Premium</option>
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