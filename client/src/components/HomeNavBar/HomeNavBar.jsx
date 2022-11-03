import React, { useContext } from 'react';
import Cookies from 'universal-cookie';
import { Link, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Navbar, Container, Nav } from "react-bootstrap";
import { CartContext } from "../Shopping/ShoppingCart";
import SearchBar from '../SearchBar/SearchBar';
import styles from "../HomeNavBar/HomeNavBar.module.css";

export default function HomeNavBar({ user }) {
    const { userId, myUser, cartItems, SignOff } = useContext(CartContext)
    const location = useLocation();
    const cookies = new Cookies()
    const token = cookies.get("token");
    let tokem = ''
    if (token) {
        tokem = jwt_decode(token);
    }



    // const tokenDecode = jwt_decode(token);
    // const isAdmin = tokenDecode.isAdmin


    if (!!userId &&!Object.keys(myUser).length) {
        return <h1>Cargando...</h1>
    }
    else {

        return (
            <div >
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

                    <div className="container-fluid" >
                    <Navbar.Brand>
                                <Link to="/">
                 <img  height="80px" src="https://cdn.discordapp.com/attachments/1026475887874539562/1037178028318523443/cositas2.png" alt="Olea" />
                 </Link>
                 </Navbar.Brand>

                       
                 <span className={styles.username}>{userId ? " Welcome " + Object.keys(user).length ? <div> <img className={styles.imgProfile} src={user.avatar} alt={user.name}  /> {user.username} <Link   to='/useredit/0' className={styles.buttonPencil}style={{ textDecoration: 'none' }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg></Link></div> : "" + " 👋" : "Henry Barber"}</span>
                                {/* <span className={styles.linkssesion}>{!!userId && <Link   to='/useredit/0' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg></Link>}</span> */}
 {/* <span>{!!userId && <Link  to='/useredit/0' >Edit profile</Link>}</span> */}

 {/* <div>{console.log(user)}</div> */}
{/* <span > <img className={styles.imgProfile} src={user.avatar} alt={user.name} /> {!!userId && <Link   to='/useredit/0' ><button>Edit profile</button></Link>}</span> */}


                        

                        {!!myUser?.isAdmin&&
                      
                            <Link to="/dash"><button className={styles.adressed}>ADMIN DASH</button></Link>}
                         
                        <ul className="navbar-nav d-flex flex-row" >

                            {!!userId && <li className="nav-item me-3 me-lg-0">
            
                                    <Link to="/logout" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ margin: "10px" }} fill="white" viewBox="0 0 16 16">
                                        <path d="M8.538 1.02a.5.5 0 1 0-.076.998 6 6 0 1 1-6.445 6.444.5.5 0 0 0-.997.076A7 7 0 1 0 8.538 1.02Z" />
                                        <path d="M7.096 7.828a.5.5 0 0 0 .707-.707L2.707 2.025h2.768a.5.5 0 1 0 0-1H1.5a.5.5 0 0 0-.5.5V5.5a.5.5 0 0 0 1 0V2.732l5.096 5.096Z" />
                                    </svg> </Link>
                            </li>}

                            {/*--------- login---------- */}
                            {!userId && <li className="nav-item me-3 me-lg-0">
                                <Link to="/login">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ margin: "10px" }} fill="white" viewBox="0 0 16 16">
                                        <path d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                                        <path d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                    </svg></Link>
                            </li>}

                            {/*--------- register---------- */}
                            {!userId && <li className="nav-item me-3 me-lg-0">
                                <Link to="/register">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ margin: "10px" }} fill="white" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                        <path d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                    </svg></Link>

                            </li>}
                            {/*--------- back to home---------- */}


                            {location.pathname !== '/' && <li className="nav-item me-3 me-lg-0">
                                <Link to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ margin: "10px" }} fill="white" viewBox="0 0 16 16">
                                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                                    </svg></Link>

                            </li>}
                            <li className="nav-item me-3 me-lg-0 dropdown">

                                <Link to="/cart" style={{ textDecoration: 'none' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{ margin: "10px" }} fill="white" viewBox="0 0 16 16">
                                        <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                    <h5 style={{ margin: "-52px 0px 0px -30px", color: "white" }}>{cartItems.length}</h5>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </Navbar>
            </div >
        )
    }
}