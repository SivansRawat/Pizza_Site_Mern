import axios from "axios";
import { getAuthConfig } from "../utils/authConfig";

export const placeOrder=(token , subtotal)=>async (dispatch , getState)=>{


      dispatch({type:'PLACE_ORDER_REQUEST'})
      const cartItems = getState().cartReducer.cartItems
      
      try {

         const response = await axios.post('/api/orders/placeorder' , {token , subtotal , cartItems}, getAuthConfig(getState))
         dispatch({type:'PLACE_ORDER_SUCCESS'})
         console.log(response);
          
      } catch (error) {
        dispatch({type:'PLACE_ORDER_FAILED'})
          console.log(error);
          
      }



}


// export const getUserOrders=()=>async (dispatch,getState)=>{

//   dispatch({type:'GET_USER_ORDERS_REQUEST'})
  
//   try {
//       const response = await axios.post('/api/orders/getuserorders' , {userid : currentUser._id}, getAuthConfig(getState))

      
//       console.log(response);
      
//       dispatch({type:'GET_USER_ORDERS_SUCCESS' , payload : response.data})
//   } catch (error) {
//       dispatch({type:'GET_USER_ORDERS_FAILED' , payload : error})
//   }

// }



export const getUserOrders = () => async (dispatch, getState) => {

  dispatch({ type: 'GET_USER_ORDERS_REQUEST' });

  const currentUser = getState().loginUserReducer.currentUser; // ✅ FIX

  try {
    const response = await axios.post(
      '/api/orders/getuserorders',
      { userid: currentUser._id },
      getAuthConfig(getState)
    );

    console.log(response);

    dispatch({
      type: 'GET_USER_ORDERS_SUCCESS',
      payload: response.data
    });

  } catch (error) {
    dispatch({
      type: 'GET_USER_ORDERS_FAILED',
      payload: error
    });
  }
};

export const getAllOrders=()=>async (dispatch,getState)=>{

  // const currentUser = getState().loginUserReducer.currentUser
  dispatch({type:'GET_ALLORDERS_REQUEST'})
  
  try {
      const response = await axios.get('/api/orders/getallorders', getAuthConfig(getState))

      
      console.log(response);
      
      dispatch({type:'GET_ALLORDERS_SUCCESS' , payload : response.data})
  } catch (error) {
      dispatch({type:'GET_ALLORDERS_FAILED' , payload : error})
  }

}

export const deliverOrder=(orderid)=>async (dispatch, getState)=>{



    try {
      const response = await axios.post('/api/orders/deliverorder' , {orderid}, getAuthConfig(getState))
      console.log(response);
      alert('Order Delivered')
      const orders = await axios.get('/api/orders/getallorders', getAuthConfig(getState))
      dispatch({type:'GET_ALLORDERS_SUCCESS' , payload:orders.data})
    } catch (error) {
      console.log(error);
    }


}
