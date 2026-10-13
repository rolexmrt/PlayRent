import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
  } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + (item.totalPrice || item.price || 0),
    0
  );

  // Delivery charge
  const deliveryCharge = cart.length > 0 ? 50 : 0;

  // Final total
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="cart-page">

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
        </div>

        <div className="nav-actions">

          <Link to="/equipment" className="cart-link">
            Continue Shopping
          </Link>

          <Link to="/login" className="login-btn">
            Login
          </Link>

        </div>

      </nav>


      {/* Cart Content */}
      <main className="cart-container">

        <div className="cart-header">

          <div>
            <p className="cart-label">
              YOUR RENTALS
            </p>

            <h1>
              Shopping Cart
            </h1>
          </div>

          {cart.length > 0 && (
            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          )}

        </div>


        {/* Empty Cart */}
        {cart.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              You haven't added any sports equipment yet.
            </p>

            <Link
              to="/equipment"
              className="primary-btn"
            >
              Browse Equipment
            </Link>

          </div>

        ) : (

          <div className="cart-layout">

            {/* Cart Items */}
            <div className="cart-items">

              {cart.map((item, index) => (

                <div
                  className="cart-item"
                  key={index}
                >

                  {/* Product Icon */}
                  <div className="cart-item-image">

                    {item.icon || "🏏"}

                  </div>


                  {/* Product Information */}
                  <div className="cart-item-info">

                    <span className="cart-item-category">
                      {item.category || "SPORTS"}
                    </span>

                    <h2>
                      {item.name}
                    </h2>


                    <p className="cart-price">
                      ₹{item.price} / day
                    </p>


                    {/* Rental Dates */}
                    <div className="rental-info">

                      <div>
                        <span>
                          Start Date
                        </span>

                        <strong>
                          {item.startDate || "Not selected"}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Return Date
                        </span>

                        <strong>
                          {item.returnDate || "Not selected"}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Rental Period
                        </span>

                        <strong>
                          {item.rentalDays || 1} day
                          {(item.rentalDays || 1) > 1
                            ? "s"
                            : ""}
                        </strong>
                      </div>

                    </div>


                    {/* Remove */}
                    <button
                      className="remove-cart-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      🗑 Remove
                    </button>

                  </div>


                  {/* Item Total */}
                  <div className="cart-item-total">

                    <span>
                      Item Total
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


            {/* Order Summary */}
            <div className="cart-summary">

              <h2>
                Order Summary
              </h2>


              <div className="summary-row">

                <span>
                  Items
                </span>

                <span>
                  {cart.length}
                </span>

              </div>


              <div className="summary-row">

                <span>
                  Rental Subtotal
                </span>

                <span>
                  ₹{subtotal}
                </span>

              </div>


              <div className="summary-row">

                <span>
                  Delivery
                </span>

                <span>
                  ₹{deliveryCharge}
                </span>

              </div>


              <div className="summary-divider"></div>


              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{grandTotal}
                </strong>

              </div>


              <Link
                to="/checkout"
                className="checkout-btn"
              >
                Proceed to Checkout →
              </Link>


              <Link
                to="/equipment"
                className="continue-shopping"
              >
                ← Continue Shopping
              </Link>

            </div>

          </div>

        )}

      </main>


      {/* Footer */}
      <footer>

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

        <p className="copyright">
          © 2026 PlayRent.
          All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Cart;