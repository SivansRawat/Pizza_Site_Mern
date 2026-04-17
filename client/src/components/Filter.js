import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterPizzas } from "../actions/pizzaActions";
export default function Filter() {
    const dispatch = useDispatch()
    const[searchkey , setsearchkey] = useState('')
    const[category , setcategory] = useState('all')
    return (
        <div className="filter-wrap">
            <div className="filter-card shadow-lg p-3 mb-5 bg-white rounded">

                    <div>
                      <input
                      onChange={(e)=>{setsearchkey(e.target.value)}}
                      value={searchkey} type="text" className="form-control w-100" placeholder="Search pizzas"/>
                    </div>
                    <div>
                        <select className="form-control w-100" value={category} onChange={(e)=>setcategory(e.target.value)}>
                            <option value="all">All</option>
                            <option value="veg">Veg</option>
                            <option value="nonveg">Non Veg</option>
                        </select>
                    </div>
                    <div>
                       <button className='btn w-100' onClick={()=>{dispatch(filterPizzas(searchkey , category))}}>
                        <i className="fas fa-search mr-2"></i>FILTER
                       </button>
                    </div>

            </div>
        </div>
    )
}
