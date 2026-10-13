import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import ReviewSection from "../components/ReviewSection.jsx";

import "./ProductDetails.css";


import products from "../data/products";


function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();


  const product = products.find((item) => item.id === Number(id));


  const [startDate, setStartDate] = useState("");

  const [returnDate, setReturnDate] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  /* =========================
     CALCULATE RENTAL DAYS
  ========================= */

  const calculateDays = () => {

    if (!startDate || !returnDate) {
      return 0;
    }

    const start = new Date(startDate);

    const end = new Date(returnDate);

    const difference =
      end.getTime() - start.getTime();

    const days =
      Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      ) + 1;

    return days > 0 ? days : 0;
  };


  const rentalDays = calculateDays();

  const totalPrice =
    rentalDays * (product?.price || 0);


  /* =========================
     ADD TO CART
  ========================= */

  const handleAddToCart = () => {

    setError("");

    setSuccess("");


    if (!startDate) {
      setError("Please select a rental start date.");
      return;
    }


    if (!returnDate) {
      setError("Please select a return date.");
      return;
    }


    if (rentalDays <= 0) {
      setError(
        "Return date must be after the start date."
      );

      return;
    }


    const item = {
      id: product.id,

      name: product.name,

      category: product.sport,

      price: product.price,

      icon: product.icon,

      startDate: startDate,

      returnDate: returnDate,

      rentalDays: rentalDays,

      totalPrice: totalPrice,
    };


    addToCart(item);

    setSuccess(
      "Equipment added to your cart successfully!"
    );
  };


  /* =========================
     PRODUCT NOT FOUND
  ========================= */

  if (!product) {

    return (
      <div className="product-page">

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

            <Link to="/">
              Home
            </Link>

            <Link to="/equipment">
              Equipment
            </Link>

            <Link to="/cart">
              Cart
            </Link>

          </div>

        </nav>


        <div className="product-not-found">

          <h1>
            Product Not Found
          </h1>

          <p>
            The equipment you are looking for
            does not exist.
          </p>

          <Link
            to="/equipment"
            className="primary-btn"
          >
            Browse Equipment
          </Link>

        </div>

      </div>
    );
  }


  return (
    <div className="product-page">

      {/* =========================
          NAVBAR
      ========================= */}

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

      </nav>


      {/* =========================
          PRODUCT
      ========================= */}

      <main className="product-container">

        <div className="product-layout">


          {/* Product Visual */}

          <div className="product-image-box">

            <div className="product-large-icon">
              {product.icon}
            </div>

          </div>


          {/* Product Information */}

          <div className="product-info">

            <p className="product-category">
              {product.category}
            </p>

            <h1>
              {product.name}
            </h1>

            <p className="product-description">
              {product.description}
            </p>


            {/* Price */}

            <div className="product-price-box">

              <strong>
                ₹{product.price}
              </strong>

              <span>
                / day
              </span>

            </div>


            {/* Rental Dates */}

            <div className="rental-date-box">

              <h2>
                Select Rental Dates
              </h2>


              <div className="date-fields">


                <div className="date-field">

                  <label>
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={startDate}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) => {

                      setStartDate(
                        e.target.value
                      );

                      setError("");

                      setSuccess("");
                    }}
                  />

                </div>


                <div className="date-field">

                  <label>
                    Return Date
                  </label>

                  <input
                    type="date"
                    value={returnDate}
                    min={startDate || undefined}
                    onChange={(e) => {

                      setReturnDate(
                        e.target.value
                      );

                      setError("");

                      setSuccess("");
                    }}
                  />

                </div>

              </div>


              {/* Rental Summary */}

              {rentalDays > 0 && (

                <div className="rental-summary">

                  <div>
                    <span>
                      Rental Days
                    </span>

                    <strong>
                      {rentalDays}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Total
                    </span>

                    <strong>
                      ₹{totalPrice}
                    </strong>
                  </div>

                </div>

              )}

            </div>


            {/* Error */}

            {error && (

              <div className="product-error">
                {error}
              </div>

            )}


            {/* Success */}

            {success && (

              <div className="product-success">
                {success}
              </div>

            )}


            {/* Buttons */}

            <div className="product-buttons">

              <button
                className="add-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>


              <button
                className="view-cart-btn"
                onClick={() => navigate("/cart")}
              >
                View Cart
              </button>

            </div>


            {/* Info */}

            <div className="product-features">

              <div>
                <span>✓</span>
                Quality Equipment
              </div>

              <div>
                <span>✓</span>
                Flexible Rental Dates
              </div>

              <div>
                <span>✓</span>
                Easy Return
              </div>

            </div>

          </div>

        </div>

      </main>


      {/* =========================
          REVIEWS
      ========================= */}

      <ReviewSection
        productId={product.id}
      />


      {/* =========================
          FOOTER
      ========================= */}

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

            <Link to="/cart">
              Cart
            </Link>

            <Link to="/my-rentals">
              My Rentals
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

export default ProductDetails;