import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaActions";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import Pizza from "../components/Pizza";
export default function Homescreen() {
  const dispatch = useDispatch();

  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);

  const { pizzas, error, loading } = pizzasstate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <div>
      <section className="hero page-shell">
        <div>
          <span className="hero-kicker"><i className="fas fa-fire"></i> Fresh from the oven</span>
          <h1>Hot pizza, bright flavors, easy ordering.</h1>
          <p>
            Pick your favorite crust, choose the size, and get a cozy pizza night moving in just a few taps.
          </p>
          <div className="hero-actions">
            <span className="hero-chip"><i className="fas fa-mobile-alt"></i> Mobile friendly</span>
            <span className="hero-chip"><i className="fas fa-motorcycle"></i> Fast checkout</span>
          </div>
        </div>
        <div className="hero-preview">
          <img
            src="https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80"
            alt="Fresh margherita pizza"
          />
          <strong>Chef's hot pick</strong>
          <span>Melty cheese, crisp edges, and a sauce with some sparkle.</span>
        </div>
      </section>

      <Filter/>

      <div className="section-heading page-shell">
        <h2>Choose your pizza</h2>
        <p>Fresh favorites, simple options, and cart controls made for thumbs.</p>
      </div>

      <div className="pizza-grid">
       
        {loading ? (
          <Loading/>
        ) : error ? (
          <Error error='Something went wrong'/>
        ) : (
          pizzas.map((pizza) => {
            return (
              <div className="pizza-grid-item" key={pizza._id}>
                <Pizza pizza={pizza} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
