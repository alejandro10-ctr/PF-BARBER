
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import '../SingleProduct/SingleProduct.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearDetail, getProductsDetail } from '../../../redux/actions';


const SingleProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        name: "",
        price: "",
        stock: "",
        quality: "",
        description: "",
    })

    const [edit, setEdit] = useState('false')
    useEffect(() => {
        dispatch(getProductsDetail(id))
        return () => dispatch(clearDetail())
    }, [])
    const detail = useSelector((state) => state.detail)
    console.log(detail)
    const editTrueHandle = (e) => {
        setEdit("true")
        console.log(edit)
    }
    const editFalseHandle = (e) => {
        setEdit("false")
        setInput({
            price: e.target.value,
            stock: e.target.value,
            quality: e.target.value,
            description: e.target.value,
    })
    console.log(setInput)
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
                                        <span className='itemValue'><input value={input.price} name={"price"} type="text"></input></span>
                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Stock:</span>
                                        <span className='itemValue'><input value={input.stock} name={"stock"} type="text"></input></span>
                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Quality:</span>
                                        <select defaultValue={detail.quality === "basic" ? "basic" : "premium"} name="quality" >
                                        <option  name={"quality"} value="basic">Basic</option>
                                        <option   name={"quality"} value="premium">Premium</option>
                                        </select>
                                       

                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Description:</span>
                                        <span className='itemValue'><input value={input.description} name={"description"} type="text"></input></span>
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