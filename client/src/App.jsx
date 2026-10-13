import { Link, Routes, Route, BrowserRouter } from "react-router-dom";

import Equipment from "./pages/Equipment";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import MyRentals from "./pages/MyRentals";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import footballImage from "./assets/football.jpg";
import cricketImage from "./assets/cricket.jpg";

import "./App.css";


/* =====================================================
   HOME PAGE
===================================================== */

function Home() {
  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          <Link
            to="/"
            className="logo-link"
          >
            Play<span>Rent</span>
          </Link>
        </div>


        <div className="nav-links">

          <a href="#sports">
            Sports
          </a>

          <Link to="/equipment">
            Equipment
          </Link>

          <a href="#how-it-works">
            How It Works
          </a>

          <Link to="/my-rentals">
            My Rentals
          </Link>

          <Link to="/cart">
            Cart
          </Link>

          <Link
            to="/login"
            className="login-link"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="signup-btn"
          >
            Sign Up
          </Link>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small-text">
            SPORTS EQUIPMENT RENTAL
          </p>

          <h1>
            PLAY MORE.
            <br />
            OWN LESS.
          </h1>

          <p className="hero-description">
            Your Game. Our Gear.
            <br />
            Rent quality sports equipment
            whenever you need it.
          </p>

          <div className="hero-buttons">

            <Link
              to="/equipment"
              className="primary-btn"
            >
              Browse Equipment
            </Link>

            <a
              href="#how-it-works"
              className="secondary-btn"
            >
              How It Works
            </a>

          </div>

        </div>

      </section>


      {/* ================= SPORTS ================= */}

      <section
        className="sports-section"
        id="sports"
      >

        <div className="section-heading">

          <p>
            CHOOSE YOUR SPORT
          </p>

          <h2>
            What do you play?
          </h2>

        </div>


        <div className="sports-grid">


          {/* Football */}

          <Link
            to="/equipment"
            className="sport-card"
          >

            <img
              src={footballImage}
              alt="Football"
              className="sport-card-image"
            />

            <div className="sport-card-content">

              <h3>
                Football
              </h3>

              <p>
                Boots, gloves and
                football gear.
              </p>

            </div>

          </Link>


          {/* Cricket */}

          <Link
            to="/equipment"
            className="sport-card"
          >

            <img
              src={cricketImage}
              alt="Cricket"
              className="sport-card-image"
            />

            <div className="sport-card-content">

              <h3>
                Cricket
              </h3>

              <p>
                Bats, balls and
                cricket equipment.
              </p>

            </div>

          </Link>


          {/* Badminton */}

          <Link
            to="/equipment"
            className="sport-card"
          >

            <div className="sport-card-icon">
              🏸
            </div>

            <div className="sport-card-content">

              <h3>
                Badminton
              </h3>

              <p>
                Rackets and equipment
                for your game.
              </p>

            </div>

          </Link>

        </div>

      </section>


      {/* ================= POPULAR RENTALS ================= */}

      <section className="equipment-section">

        <div className="section-heading">

          <p>
            POPULAR RENTALS
          </p>

          <h2>
            Gear up for your game
          </h2>

        </div>


        <div className="equipment-grid">


          {/* Football Boots */}

          <div className="equipment-card">

            <div className="equipment-icon">
              ⚽
            </div>

            <div className="equipment-card-content">

              <p className="equipment-category">
                Football
              </p>

              <h3>
                Football Boots
              </h3>

              <div className="equipment-bottom">

                <strong>
                  ₹150
                  <span>/day</span>
                </strong>

                <Link
                  to="/product/1"
                  className="rent-btn"
                >
                  Rent
                </Link>

              </div>

            </div>

          </div>


          {/* Cricket Bat */}

          <div className="equipment-card">

            <div className="equipment-icon">
              🏏
            </div>

            <div className="equipment-card-content">

              <p className="equipment-category">
                Cricket
              </p>

              <h3>
                Cricket Bat
              </h3>

              <div className="equipment-bottom">

                <strong>
                  ₹200
                  <span>/day</span>
                </strong>

                <Link
                  to="/product/4"
                  className="rent-btn"
                >
                  Rent
                </Link>

              </div>

            </div>

          </div>


          {/* Badminton Racket */}

          <div className="equipment-card">

            <div className="equipment-icon">
              🏸
            </div>

            <div className="equipment-card-content">

              <p className="equipment-category">
                Badminton
              </p>

              <h3>
                Badminton Racket
              </h3>

              <div className="equipment-bottom">

                <strong>
                  ₹100
                  <span>/day</span>
                </strong>

                <Link
                  to="/product/7"
                  className="rent-btn"
                >
                  Rent
                </Link>

              </div>

            </div>

          </div>


          {/* Goalkeeper Gloves */}

          <div className="equipment-card">

            <div className="equipment-icon">
              🧤
            </div>

            <div className="equipment-card-content">

              <p className="equipment-category">
                Football
              </p>

              <h3>
                Goalkeeper Gloves
              </h3>

              <div className="equipment-bottom">

                <strong>
                  ₹120
                  <span>/day</span>
                </strong>

                <Link
                  to="/product/3"
                  className="rent-btn"
                >
                  Rent
                </Link>

              </div>

            </div>

          </div>

        </div>


        <div className="view-all-container">

          <Link
            to="/equipment"
            className="view-all-btn"
          >
            View All Equipment
          </Link>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section
        className="how-section"
        id="how-it-works"
      >

        <div className="section-heading">

          <p>
            SIMPLE PROCESS
          </p>

          <h2>
            How PlayRent works
          </h2>

        </div>


        <div className="steps-grid">


          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              🔍
            </div>

            <h3>
              Choose Equipment
            </h3>

            <p>
              Browse our collection
              and choose the equipment
              you need.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              📅
            </div>

            <h3>
              Select Dates
            </h3>

            <p>
              Select your rental
              start date and return
              date.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              🛒
            </div>

            <h3>
              Place Your Order
            </h3>

            <p>
              Add equipment to your
              cart and provide your
              delivery details.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              04
            </div>

            <div className="step-icon">
              🎮
            </div>

            <h3>
              Play & Return
            </h3>

            <p>
              Enjoy your game and
              return the equipment
              after your rental.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="cta-section">

        <div className="cta-content">

          <p>
            READY TO PLAY?
          </p>

          <h2>
            Your next game starts here.
          </h2>

          <Link
            to="/equipment"
            className="cta-btn"
          >
            Explore Equipment
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-content">


          <div className="footer-brand">

            <div className="logo">

              <Link
                to="/"
                className="logo-link"
              >
                Play<span>Rent</span>
              </Link>

            </div>

            <p>
              Rent sports equipment.
              Play your game.
            </p>

          </div>


          <div className="footer-links">

            <h4>
              Quick Links
            </h4>

            <Link to="/">
              Home
            </Link>

            <Link to="/equipment">
              Equipment
            </Link>

            <Link to="/my-rentals">
              My Rentals
            </Link>

            <Link to="/cart">
              Cart
            </Link>

          </div>


          <div className="footer-links">

            <h4>
              Account
            </h4>

            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Create Account
            </Link>

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © 2026 PlayRent.
            All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}


/* =====================================================
   APP
===================================================== */

function App() {

  return (

    <AuthProvider>

      <CartProvider>

        <BrowserRouter>

          <Routes>

            {/* Home */}

            <Route
              path="/"
              element={<Home />}
            />


            {/* Equipment */}

            <Route
              path="/equipment"
              element={<Equipment />}
            />


            {/* Product */}

            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />


            {/* Cart */}

            <Route
              path="/cart"
              element={<Cart />}
            />


            {/* Checkout */}

            <Route
              path="/checkout"
              element={<Checkout />}
            />


            {/* Order Confirmation */}

            <Route
              path="/order-confirmation"
              element={<OrderConfirmation />}
            />


            {/* My Rentals */}

            <Route
              path="/my-rentals"
              element={<MyRentals />}
            />


            {/* Login */}

            <Route
              path="/login"
              element={<Login />}
            />


            {/* Register */}

            <Route
              path="/register"
              element={<Register />}
            />

          </Routes>

        </BrowserRouter>

      </CartProvider>

    </AuthProvider>

  );
}


export default App;