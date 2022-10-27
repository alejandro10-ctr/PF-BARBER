
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import '../Single/Single.scss';

const Single = () => {
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
                            <img src="https://media.ambito.com/p/d05bbfaac0af2843cea560108f4f5789/adjuntos/239/imagenes/040/239/0040239564/robbie-coltranewebp.png"
                                alt="" 
                                className='itemImg'/>
                                <div className='details'>
                                    <h1 className="itemtitle">Hagrid</h1>
                                    <div className="detailItem">
                                        <span className='itemKey'>Email:</span>
                                        <span className='itemValue'>dragons@hogwarts.com</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Phone:</span>
                                        <span className='itemValue'>+541 4344 3434</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className='itemKey'>Adress:</span>
                                        <span className='itemValue'>Hogwarts school grounds, near the Forbidden Forest</span>
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

export default Single