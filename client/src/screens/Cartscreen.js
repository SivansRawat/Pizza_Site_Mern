import React from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {addToCart} from '../actions/cartActions'
import {deleteFromCart} from '../actions/cartActions'
import Checkout from '../components/Checkout'
import AOS from 'aos'
import 'aos/dist/aos.css';
export default function Cartscreen() {
    
    AOS.init()
    const cartstate = useSelector(state=>state.cartReducer)
    const cartItems = cartstate.cartItems
    var subtotal = cartItems.reduce((x , item)=> x+item.price , 0)
    const dispatch = useDispatch()
    return (
        <div className="cart-page">
            <div className="row justify-content-center p-2" data-aos='fade-down'>

                  <div className="col-md-6">
                       <div className="section-heading">
                         <h2>My Cart</h2>
                         <p>Review your slices before checkout.</p>
                       </div>
                       
                       {cartItems.length === 0 && (
                        <div className="empty-cart">
                            Your cart is empty. Add a pizza and it will appear here.
                        </div>
                       )}

                       {cartItems.map(item=>{
                           return <div className="cart-card flex-container" key={item._id + item.varient}>

                           <div className='cart-copy'>
                               <h1>{item.name} [{item.varient}]</h1>
                               <p>Price : {item.quantity} * {item.prices[0][item.varient]} = Rs {item.price}</p>
                               <span>Quantity : </span>
                               <i className="fa fa-plus" aria-hidden="true" onClick={()=>{dispatch(addToCart(item , item.quantity+1 , item.varient))}}></i>
                               <b>{item.quantity}</b>
                               <i className="fa fa-minus" aria-hidden="true" onClick={()=>{dispatch(addToCart(item , item.quantity-1 , item.varient))}}></i>
                           </div>

                           <div className='cart-image'>
                               <img src={item.image} alt={item.name}/>
                           </div>
                           <div className='cart-delete'>
                           <i className="fa fa-trash" aria-hidden="true" onClick={()=>{dispatch(deleteFromCart(item))}}></i>
                           </div>

                      </div>
                       })}

                       

                  </div>

                  <div className="col-md-4">
                    <div className="cart-summary">
                      <h2>SubTotal</h2>
                      <p>{cartItems.length} item{cartItems.length === 1 ? '' : 's'} in your cart</p>
                      <h2>Rs {subtotal} /-</h2>
                      <Checkout subtotal={subtotal} />
                    </div>
                  </div>

            </div>
        </div>
    )
}
