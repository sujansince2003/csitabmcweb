import React from 'react'
import './Review.css'

const Review = () => {
  return (
    <>
      
      <div className="reviews-title">Top Reviews
      
      </div>

          <div className="review-section">
            <div className="review-box">
              <div className="review-items">
                <img
                  src="https://plus.unsplash.com/premium_photo-1690440686747-6fa153013e4c?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                  className="review-photo" 
                  alt=''
                />

                <div>
                  <span className="review-name">
                  
                  {/* {event.reviews.map(reviewerName)} */}
                  
                  </span>
                  <p className="review-designation">
                  {/* {event.reviews.map(reviewerLevel)} */}
                  </p>
                </div>
              </div>

              <p className="review-description">
                {/* {event.reviews.map(description)} */}
              </p>
            </div>

            {/* <div className="review-box">
              <div className="review-items">
                <img
                  src="https://plus.unsplash.com/premium_photo-1690440686747-6fa153013e4c?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                  className="review-photo"
                  alt=''
                />

                <div>
                  <span className="review-name">Sanchit Pandey</span>
                  <p className="review-designation">Student</p>
                </div>
              </div>

              <p className="review-description">
                This is a mistake. Here, we’ll refer to some time-honored
                typesetting conventions, with an emphasis on readability, and
                offer guidance on adapting them effectively for devices and
                screens. We’ll see that the ability to embed fonts with
                @font-face is not by itself a solution to all of our typographic
                challenges.
              </p>
            </div>

            <div className="review-box">
              <div className="review-items">
                <img
                  src="https://plus.unsplash.com/premium_photo-1690440686747-6fa153013e4c?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                  className="review-photo"
                  alt=''
                />

                <div>
                  <span className="review-name">Sanchit Pandey</span>
                  <p className="review-designation">Student</p>
                </div>
              </div>

              <p className="review-description">
                This is a mistake. Here, we’ll refer to some time-honored
                typesetting conventions, with an emphasis on readability, and
                offer guidance on adapting them effectively for devices and
                screens. We’ll see that the ability to embed fonts with
                @font-face is not by itself a solution to all of our typographic
                challenges.
              </p>
            </div> */}
          </div>


    </>
  )
}

export default Review