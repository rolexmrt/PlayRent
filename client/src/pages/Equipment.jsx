import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import "./Equipment.css";

const sports = [
  { name: "All", icon: "✦" },
  { name: "Football", icon: "⚽" },
  { name: "Cricket", icon: "🏏" },
  { name: "Badminton", icon: "🏸" },
];

function Equipment() {
  const [selectedSport, setSelectedSport] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [availabilityOnly, setAvailabilityOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSport =
        selectedSport === "All" || product.sport === selectedSport;

      const matchesSearch = [
        product.name,
        product.sport,
        product.category,
        product.description,
      ].some((value) => value.toLowerCase().includes(search));

      const matchesAvailability =
        !availabilityOnly || product.available > 0;

      return matchesSport && matchesSearch && matchesAvailability;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedSport, searchTerm, sortBy, availabilityOnly]);

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <div className="catalog-hero-inner">
          <div className="catalog-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Equipment</span>
          </div>

          <p className="catalog-eyebrow">THE PLAYRENT COLLECTION</p>
          <h1>Find your game gear.</h1>
          <p className="catalog-intro">
            Quality sports equipment when you need it. Choose your gear,
            select your dates, and get ready to play.
          </p>

          <div className="catalog-stats">
            <div><strong>{products.length}+</strong><span>Gear options</span></div>
            <div><strong>3</strong><span>Sports categories</span></div>
            <div><strong>₹50</strong><span>Starting per day</span></div>
          </div>
        </div>
      </section>

      <section className="catalog-content">
        <div className="catalog-title-row">
          <div>
            <p className="catalog-eyebrow">BROWSE EQUIPMENT</p>
            <h2>Gear up for your next game</h2>
            <p className="catalog-muted">Find the right equipment for your next session.</p>
          </div>
          <span className="catalog-result-count">
            {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="catalog-controls">
          <label className="catalog-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search bats, boots, rackets..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search equipment"
            />
            {searchTerm && (
              <button type="button" onClick={() => setSearchTerm("")} aria-label="Clear search">
                ×
              </button>
            )}
          </label>

          <label className="catalog-sort">
            <span>Sort by</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        <div className="catalog-filter-row" aria-label="Filter by sport">
          {sports.map((sport) => (
            <button
              key={sport.name}
              type="button"
              className={`catalog-filter ${selectedSport === sport.name ? "active" : ""}`}
              onClick={() => setSelectedSport(sport.name)}
              aria-pressed={selectedSport === sport.name}
            >
              <span>{sport.icon}</span>{sport.name}
            </button>
          ))}
          <label className="availability-toggle">
            <input
              type="checkbox"
              checked={availabilityOnly}
              onChange={(event) => setAvailabilityOnly(event.target.checked)}
            />
            <span>Available only</span>
          </label>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="catalog-grid">
            {filteredProducts.map((product) => (
              <article className="catalog-product" key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  className="catalog-product-visual"
                  aria-label={`View ${product.name}`}
                >
                  <span className="catalog-product-icon">{product.icon}</span>
                  <span className="catalog-product-tag">{product.sport}</span>
                  {product.available > 0 && (
                    <span className="catalog-stock">Available</span>
                  )}
                </Link>

                <div className="catalog-product-body">
                  <p className="catalog-product-category">{product.category}</p>
                  <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
                  <p className="catalog-product-description">{product.description}</p>

                  <div className="catalog-product-footer">
                    <div className="catalog-price">
                      <strong>₹{product.price}</strong>
                      <span>/ day</span>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="catalog-view-button"
                      aria-label={`View details for ${product.name}`}
                    >
                      View details <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                  <p className={`catalog-availability ${product.available === 0 ? "out-of-stock" : ""}`}>
                    {product.available > 0
                      ? `${product.available} units available`
                      : "Currently unavailable"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            <div className="catalog-empty-icon">⌕</div>
            <h3>No equipment found</h3>
            <p>Try a different search term or clear your filters.</p>
            <button
              type="button"
              className="catalog-reset-button"
              onClick={() => {
                setSelectedSport("All");
                setSearchTerm("");
                setSortBy("featured");
                setAvailabilityOnly(false);
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      <section className="catalog-help">
        <div>
          <p className="catalog-eyebrow">READY WHEN YOU ARE</p>
          <h2>Your next game starts here.</h2>
          <p>Choose your equipment and select your rental dates in a few simple steps.</p>
        </div>
        <Link to="/" className="catalog-help-link">Back to home <span>↗</span></Link>
      </section>
    </main>
  );
}

export default Equipment;
