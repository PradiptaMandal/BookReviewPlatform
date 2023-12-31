import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthToken } from "../auth/AuthTokenContext";

export default function BookDetailsView() {
  const [bookDetails, setBookDetails] = useState(0);
  const params = useParams();
  const bookId = params.bookId;

  useEffect(() => {
    const getBookDetails = async () => {
      const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson) {
        setBookDetails(responseJson);
      }
    };
    getBookDetails();
  }, [bookId]);

  return (
    <>
      {bookDetails && (
        <>
          <div className="container">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">{bookDetails.volumeInfo.title}</h3>
                <h6 className="card-subtitle">
                  {bookDetails.volumeInfo.subtitle}
                </h6>
                <div className="row">
                  <div className="col-lg-5 col-md-5 col-sm-2">
                    <div className="white-box text-center">
                      <img
                        src={bookDetails.volumeInfo.imageLinks.thumbnail}
                        className="img-responsive"
                        alt="book"
                      ></img>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-7 col-sm-6">
                    <h4 className="box-title mt-5">Book description</h4>
                    <p>{bookDetails.volumeInfo.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 text-left">
            <button
              type="button"
              class="btn btn-success"
              onClick={() => {
                window.open(
                  `https://vpl.bibliocommons.com/v2/search?query=${bookDetails.volumeInfo.title}`
                );
              }}
            >
              Borrow book
            </button>
          </div>
        </>
      )}
    </>
  );
}
