import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'reviews'), {
        productId,
        rating,
        comment,
      });
      setRating('');
      setComment('');
      alert('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </label>
      <label>
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
