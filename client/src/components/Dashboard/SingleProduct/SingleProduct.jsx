
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import '../SingleProduct/SingleProduct.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProductsDetail } from '../../../redux/actions';


const SingleProduct = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
   

    useEffect(() => {
      dispatch(getProductsDetail(id))
    }, [])
 const detail = useSelector((state)=> state.detail)
 console.log(detail)

    return (
   
        <div className='single'>
            <Sidebar />
            <div className='singleContainer'> 
                <Navbar />
                <div className='top'>
                    <div className='left'>
                        <div className='editButton'>Edit</div>
                        <h1 className='title'> Information</h1>
                        <div className='item'>     
                            <img src={detail.image}
                                alt="" 
                                className='itemImg'/>
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