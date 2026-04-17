import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";
export default function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch()
  return (
    <div className="app-navbar">
      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
        <a className="navbar-brand" href="/">
          <span className="brand-mark">
            <span className="brand-icon"><i className="fas fa-pizza-slice"></i></span>
            PIZZA PARADISE
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {currentUser ? (
              <div className="dropdown mt-2">
              <button className="dropdown-toggle btn btn-link" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-user-circle mr-1"></i>{currentUser.name}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="/orders"><i className="fas fa-receipt mr-2"></i>Orders</a>
                <button className="dropdown-item btn btn-link" onClick={()=>{dispatch(logoutUser())}}>Logout</button>
              </div>
            </div>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <i className="fas fa-user mr-1"></i>Login
                </a>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link" href="/cart">
                <span className="cart-pill"><i className="fas fa-shopping-bag"></i>Cart <span className="cart-count">{cartstate.cartItems.length}</span></span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
