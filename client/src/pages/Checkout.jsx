import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery"
  );

  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (total, item) =>
      total + (item.totalPrice || item.price || 0),
    0
  );

  const deliveryCharge = cart.length > 0 ? 50 : 0;

  const grandTotal = subtotal + deliveryCharge;


  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };


  /* =========================
     PLACE ORDER
  ========================= */

  const handlePlaceOrder = () => {

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      setError("Please fill in all delivery details.");
      return;
    }


    if (formData.phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }


    if (formData.pincode.length !== 6) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }


    /* Create Order */

    const order = {
      id:
        "PR" +
        Date.now().toString().slice(-6),

      items: cart,

      address: {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
      },

      paymentMethod: paymentMethod,

      subtotal: subtotal,

      deliveryCharge: deliveryCharge,

      total: grandTotal,

      status: "Confirmed",

      createdAt: new Date().toISOString(),
    };


    /* Save order */

    const existingOrders =
      JSON.parse(
        localStorage.getItem("playrentOrders")
      ) || [];


    const updatedOrders = [
      ...existingOrders,
      order,
    ];


    localStorage.setItem(
      "playrentOrders",
      JSON.stringify(updatedOrders)
    );


    /* Save latest order */

    localStorage.setItem(
      "playrentLatestOrder",
      JSON.stringify(order)
    );


    /* Clear cart */

    clearCart();


    /* Go to confirmation */

    navigate("/order-confirmation");
  };


  /* =========================
     EMPTY CART
  ========================= */

  if (cart.length === 0) {
    return (
      <div className="checkout-page">

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

          </div>

        </nav>


        <div className="checkout-empty">

          <div className="empty-icon">
            🛒
          </div>

          <h1>
            Your cart is empty
          </h1>

          <p>
            Add some sports equipment before
            proceeding to checkout.
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
    <div className="checkout-page">

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

      </nav>


      {/* ================= MAIN ================= */}

      <main className="checkout-container">

        <div className="checkout-heading">

          <p>
            PLAYRENT CHECKOUT
          </p>

          <h1>
            Complete Your Rental
          </h1>

          <span>
            Enter your delivery details and confirm your rental.
          </span>

        </div>


        {error && (

          <div className="checkout-error">
            {error}
          </div>

        )}


        <div className="checkout-layout">


          {/* ================= LEFT ================= */}

          <div className="checkout-left">


            {/* Delivery Details */}

            <section className="checkout-card">

              <div className="checkout-card-heading">

                <span className="checkout-number">
                  01
                </span>

                <div>

                  <h2>
                    Delivery Details
                  </h2>

                  <p>
                    Where should we deliver your equipment?
                  </p>

                </div>

              </div>


              <div className="form-grid">


                {/* Full Name */}

                <div className="form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />

                </div>


                {/* Phone */}

                <div className="form-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    maxLength="10"
                    onChange={(e) => {

                      const value =
                        e.target.value.replace(
                          /\D/g,
                          ""
                        );

                      setFormData({
                        ...formData,
                        phone: value,
                      });

                      setError("");
                    }}
                  />

                </div>


                {/* Address */}

                <div className="form-group full-width">

                  <label>
                    Delivery Address
                  </label>

                  <textarea
                    name="address"
                    placeholder="House / Street / Area"
                    rows="4"
                    value={formData.address}
                    onChange={handleChange}
                  />

                </div>


                {/* City */}

                <div className="form-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                  />

                </div>


                {/* PIN */}

                <div className="form-group">

                  <label>
                    PIN Code
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    placeholder="6-digit PIN"
                    value={formData.pincode}
                    maxLength="6"
                    onChange={(e) => {

                      const value =
                        e.target.value.replace(
                          /\D/g,
                          ""
                        );

                      setFormData({
                        ...formData,
                        pincode: value,
                      });

                      setError("");
                    }}
                  />

                </div>

              </div>

            </section>


            {/* Payment */}

            <section className="checkout-card">

              <div className="checkout-card-heading">

                <span className="checkout-number">
                  02
                </span>

                <div>

                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Select how you want to pay.
                  </p>

                </div>

              </div>


              <div className="payment-option">

                <label>

                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={
                      paymentMethod ===
                      "Cash on Delivery"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <div className="payment-icon">
                    💵
                  </div>

                  <div>

                    <strong>
                      Cash on Delivery
                    </strong>

                    <p>
                      Pay when your rental is delivered.
                    </p>

                  </div>

                </label>

              </div>

            </section>


            {/* Security */}

            <div className="checkout-security">

              <span>
                🔒
              </span>

              <div>

                <strong>
                  Secure Rental
                </strong>

                <p>
                  Your information is safe with PlayRent.
                </p>

              </div>

            </div>

          </div>


          {/* ================= RIGHT ================= */}

          <aside className="checkout-summary">

            <h2>
              Rental Summary
            </h2>


            {/* Items */}

            <div className="summary-items">

              {cart.map((item, index) => (

                <div
                  className="summary-item"
                  key={index}
                >

                  <div className="summary-item-icon">
                    {item.icon || "🏏"}
                  </div>

                  <div className="summary-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.rentalDays || 1} day
                      {(item.rentalDays || 1) > 1
                        ? "s"
                        : ""}
                    </p>

                  </div>

                  <strong>
                    ₹
                    {item.totalPrice ||
                      item.price ||
                      0}
                  </strong>

                </div>

              ))}

            </div>


            {/* Price */}

            <div className="summary-price">

              <div>

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{subtotal}
                </strong>

              </div>


              <div>

                <span>
                  Delivery
                </span>

                <strong>
                  ₹{deliveryCharge}
                </strong>

              </div>

            </div>


            {/* Total */}

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{grandTotal}
              </strong>

            </div>


            {/* Place Order */}

            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
            >
              Place Rental Order
            </button>


            <Link
              to="/cart"
              className="back-cart-btn"
            >
              ← Back to Cart
            </Link>


            <p className="payment-note">
              Payment method: {paymentMethod}
            </p>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Checkout;