import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, 'reviews'), where('productId', '==', productId));
      const querySnapshot = await getDocs(q);
      const reviewsData = querySnapshot.docs.map((doc) => doc.data());
      setReviews(reviewsData);
    };
    fetchReviews();
  }, [productId]);

  return (
    <div className="review-list">
      <h3>Reviews</h3>
      {reviews.length ? (
        reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Comment:</strong> {review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;
