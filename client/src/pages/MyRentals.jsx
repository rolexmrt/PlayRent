import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./MyRentals.css";


function MyRentals() {

  const [orders, setOrders] = useState([]);


  /* =========================
     LOAD ORDERS
  ========================= */

  useEffect(() => {

    const savedOrders = JSON.parse(
      localStorage.getItem("playrentOrders")
    );

    const latestOrder = JSON.parse(
      localStorage.getItem("playrentLatestOrder")
    );


    if (savedOrders && savedOrders.length > 0) {

      setOrders(savedOrders);

    } else if (latestOrder) {

      setOrders([latestOrder]);

    } else {

      setOrders([]);

    }

  }, []);


  /* =========================
     CANCEL ORDER
  ========================= */

  const handleCancelOrder = (orderId) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this rental?"
    );

    if (!confirmCancel) {
      return;
    }


    const updatedOrders = orders.map((order) => {

      if (order.id === orderId) {

        return {
          ...order,
          status: "Cancelled",
        };

      }

      return order;

    });


    setOrders(updatedOrders);


    localStorage.setItem(
      "playrentOrders",
      JSON.stringify(updatedOrders)
    );


    const latestOrder = JSON.parse(
      localStorage.getItem("playrentLatestOrder")
    );


    if (
      latestOrder &&
      latestOrder.id === orderId
    ) {

      localStorage.setItem(
        "playrentLatestOrder",
        JSON.stringify({
          ...latestOrder,
          status: "Cancelled",
        })
      );

    }

  };


  /* =========================
     EMPTY STATE
  ========================= */

  if (orders.length === 0) {

    return (

      <div className="my-rentals-page">

        {/* Navbar */}

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


        {/* Empty */}

        <main className="rentals-empty">

          <div className="empty-rentals-icon">
            🏸
          </div>

          <h1>
            No Rentals Yet
          </h1>

          <p>
            You haven't rented any sports equipment yet.
          </p>

          <Link
            to="/equipment"
            className="browse-equipment-btn"
          >
            Browse Equipment
          </Link>

        </main>

      </div>

    );

  }


  return (

    <div className="my-rentals-page">


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

          <Link to="/cart">
            Cart
          </Link>

          <Link to="/my-rentals">
            My Rentals
          </Link>

        </div>

      </nav>


      {/* =========================
          MAIN
      ========================= */}

      <main className="rentals-container">


        <div className="rentals-header">

          <div>

            <p>
              YOUR ACCOUNT
            </p>

            <h1>
              My Rentals
            </h1>

            <span>
              View and manage your sports equipment rentals.
            </span>

          </div>


          <Link
            to="/equipment"
            className="rent-more-btn"
          >
            Rent More Equipment
          </Link>

        </div>


        {/* =========================
            ORDERS
        ========================= */}

        <div className="rentals-list">

          {orders.map((order) => (

            <div
              className="rental-order-card"
              key={order.id}
            >


              {/* Order Header */}

              <div className="rental-order-header">

                <div>

                  <span className="order-label">
                    ORDER NUMBER
                  </span>

                  <strong>
                    #{order.id}
                  </strong>

                </div>


                <div
                  className={
                    order.status === "Cancelled"
                      ? "status cancelled"
                      : "status confirmed"
                  }
                >
                  {order.status || "Confirmed"}
                </div>

              </div>


              {/* Equipment */}

              <div className="rental-items">

                {order.items?.map(
                  (item, index) => (

                    <div
                      className="rental-item"
                      key={index}
                    >

                      <div className="rental-item-icon">
                        {item.icon || "🏏"}
                      </div>


                      <div className="rental-item-details">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          {item.category ||
                            "Sports Equipment"}
                        </p>


                        <div className="rental-dates">

                          <span>
                            <strong>
                              Start:
                            </strong>{" "}
                            {item.startDate ||
                              "N/A"}
                          </span>

                          <span>
                            <strong>
                              Return:
                            </strong>{" "}
                            {item.returnDate ||
                              "N/A"}
                          </span>

                          <span>
                            <strong>
                              Days:
                            </strong>{" "}
                            {item.rentalDays ||
                              1}
                          </span>

                        </div>

                      </div>


                      <div className="rental-item-price">

                        ₹
                        {item.totalPrice ||
                          item.price ||
                          0}

                      </div>

                    </div>

                  )
                )}

              </div>


              {/* Delivery */}

              {order.address && (

                <div className="rental-delivery">

                  <div className="delivery-title">
                    📍 Delivery Address
                  </div>

                  <p>
                    {order.address.fullName}
                  </p>

                  <p>
                    {order.address.address}
                  </p>

                  <p>
                    {order.address.city} -{" "}
                    {order.address.pincode}
                  </p>

                  <p>
                    Phone: {order.address.phone}
                  </p>

                </div>

              )}


              {/* Bottom */}

              <div className="rental-order-footer">


                <div className="rental-total">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{order.total || 0}
                  </strong>

                </div>


                {order.status !== "Cancelled" && (

                  <button
                    className="cancel-rental-btn"
                    onClick={() =>
                      handleCancelOrder(order.id)
                    }
                  >
                    Cancel Rental
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      </main>


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

export default MyRentals;