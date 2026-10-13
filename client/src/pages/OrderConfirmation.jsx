import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = JSON.parse(
      localStorage.getItem("playrentLatestOrder")
    );

    setOrder(savedOrder);
  }, []);

  if (!order) {
    return (
      <div className="confirmation-page">

        {/* Navbar */}
        <nav className="navbar">

          <div className="logo">
            <Link to="/" className="logo-link">
              Play<span>Rent</span>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/equipment">Equipment</Link>
            <Link to="/my-rentals">My Rentals</Link>
            <Link to="/cart">Cart</Link>
          </div>

        </nav>


        <div className="confirmation-empty">

          <div className="confirmation-empty-icon">
            📦
          </div>

          <h1>
            No Order Found
          </h1>

          <p>
            We could not find a recent rental order.
          </p>

          <Link
            to="/equipment"
            className="confirmation-primary-btn"
          >
            Browse Equipment
          </Link>

        </div>

      </div>
    );
  }


  return (
    <div className="confirmation-page">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          <Link to="/" className="logo-link">
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


      {/* ================= MAIN ================= */}

      <main className="confirmation-container">

        {/* Success */}

        <div className="confirmation-success">

          <div className="success-icon">
            ✓
          </div>

          <p className="success-small">
            RENTAL CONFIRMED
          </p>

          <h1>
            Your order is confirmed!
          </h1>

          <p className="success-message">
            Thank you, {order.address?.fullName || "Customer"}.
            Your sports equipment rental has been successfully placed.
          </p>

        </div>


        {/* Order Number */}

        <div className="order-number-card">

          <div>
            <span>
              ORDER NUMBER
            </span>

            <strong>
              #{order.id}
            </strong>
          </div>

          <div className="confirmed-badge">
            Confirmed
          </div>

        </div>


        <div className="confirmation-layout">


          {/* ================= LEFT ================= */}

          <div className="confirmation-left">


            {/* Rental Items */}

            <section className="confirmation-card">

              <div className="confirmation-card-title">

                <h2>
                  Your Rental
                </h2>

                <span>
                  {order.items?.length || 0} item
                  {(order.items?.length || 0) !== 1
                    ? "s"
                    : ""}
                </span>

              </div>


              <div className="confirmation-items">

                {order.items?.map((item, index) => (

                  <div
                    className="confirmation-item"
                    key={index}
                  >

                    <div className="confirmation-item-icon">
                      {item.icon || "🏏"}
                    </div>


                    <div className="confirmation-item-info">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.category || "Sports Equipment"}
                      </p>


                      <div className="item-rental-dates">

                        <span>
                          Start:{" "}
                          {item.startDate || "N/A"}
                        </span>

                        <span>
                          Return:{" "}
                          {item.returnDate || "N/A"}
                        </span>

                      </div>

                    </div>


                    <div className="confirmation-item-price">

                      <span>
                        {item.rentalDays || 1} day
                        {(item.rentalDays || 1) > 1
                          ? "s"
                          : ""}
                      </span>

                      <strong>
                        ₹
                        {item.totalPrice ||
                          item.price ||
                          0}
                      </strong>

                    </div>

                  </div>

                ))}

              </div>

            </section>


            {/* Delivery Address */}

            <section className="confirmation-card">

              <div className="confirmation-card-title">

                <h2>
                  Delivery Details
                </h2>

              </div>


              <div className="delivery-details">

                <div className="delivery-icon">
                  📍
                </div>

                <div>

                  <strong>
                    {order.address?.fullName}
                  </strong>

                  <p>
                    {order.address?.address}
                  </p>

                  <p>
                    {order.address?.city} -{" "}
                    {order.address?.pincode}
                  </p>

                  <p>
                    Phone: {order.address?.phone}
                  </p>

                </div>

              </div>

            </section>


            {/* Payment */}

            <section className="confirmation-card">

              <div className="confirmation-card-title">

                <h2>
                  Payment
                </h2>

              </div>


              <div className="payment-details">

                <div className="payment-details-icon">
                  💵
                </div>

                <div>

                  <strong>
                    {order.paymentMethod ||
                      "Cash on Delivery"}
                  </strong>

                  <p>
                    Payment will be collected when
                    your rental is delivered.
                  </p>

                </div>

              </div>

            </section>

          </div>


          {/* ================= RIGHT ================= */}

          <aside className="confirmation-summary">

            <h2>
              Order Summary
            </h2>


            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{order.subtotal || 0}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                Delivery
              </span>

              <strong>
                ₹{order.deliveryCharge || 0}
              </strong>

            </div>


            <div className="summary-divider"></div>


            <div className="summary-total-row">

              <span>
                Total
              </span>

              <strong>
                ₹{order.total || 0}
              </strong>

            </div>


            <div className="confirmation-note">

              <span>
                ✓
              </span>

              <p>
                Your rental order has been successfully
                saved. You can view it anytime from
                My Rentals.
              </p>

            </div>


            <Link
              to="/my-rentals"
              className="my-rentals-btn"
            >
              View My Rentals
            </Link>


            <Link
              to="/equipment"
              className="continue-shopping-btn"
            >
              Continue Shopping
            </Link>

          </aside>

        </div>

      </main>


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

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © 2026 PlayRent. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default OrderConfirmation;