import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {removeCurrentUserToken, removeCurrentUsername}
from '../auth'
// import styled from "styled-components";
// import LogoutIcon from '@mui/icons-material/Logout';
// const Top = styled.header`
//   font-family: "Akaya Telivigala", cursive;
//   font-weight: 100;
//   font-style: italic;
//   font-size: 25px;
//   text-align: center;
//   padding: 0.25em 0;
//   background: #033a8d;
//   color: #fafafa;
//   justify-content: center;
//   align-content: center;
//   width: 100%;
//   z-index: 100;
// `;
const Header = ({userToken, setUserToken, setMyUsername}) => {
    let history = useHistory()	
    return(
        <>
            {/* <Top> */}
            {/* Will need to work in a ternary for admin */}
                {userToken? 
                    <div className="header">
                        <nav>
                            <ul>
                                <Link to="/home">
                                <li className="navBtn">Home</li>
                                </Link>
                                <Link to="/products">
                                <li className="navBtn">All Products</li>
                                </Link>
                                <Link to="/cart">
                                <li className="navBtn">My Cart</li>
                                </Link>
                                <Link to="/order_history">
                                <li className="navBtn">Order History</li>
                                </Link>
                                <button className="logOut"
                                    onClick={() => {
                                    setUserToken(removeCurrentUserToken());
                                    setMyUsername(removeCurrentUsername());
                                history.push("/");
                                }}><LogoutIcon></LogoutIcon> LOGOUT
                                </button>
                            </ul>
                        </nav>
                    </div>
                :
                <nav>
                    <div className="header">
                        <ul>
                            <Link to="/home">
                            <li className="navBtn">Home</li>
                            </Link>
                            <Link to="/products">
                            <li className="navBtn">Products</li>
                            </Link>
                            <Link to="/cart">
                            <li className="navBtn">cart</li>
                            </Link>
                            <Link to="/login">
                            <li className="navBtn"> LOGIN</li>
                            </Link>
                            <Link to="/register">
                            <li className="navBtn">REGISTER</li>
                            </Link>
                        </ul>
                    </div>
                </nav>
                }
            {/* </Top> */}
        </>
    ) 
}
export default Header;

