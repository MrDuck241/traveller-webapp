import React, { useContext, useEffect, useState, useRef } from "react";
import { HotelContext } from "./HotelContext";
import { UserContext } from "./UserContext";
import HotelNav from "./HotelNav";
import ReservationPopup from "./ReservationPopup";
import "./Hotel.css";

const Hotel = () => {
  const backendUrl = "http://localhost:80/php/get_hotel_info.php";
  const reviewsBackendUrl = "http://localhost:80/php/get_reviews.php";
  const { hotelName, setHotelName } = useContext(HotelContext);
  const { nickname } = useContext(UserContext);
  const [userNickname, setUserNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hotelData, setHotelData] = useState({
    description: "",
    images: [],
    reviews: [],
    id: null,
  });
  const [currentImg, setCurrentImg] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showReservation, setShowReservation] = useState(false);
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [hotelId, setHotelId] = useState(null);
  const reservationPopup = useRef(null);
  const [userStars, setUserStars] = useState(3);

  // Fetch hotel data on mount or when hotelName changes
  useEffect(() => {
    const fetchHotelData = async () => {
      setLoading(true);
      try {
        const storedHotelName = localStorage.getItem("hotelName") || hotelName;

        if (!storedHotelName) {
          throw new Error("Hotel name is not provided.");
        }

        setHotelName(storedHotelName);
        localStorage.setItem("hotelName", storedHotelName);
        if(nickname == "" || nickname == null || nickname == undefined){
            const storage_nickname = localStorage.getItem("nickname");
            if (!storage_nickname) {
                setUserNickname('');
            }   
            else setUserNickname(storage_nickname);
        }
        else{
            setUserNickname(nickname);
        }

        const [hotelResponse, reviewsResponse] = await Promise.all([
          fetchData(backendUrl, { hotelName: storedHotelName }),
          fetchData(reviewsBackendUrl, { hotelName: storedHotelName }),
        ]);

        setAdultPrice(hotelResponse.data[0].adult_price);
        setChildPrice(hotelResponse.data[0].kid_price);
        setHotelId(hotelResponse.data[0]?.id_hotelu);

        setHotelData({
          description: hotelResponse.data[0]?.opis || "No description available.",
          images: parseImagePaths(hotelResponse.data[0]?.hotel_imgs),
          reviews: reviewsResponse.data || [],
          id: hotelResponse.data[0]?.id_hotelu || null,
        });
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [hotelName, setHotelName, nickname]);

  useEffect(() => {
    localStorage.setItem("childPrice", childPrice);
    localStorage.setItem("adultPrice", adultPrice);
  }, [adultPrice, childPrice])

  const fetchData = async (url, body) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    return await response.json();
  };

  const parseImagePaths = (images) =>
    images?.split("\n").map((path) => path.trim()).filter(Boolean) || [];

  const handleImageNavigation = (direction) => {
    setCurrentImg((prev) =>
      direction === "next"
        ? Math.min(prev + 1, hotelData.images.length - 1)
        : Math.max(prev - 1, 0)
    );
  };

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleReviewSubmission = async (e) => {
    //e.preventDefault();
    if (!reviewText || !userNickname || !hotelData.id) return;

    try {
      const response = await fetch("http://localhost:80/php/save_review.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: reviewText, userNickname, hotelId: hotelData.id, stars: userStars }),
        credentials: "include"
      });

      const result = await response.json();
      setResponseMessage(result.success ? "Review submitted!" : result.message);
    } catch (error) {
      setResponseMessage("An error occurred while submitting the review.");
    }
  };

  const reserveDay = () => {
    setShowReservation(!showReservation);
  }

  const starIcon = (id_, value_, for_) => (
    <>
      <input
        className="absolute left-[-9999px]"
        type="radio"
        id={id_}
        name="star"
        value={value_}
        key={id_}
        onChange={(e) => setUserStars(parseInt(e.target.value))}
        checked={parseInt(userStars) === parseInt(value_)}
      />
      <label
        className="w-7 h-7 text-transparent before:text-gray-400 before:text-4xl before:content-['★']"
        htmlFor={for_}
        key={`label-${id_}`}
        onClick = {() => setUserStars(value_)}
      ></label>
    </>
  );
  

  const starIcons = (key, stars) => (
    <img
      key={key}
      id={`star${stars}`}
      src="assets/images/assets/star.png"
      className="h-5 w-5 cursor-default"
      alt={`${stars} stars`}
    />
  );
  

  const renderImages = () => {
    if (hotelData.images.length === 0) return <div>No images available.</div>;
    return (
      <div className="relative h-[25vw] w-[35vw] border-4 border-black rounded-2xl">
        <img
          src={`/assets/images/hotel_images/${hotelData.images[currentImg]}`}
          alt="Hotel"
          className="absolute w-full h-full rounded-lg"
        />
        <button
          onClick={() => handleImageNavigation("prev")}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 w-[6vw] h-[6vw] opacity-0 hover:opacity-100 transition-opacity duration-300"
          style = {{backgroundImage: `url(${'/assets/images/assets/left.png'})`, backgroundSize: 'cover'}}
        >
        </button>
        <button
          onClick={() => handleImageNavigation("next")}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 w-[6vw] h-[6vw] opacity-0 hover:opacity-100 transition-opacity duration-300"
          style = {{backgroundImage: `url(${'/assets/images/assets/right.png'})`, backgroundSize: 'cover'}}
        >
        </button>
      </div>
    );
  };

  return (
    <>
      {showReservation && <ReservationPopup showReservation={showReservation} setShowReservation={setShowReservation} reservationPopup={reservationPopup} hotelName={hotelName} hotelId = {hotelId}/>}
      
      <div style = {{background: "url('/assets/images/backgrounds/hotel_background.jpg')", backgroundSize: 'cover'}} className="w-full bg-transparent">
      <form onSubmit={handleReviewSubmission}>
        <HotelNav />
        <main className="flex flex-col items-center mt-[15px]">
          {error && <div className="text-red-500">{error}</div>}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h1 className="text-4xl italic mt-[20px]">{hotelName}</h1>
              <div className="flex justify-evenly w-full mt-20">
                {renderImages()}
                <div className="w-2/5 flex flex-col items-center">
                    <div className="w-[100%]">{hotelData.description}</div>
                    <button onClick = {() => reserveDay()} type="button" className="w-[20%] bg-orange-500 text-black font-semibold border-[2px] border-solid border-black rounded-[8px] mt-[20px] text-[8px] sm:text-[10px] md:text-[13px] lg:text-[18px]">Zarezerwuj termin</button>
                </div>

              </div>
              <section className="w-4/5 mt-10">
                <h2 className="text-2xl font-semibold">Komentarze</h2>
                <div className="border-4 border-black p-4 overflow-y-auto h-72">
                  {hotelData.reviews.length > 0 ? (
                    <ul>
                      {hotelData.reviews.map((review, index) => (
                        <li key={review.id} className="border p-2 mb-2 border-gray-500 rounded-[8px]">
                          <p><strong>Autor:</strong> {review.nickname}</p>
                          <p><strong>Opinia:</strong> {review.opis}</p>
                          <div className="flex">
                          {Array.from({ length: review.stars }, (_, i) => (
                            starIcons(`${review.id}-${i}`, review.stars)
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>No reviews available.</div>
                  )}
                </div>
              </section>
              <div className="w-4/5 mt-10">
                <div id = "rew" className="w-1/3 float-right flex flex-col">
                  <input
                    value={reviewText}
                    onChange={handleReviewChange}
                    className="h-12 w-full pl-3 font-semibold rounded-lg border-2 border-solid border-black"
                    type="text"
                    placeholder="Wystaw opinię na temat hotelu"
                  />
                  <div className="flex justify-evenly w-full mt-3">
                  <div className="stars bg-transparent w-64 h-8 rounded-xl flex flex-row-reverse justify-evenly items-center">
                       {['5', '4', '3', '2', '1'].map((stars) => starIcon(`${parseInt(stars)}`, stars, `star${stars}`))}
                    </div>
                    <button
                      type="submit"
                      disabled={!userNickname}
                      title={!userNickname ? 'You need to log in' : ''}
                      className={`w-1/3 h-12 bg-amber-600 border-2 border-black rounded-lg mt-2 mb-[15px] ${!userNickname ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'}
                        `}
                    >
                      Wyślij
                    </button>
                  </div>
                  {responseMessage && <div className="text-green-500 w-[100%] text-center">{responseMessage}</div>}
                </div>
              </div>
            </>
          )}
        </main>
      </form>
    </div>
    </>
  );
};

export default Hotel;
