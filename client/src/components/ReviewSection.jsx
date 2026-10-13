import { useState } from "react";
import "./ReviewSection.css";

function ReviewSection({ productId }) {
  const storageKey = `playrentReviews_${productId}`;

  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  });

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [message, setMessage] = useState("");


  /* =========================
     ADD REVIEW
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (reviewText.trim() === "") {
      setMessage("Please write a review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      rating: rating,
      text: reviewText.trim(),
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [
      newReview,
      ...reviews,
    ];

    setReviews(updatedReviews);

    localStorage.setItem(
      storageKey,
      JSON.stringify(updatedReviews)
    );

    setReviewText("");
    setRating(5);
    setMessage("Review added successfully!");
  };


  /* =========================
     RATING SUMMARY
  ========================= */

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce(
            (total, review) =>
              total + review.rating,
            0
          ) / totalReviews
        ).toFixed(1)
      : "0.0";


  return (
    <section className="reviews-section">

      {/* Heading */}

      <div className="reviews-heading">

        <div>

          <p>
            CUSTOMER FEEDBACK
          </p>

          <h2>
            Reviews & Ratings
          </h2>

        </div>

        {totalReviews > 0 && (

          <div className="rating-summary">

            <strong>
              {averageRating}
            </strong>

            <div>
              <div className="summary-stars">
                {"★".repeat(
                  Math.round(Number(averageRating))
                )}
              </div>

              <span>
                {totalReviews} review
                {totalReviews !== 1 ? "s" : ""}
              </span>
            </div>

          </div>

        )}

      </div>


      {/* Write Review */}

      <div className="write-review-card">

        <h3>
          Write a Review
        </h3>

        <form onSubmit={handleSubmit}>

          <label>
            Your Rating
          </label>

          <div className="rating-input">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                type="button"
                key={star}
                className={
                  star <= rating
                    ? "star-button active"
                    : "star-button"
                }
                onClick={() => setRating(star)}
              >
                ★
              </button>

            ))}

          </div>


          <label>
            Your Review
          </label>

          <textarea
            value={reviewText}
            onChange={(e) =>
              setReviewText(e.target.value)
            }
            placeholder="Tell us about your rental experience..."
            rows="4"
          />


          {message && (
            <p className="review-message">
              {message}
            </p>
          )}


          <button
            type="submit"
            className="submit-review-btn"
          >
            Submit Review
          </button>

        </form>

      </div>


      {/* Existing Reviews */}

      <div className="existing-reviews">

        {reviews.length === 0 ? (

          <div className="no-reviews">

            <div>
              ⭐
            </div>

            <h3>
              No reviews yet
            </h3>

            <p>
              Be the first person to review this equipment.
            </p>

          </div>

        ) : (

          reviews.map((review) => (

            <div
              className="review-card"
              key={review.id}
            >

              <div className="review-top">

                <div className="review-user">

                  <div className="user-avatar">
                    👤
                  </div>

                  <div>

                    <strong>
                      PlayRent User
                    </strong>

                    <span>
                      {review.date}
                    </span>

                  </div>

                </div>


                <div className="review-stars">

                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}

                </div>

              </div>


              <p className="review-text">
                {review.text}
              </p>

            </div>

          ))

        )}

      </div>

    </section>
  );
}

export default ReviewSection;