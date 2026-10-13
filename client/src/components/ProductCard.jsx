import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <span>{product.icon}</span>
      </div>

      <div className="product-content">
        <p className="product-sport">{product.sport}</p>

        <h3>{product.name}</h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-bottom">
          <div>
            <strong>₹{product.price}</strong>
            <span> / day</span>
          </div>

          <Link to={`/product/${product.id}`}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;