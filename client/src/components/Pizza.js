import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {useDispatch} from 'react-redux'
import { addToCart } from "../actions/cartActions";
import AOS from 'aos'
import 'aos/dist/aos.css';
export default function Pizza({ pizza }) {

  
  useEffect(() => {
    AOS.init({ once: true, duration: 650 });
  }, []);
 

  const [quantity, setquantity] = useState(1);
  const [varient, setvarient] = useState("small");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch()
  function addtocart()
  {
    dispatch(addToCart(pizza , quantity , varient))
  }

  return (
    <div
     data-aos='zoom-in'
      className="pizza-card shadow-lg p-3 mb-5 bg-white rounded"
      key={pizza._id}
    >
      <div className="pizza-media" onClick={handleShow}>
        <img
          src={pizza.image}
          alt={pizza.name}
          className="img-fluid"
        />
        <span className={`pizza-badge ${pizza.category === "veg" ? "veg-badge" : "nonveg-badge"}`}>
          {pizza.category}
        </span>
      </div>

      <div className="pizza-body">
        <h1 className="pizza-title">{pizza.name}</h1>

      <div className="pizza-controls flex-container">
        <div>
          <p>Varients</p>
          <select
            className="form-control"
            value={varient}
            onChange={(e) => {
              setvarient(e.target.value);
            }}
          >
            {pizza.varients.map((varient) => {
              return <option value={varient} key={varient}>{varient}</option>;
            })}
          </select>
        </div>

        <div>
          <p>Quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setquantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return <option value={i + 1} key={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="pizza-footer flex-container">
        <div>
          <h1 className="pizza-price">
            Rs {pizza.prices[0][varient] * quantity}
          </h1>
        </div>
        <div>
          <button className="btn" onClick={addtocart}>
            <i className="fas fa-cart-plus mr-2"></i>ADD
          </button>
        </div>
      </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img src={pizza.image} alt={pizza.name} className="img-fluid"/>
          <p>{pizza.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
