import React, { useState, useEffect } from 'react';
import ReviewsInput from '../ReviewsInput';

const ReviewsDisplay = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
      <ul>
        {currentReviews.map((review, index) => (
          <li key={index} className=' m-3 rounded-md hover:bg-zinc-200 p-3'>
            <span className="flex justify-between">
              <div className='font-light '>
                {`${review.user.name}`}{review.user.mname && review.user.lname ? (<>{`${review.user.mname} ${review.user.lname}`}</>) : (<></>)}
              </div>
              <div className="text-right font-light text-sm">
                {new Date(review.createdAt).toDateString().replace(/\sGMT.*$/, '')} {new Date(review.createdAt).toLocaleTimeString()}
              </div>
            </span>
            {`${review.feedback}`}
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          reviewsPerPage={reviewsPerPage}
          totalReviews={reviews.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, reviewsPerPage, totalReviews, paginate }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  for (let i = 1; i <= Math.ceil(totalReviews / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md border-solid border-2 hover:border-sky-500 p-1"
        >
          prev
        </button>
        <span className="rounded-md first-line:bg-slate-200 p-1">{currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-md border-solid border-2 hover:border-sky-500 p-1"
        >
          next
        </button>
      </div>
    </nav>
  );
};

export default ReviewsDisplay;
