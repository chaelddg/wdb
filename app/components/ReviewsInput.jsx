import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const ReviewsInput = ({ spaId, userId, setSubmitPressed }) => {
  const [review, setReview] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review.trim()) {
      toast.error('Review field cannot be empty');
      return;
    }
    try {
      const response = await fetch('/api/addreview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spaId: spaId,
          userId: parseInt(userId, 10),
          feedback: review
        }),
      });

      if (response.ok) {
        toast.success("Review submitted successfully");
        // Clearing the input field after submission
        setReview('');
        setSubmitPressed(true);
      } else {
        console.error('Failed to submit reviews');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div>
      <h2>Leave a Review for us</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={handleInputChange}
          placeholder="Write your review here..."
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit" className='rounded-md border-solid border-2 hover:border-sky-500 p-1'>Submit</button>
      </form>
    </div>
  );
};

export default ReviewsInput;