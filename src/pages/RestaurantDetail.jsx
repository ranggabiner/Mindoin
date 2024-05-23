import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Heart, Star } from "lucide-react";

const RestaurantDetail = () => {
  const [data, setData] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const params = useParams();

  const fetchData = async () => {
    const response = await fetch(
      `https://restaurant-api.dicoding.dev/detail/${params.id}`
    );
    const result = await response.json();

    setIsFavorite(
      JSON.parse(localStorage.getItem("favoriteRestaurants"))?.filter(
        (restaurant) => restaurant.id === result.restaurant.id
      ).length
    );

    setData(result.restaurant);
  };

  const handleFavorite = () => {
    const tempData =
      JSON.parse(localStorage.getItem("favoriteRestaurants")) || [];

    if (!isFavorite) {
      localStorage.setItem(
        "favoriteRestaurants",
        JSON.stringify([...tempData, data])
      );
    } else {
      localStorage.setItem(
        "favoriteRestaurants",
        JSON.stringify([
          ...tempData.filter((restaurant) => restaurant.id !== data.id),
        ])
      );
    }

    setIsFavorite((prev) => !prev);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-[124px] pb-12">
      <Navbar />
      {data && (
        <div className="w-[85%] mx-auto max-w-[600px] rounded-3xl overflow-hidden bg-white shadow-lg">
          <div className="relative">
            <img
              src={`https://restaurant-api.dicoding.dev/images/small/${data.pictureId}`}
              className="h-[250px] object-cover w-full"
            />
            <p className="block absolute bg-primary text-white rounded-full p-2 text-xs font-semibold bottom-2 left-6">
              {data.city}
            </p>
          </div>

          <div className="px-8 py-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl">{data.name}</h1>
              <div className="text-yellow-400 font-bold text-yellow text-xl flex gap-1 items-center">
                <Star size={24} className="" fill="rgb(250,204,1)" />
                <p>{data.rating}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 ">
              <h2 className="font-semibold ">Categories</h2>
              <p>
                {data.categories.map((category) => category.name).join(", ")}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold ">Description</h2>
              <p className="text-gray-500">{data.description}</p>
            </div>

            <h2 className="font-bold">Foods</h2>
            <div className="flex gap-2 items-center flex-wrap">
              {data.menus.foods.map((food) => (
                <div
                  key={food.name}
                  className="w-fit border hover:cursor-pointer hover:border-primary duration-500  rounded-lg py-2 px-4 bg-[#]"
                >
                  {food.name}
                </div>
              ))}
            </div>

            <h2 className="font-bold">Drinks</h2>
            <div className="flex gap-2 items-center flex-wrap">
              {data.menus.drinks.map((drink) => (
                <div
                  key={drink.name}
                  className="w-fit border hover:cursor-pointer hover:border-primary duration-500  rounded-lg py-2 px-4 bg-[#]"
                >
                  {drink.name}
                </div>
              ))}
            </div>

            <h2 className="font-bold">Reviews</h2>
            <div className="grid auto-cols-[100%] pb-3 gap-3 overflow-x-scroll overflow-hidden grid-flow-col w-full snap-x snap-mandatory">
              {data.customerReviews.map((review, index) => (
                <div
                  key={`review ${review.name} ${index}`}
                  className="flex flex-col justify-between gap-4  w-full rounded-lg p-4 border-b-[6px] text-white border border-b-primary"
                >
                  <div className="flex justify-between ">
                    <h2 className="text-primary font-bold">{review.name}</h2>
                  </div>
                  <p className="text-center text-black font-medium">
                    {review.review}
                  </p>
                  <div className="font-medium text-end text-tertiary">
                    <p>{review.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}{" "}
      <button
        onClick={() => handleFavorite()}
        className="bg-red-500 fixed bottom-12 right-12 p-4 rounded-full"
      >
        <Heart
          size={32}
          fill={isFavorite ? "white" : "transparent"}
          className="text-white duration-500"
        />
      </button>
    </div>
  );
};

export default RestaurantDetail;
